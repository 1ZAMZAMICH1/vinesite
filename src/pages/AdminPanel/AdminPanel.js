import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Button, Table, Modal, Form, Input, Collapse, Space, Statistic, Row, Col, Card, Tag, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, DatabaseOutlined, IdcardOutlined, CalendarOutlined, BookOutlined, DashboardOutlined, SyncOutlined } from '@ant-design/icons';
import './AdminPanel.css';

const { Sider, Content } = Layout;
const { Panel } = Collapse;
const GIST_ID = process.env.REACT_APP_GIST_ID;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'password123';

const AdminPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState(null);
    const [activeKey, setActiveKey] = useState('dashboard');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [form] = Form.useForm();

    const fetchData = useCallback((force = false) => {
        if (!GIST_ID || !GITHUB_TOKEN) {
            Modal.error({ title: 'Критическая ошибка', content: 'GIST_ID или GITHUB_TOKEN не найдены. Проверьте ваш .env файл и перезапустите сервер.' });
            return;
        }
        message.loading({ content: 'Загрузка данных...', key: 'loader', duration: 0 });
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(gistData => {
                const content = JSON.parse(gistData.files['vinopark-db.json'].content);
                setData(content);
                message.success({ content: 'Данные успешно загружены!', key: 'loader' });
            })
            .catch(err => message.error({ content: `Ошибка загрузки: ${err.message}`, key: 'loader', duration: 5 }));
    }, []);

    useEffect(() => { if (isLoggedIn) fetchData(); }, [isLoggedIn, fetchData]);
    
    const handleLogin = (values) => {
        if (values.username === ADMIN_LOGIN && values.password === ADMIN_PASSWORD) setIsLoggedIn(true);
        else Modal.error({ title: 'Ошибка', content: 'Неверный логин или пароль' });
    };
    
    const updateGist = (newData) => {
        setIsSaving(true);
        message.loading({ content: 'Сохранение на Gist...', key: 'saver', duration: 0 });
        fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: 'PATCH',
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` },
            body: JSON.stringify({ files: { 'vinopark-db.json': { content: JSON.stringify(newData, null, 2) } } }),
        })
        .then(res => {
            if (!res.ok) throw new Error('Ошибка сети или неверный токен');
            setData(newData);
            message.success({ content: 'Успешно сохранено!', key: 'saver' });
        })
        .catch(err => message.error({ content: `Ошибка: ${err.message}`, key: 'saver' }))
        .finally(() => setIsSaving(false));
    };

    const showModal = (item, index, type, path) => {
        let initialValues = item ? { ...item } : {};
        if ((type === 'events' || type === 'vinoteka') && item && Array.isArray(item.image)) {
            initialValues.image = item.image.join('\n');
        }
        setEditingItem({ item: initialValues, index, type, path });
        form.setFieldsValue(initialValues);
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        form.validateFields().then(values => {
            const { index, type, path } = editingItem;
            const newData = JSON.parse(JSON.stringify(data));
            if(type === 'events' || type === 'vinoteka') {
                values.image = typeof values.image === 'string' ? values.image.split('\n').filter(Boolean) : [];
            }
            if (type === 'menu') {
                const [mainKey, subKey] = path;
                if (index === -1) {
                    if (!newData.menu[mainKey][subKey]) newData.menu[mainKey][subKey] = [];
                    newData.menu[mainKey][subKey].push(values);
                } else {
                    newData.menu[mainKey][subKey][index] = values;
                }
            } else {
                if (index === -1) {
                    if (!newData[type]) newData[type] = [];
                    newData[type].push({...values, id: Date.now()});
                } else {
                    newData[type][index] = { ...newData[type][index], ...values };
                }
            }
            updateGist(newData);
            setIsModalVisible(false);
        });
    };

    const handleDelete = (index, type, path) => {
        const newData = JSON.parse(JSON.stringify(data));
        if (type === 'menu') {
            const [mainKey, subKey] = path;
            newData.menu[mainKey][subKey].splice(index, 1);
        } else { newData[type].splice(index, 1); }
        updateGist(newData);
    };

    const handleBookingStatusChange = (index, newStatus) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData.bookings[index].status = newStatus;
        updateGist(newData);
    };
    
    if (!isLoggedIn) {
        return (
            <div className="admin-login">
                <Form onFinish={handleLogin} className="login-form">
                    <h1>Вход</h1>
                    <Form.Item name="username" rules={[{ required: true }]}><Input placeholder="Логин" /></Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]}><Input.Password placeholder="Пароль" /></Form.Item>
                    <Button type="primary" htmlType="submit" block>Войти</Button>
                </Form>
            </div>
        );
    }
    
    if (!data) return <div style={{color: 'white', padding: '5rem', textAlign: 'center'}}>Загрузка...</div>;

    const vinotekaColumns = [ { title: 'Название', dataIndex: 'name' }, { title: 'Действия', render: (_, record, index) => <Space><Button icon={<EditOutlined/>} onClick={() => showModal(record, index, 'vinoteka')} /><Popconfirm title="Удалить?" onConfirm={() => handleDelete(index, 'vinoteka')}><Button icon={<DeleteOutlined/>} danger /></Popconfirm></Space> }];
    const eventsColumns = [ { title: 'Название', dataIndex: 'title' }, { title: 'Действия', render: (_, record, index) => <Space><Button icon={<EditOutlined/>} onClick={() => showModal(record, index, 'events')} /><Popconfirm title="Удалить?" onConfirm={() => handleDelete(index, 'events')}><Button icon={<DeleteOutlined/>} danger /></Popconfirm></Space> }];
    const bookingsColumns = [ { title: 'Стол', dataIndex: 'table' }, { title: 'Имя', dataIndex: 'name' }, { title: 'Статус', dataIndex: 'status', render: (status) => <Tag color={status === 'new' ? 'blue' : 'green'}>{status}</Tag> }, { title: 'Действия', render: (_, record, index) => <Space><Popconfirm title="Подтвердить?" onConfirm={() => handleBookingStatusChange(index, 'confirmed')}><Button>Подтвердить</Button></Popconfirm><Popconfirm title="Отменить?" onConfirm={() => handleBookingStatusChange(index, 'cancelled')}><Button danger>Отменить</Button></Popconfirm></Space> }];
    
    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Дашборд' },
        { key: 'vinoteka', icon: <DatabaseOutlined />, label: 'Винотека' },
        { key: 'menu', icon: <IdcardOutlined />, label: 'Меню' },
        { key: 'events', icon: <CalendarOutlined />, label: 'События' },
        { key: 'bookings', icon: <BookOutlined />, label: 'Бронь' },
    ];
    
    return (
        <Layout className="admin-layout">
            <Sider className="admin-sider"><div className="admin-logo">Vinopark CMS</div><Menu theme="dark" mode="inline" items={menuItems} defaultSelectedKeys={['dashboard']} onSelect={({ key }) => setActiveKey(key)} /></Sider>
            <Layout>
                <Content className="admin-content">
                    {activeKey === 'dashboard' && (
                        <div className="dashboard">
                            <div className="admin-header"><h2>Сводка</h2><Button type="primary" icon={<SyncOutlined />} onClick={() => fetchData(true)} loading={isSaving}>Обновить данные</Button></div>
                            <Row gutter={24}>
                                <Col span={8}><Card className="dashboard-card"><Statistic title="Новых броней" value={(data.bookings || []).filter(b => b.status === 'new').length} /></Card></Col>
                                <Col span={8}><Card className="dashboard-card"><Statistic title="Позиций в винотеке" value={(data.vinoteka || []).length} /></Card></Col>
                                <Col span={8}><Card className="dashboard-card"><Statistic title="Предстоящих событий" value={(data.events || []).length} /></Card></Col>
                            </Row>
                        </div>
                    )}
                    {activeKey === 'vinoteka' && (
                        <div>
                            <div className="admin-header"><h2>Винотека</h2><Button icon={<PlusOutlined />} onClick={() => showModal({ name: '', country: '', type: '', price: 0, image: [] }, -1, 'vinoteka')}>Добавить вино</Button></div>
                            <Table columns={vinotekaColumns} dataSource={data.vinoteka || []} rowKey="id" />
                        </div>
                    )}
                    {activeKey === 'events' && (
                         <div>
                            <div className="admin-header"><h2>События</h2><Button icon={<PlusOutlined />} onClick={() => showModal({ title: '', date: '', description: '', image: [] }, -1, 'events')}>Добавить событие</Button></div>
                            <Table columns={eventsColumns} dataSource={data.events || []} rowKey="id" />
                        </div>
                    )}
                     {activeKey === 'bookings' && (
                         <div>
                            <div className="admin-header"><h2>Управление Бронями</h2></div>
                            <Table columns={bookingsColumns} dataSource={data.bookings || []} rowKey="id" />
                        </div>
                    )}
                    {activeKey === 'menu' && (
                        <div>
                            <div className="admin-header"><h2>Редактор Меню</h2></div>
                            <Collapse accordion>
                                {Object.entries(data.menu).map(([mainCategory, subCategories]) => (
                                    <Panel header={mainCategory} key={mainCategory}>
                                        <Collapse accordion>
                                            {Object.entries(subCategories).map(([subCategory, items]) => (
                                                <Panel header={subCategory} key={subCategory} extra={<Button size="small" icon={<PlusOutlined />} onClick={(e) => { e.stopPropagation(); showModal({ title: '', price: '' }, -1, 'menu', [mainCategory, subCategory]); }} />}>
                                                    {(items || []).map((item, index) => (
                                                        <div className="item-card" key={index}>
                                                            <p>{item.title} - {item.price}₸</p>
                                                            <Space>
                                                                <Button size="small" icon={<EditOutlined/>} onClick={() => showModal(item, index, 'menu', [mainCategory, subCategory])} />
                                                                <Popconfirm title="Удалить?" onConfirm={() => handleDelete(index, 'menu', [mainCategory, subCategory])}><Button size="small" icon={<DeleteOutlined/>} danger /></Popconfirm>
                                                            </Space>
                                                        </div>
                                                    ))}
                                                </Panel>
                                            ))}
                                        </Collapse>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    )}
                </Content>
            </Layout>
            <Modal title={editingItem?.index === -1 ? "Добавить" : "Редактировать"} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} destroyOnClose footer={[ <Button key="back" onClick={() => setIsModalVisible(false)}>Отмена</Button>, <Button key="submit" type="primary" loading={isSaving} onClick={handleOk}>Сохранить</Button> ]}>
                <Form form={form} layout="vertical" initialValues={editingItem?.item}>
                    {editingItem?.item && Object.keys(editingItem.item).map(key => (
                        <Form.Item key={key} name={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                            {key === 'image' ? <Input.TextArea autoSize placeholder="Одна ссылка на Cloudinary в каждой строке"/> : 
                             key === 'description' ? <Input.TextArea autoSize /> : 
                             key !== 'id' && <Input />}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </Layout>
    );
};

export default AdminPanel;