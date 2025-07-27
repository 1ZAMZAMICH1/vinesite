// ... (код с allWines остается без изменений) ...
import product1 from './assets/product1.png';
import product2 from './assets/product2.png';
import product3 from './assets/product3.png';
import product4 from './assets/product4.png';
import product5 from './assets/product5.png';
import product6 from './assets/product6.png';
import product7 from './assets/product7.png';

export const allWines = [
  { id: 1, name: 'L\'Étoile Solitaire', country: 'Франция', type: 'Белое', price: 7200, image: product1 },
  { id: 2, name: 'Cuore di Pietra', country: 'Италия', type: 'Красное', price: 9500, image: product2 },
  { id: 3, name: 'Furia Roja', country: 'Испания', type: 'Красное', price: 6800, image: product3 },
  { id: 4, name: 'Crimson Peak', country: 'США', type: 'Красное', price: 11200, image: product4 },
  { id: 5, name: 'Sunburnt Earth', country: 'Австралия', type: 'Красное', price: 8900, image: product5 },
  { id: 6, name: 'Andean Shadow', country: 'Аргентина', type: 'Красное', price: 7500, image: product6 },
  { id: 7, name: 'Volcanic Kiss', country: 'Чили', type: 'Розовое', price: 5300, image: product7 },
  { id: 8, name: 'Alpine Mist', country: 'Германия', type: 'Белое', price: 6100, image: product1 },
  { id: 9, name: 'Golden Fleece', country: 'Грузия', type: 'Оранжевое', price: 4800, image: product2 },
  { id: 10, name: 'Pacific Breeze', country: 'Новая Зеландия', type: 'Белое', price: 6900, image: product3 },
];

export const fullMenuData = {
  osnovnoe: {
    "Устрицы": [{ title: 'Хасанская', price: '350', description: 'Цена за 1 шт. Подается с лимоном и винным уксусом' }],
    "Салаты": [{ title: 'Цезарь с курицей', price: '650', description: 'Романо, куриное филе на гриле, гренки, соус "Цезарь"' }],
    "Горячие закуски": [{ title: 'Жульен с грибами', price: '520', description: 'Шампиньоны, сливочный соус, сыр' }],
    "Холодные закуски": [{ title: 'Тартар из говядины', price: '890', description: 'Мраморная говядина, каперсы, лук-шалот, яичный желток' }],
    "Супы": [{ title: 'Том Ям с морепродуктами', price: '750', description: 'Креветки, кальмары, мидии, кокосовое молоко' }],
    "Горячие блюда": [{ title: 'Стейк Рибай', price: '2500', description: 'Мраморная говядина, подается с соусом на выбор' }],
    "Птица": [{ title: 'Утиная грудка', price: '1200', description: 'С ягодным соусом и пюре из батата' }],
    "Рыба": [{ title: 'Филе лосося на гриле', price: '1400', description: 'Подается со спаржей и лимонным соусом' }],
    "Суши": [{ title: 'Филадельфия', price: '780', description: 'Лосось, сливочный сыр, огурец, 8 шт.' }],
    "Паста": [{ title: 'Карбонара', price: '720', description: 'Спагетти, бекон, сливочный соус, пармезан' }],
    "Пицца": [{ title: 'Маргарита', price: '600', description: 'Томатный соус, моцарелла, базилик' }],
    "Гарниры": [{ title: 'Картофель фри', price: '300', description: 'С соусом на выбор' }],
    "Хлебные изделия": [{ title: 'Хлебная корзина', price: '250', description: 'Ассорти свежеиспеченного хлеба' }],
    "Соусы": [{ title: 'Песто', price: '100', description: 'Классический соус' }],
    "Десерты": [{ title: 'Тирамису', price: '450', description: 'Классический итальянский десерт' }],
  },
  barnoe: {
    "Чайная карта": [{ title: 'Ассам', price: '400', description: 'Черный чай, 500 мл' }],
    "Кофе": [{ title: 'Эспрессо', price: '200', description: 'Классический' }],
    "Свежевыжатые соки": [{ title: 'Апельсиновый', price: '400', description: '300 мл' }],
    "Прохладительные напитки": [{ title: 'Coca-Cola', price: '250', description: '0.33л' }],
    "Пиво разливное": [{ title: 'Blanche de Bruxelles', price: '450', description: '0.5л' }],
    "Пиво бутылочное": [{ title: 'Corona Extra', price: '400', description: '0.33л' }],
    "Закуски к пиву": [{ title: 'Гренки чесночные', price: '350', description: 'С сырным соусом' }],
    "Аперитивы": [{ title: 'Aperol Spritz', price: '700', description: 'Aperol, Prosecco, содовая' }],
    "Ром": [{ title: 'Bacardi Carta Blanca', price: '400', description: '50 мл' }],
    "Коньяк": [{ title: 'Hennessy V.S', price: '900', description: '50 мл' }],
    "Виски": [{ title: 'Jameson', price: '500', description: 'Ирландский виски, 50 мл' }],
    "Джин": [{ title: 'Beefeater', price: '500', description: '50 мл' }],
    "Текила": [{ title: 'Olmeca Blanco', price: '450', description: '50 мл' }],
    "Водка": [{ title: 'Beluga Noble', price: '450', description: '50 мл' }],
  },
  banketnoe: {
    "Основные блюда": [{ title: 'Молочный поросенок', price: '15000', description: 'Запеченный целиком. По предзаказу' }],
    "Выпечка": [{ title: 'Пирожки с мясом', price: '1200', description: 'Цена за 10 шт. По предзаказу' }],
    "Торты": [{ title: 'Наполеон', price: '5000', description: 'Цена за 1 кг. По предзаказу' }],
  },
  sigary: {
    "Сигары": [{ title: 'Cohiba Siglo VI', price: '4500', description: 'Куба, цена за 1 шт.' }],
  }
};