import type { Category, Product } from './types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Электроника',
    slug: 'electronics',
    subcategories: [
      { id: '1-1', name: 'Смартфоны', slug: 'smartphones' },
      { id: '1-2', name: 'Ноутбуки', slug: 'laptops' },
      { id: '1-3', name: 'Наушники', slug: 'headphones' },
      { id: '1-4', name: 'Телевизоры', slug: 'tvs' },
    ],
  },
  {
    id: '2',
    name: 'Мода',
    slug: 'fashion',
    subcategories: [
      { id: '2-1', name: 'Мужская одежда', slug: 'mens-clothing' },
      { id: '2-2', name: 'Женская одежда', slug: 'womens-clothing' },
      { id: '2-3', name: 'Обувь', slug: 'shoes' },
      { id: '2-4', name: 'Аксессуары', slug: 'accessories' },
    ],
  },
  {
    id: '3',
    name: 'Дом и сад',
    slug: 'home',
    subcategories: [
      { id: '3-1', name: 'Мебель', slug: 'furniture' },
      { id: '3-2', name: 'Декор', slug: 'decor' },
      { id: '3-3', name: 'Текстиль', slug: 'textiles' },
      { id: '3-4', name: 'Освещение', slug: 'lighting' },
    ],
  },
  {
    id: '4',
    name: 'Красота',
    slug: 'beauty',
    subcategories: [
      { id: '4-1', name: 'Уход за кожей', slug: 'skincare' },
      { id: '4-2', name: 'Макияж', slug: 'makeup' },
      { id: '4-3', name: 'Парфюмерия', slug: 'perfume' },
    ],
  },
]

const generateId = () => Math.random().toString(36).substring(2, 11)

const productImages: Record<string, string[]> = {
  smartphones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
  ],
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop',
  ],
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
  ],
  tvs: [
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
  ],
  'mens-clothing': [
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop',
  ],
  'womens-clothing': [
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop',
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
  ],
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
  ],
  decor: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  ],
  textiles: [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop',
  ],
  lighting: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop',
  ],
  skincare: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
  ],
  makeup: [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop',
  ],
  perfume: [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
  ],
}

const productNames: Record<string, string[]> = {
  smartphones: ['Смартфон Pro Max', 'Смартфон Ultra', 'Смартфон Lite', 'Смартфон Plus'],
  laptops: ['Ноутбук Pro 15"', 'Ноутбук Air 13"', 'Игровой ноутбук', 'Ультрабук'],
  headphones: ['Беспроводные наушники', 'Студийные наушники', 'Спортивные наушники', 'TWS Наушники'],
  tvs: ['Smart TV 55"', 'OLED TV 65"', 'LED TV 43"', '4K TV 50"'],
  'mens-clothing': ['Классическая рубашка', 'Джинсы Slim Fit', 'Пиджак', 'Свитер'],
  'womens-clothing': ['Платье вечернее', 'Блузка шёлковая', 'Брюки', 'Юбка миди'],
  shoes: ['Кроссовки спортивные', 'Ботинки кожаные', 'Туфли классические', 'Кеды'],
  accessories: ['Часы наручные', 'Сумка кожаная', 'Ремень', 'Шарф кашемировый'],
  furniture: ['Диван угловой', 'Кресло', 'Стол обеденный', 'Шкаф'],
  decor: ['Ваза керамическая', 'Картина', 'Зеркало', 'Подсвечник'],
  textiles: ['Комплект постельного белья', 'Плед', 'Подушка декоративная', 'Шторы'],
  lighting: ['Люстра', 'Торшер', 'Настольная лампа', 'Бра'],
  skincare: ['Крем для лица', 'Сыворотка', 'Маска', 'Тоник'],
  makeup: ['Тушь для ресниц', 'Помада', 'Тональный крем', 'Румяна'],
  perfume: ['Парфюмерная вода', 'Туалетная вода', 'Духи', 'Аромат унисекс'],
}

const generatePrice = (category: string): { price: number; oldPrice?: number } => {
  const basePrices: Record<string, [number, number]> = {
    smartphones: [15000, 120000],
    laptops: [40000, 200000],
    headphones: [2000, 35000],
    tvs: [25000, 150000],
    'mens-clothing': [2000, 25000],
    'womens-clothing': [2500, 30000],
    shoes: [3000, 20000],
    accessories: [1500, 50000],
    furniture: [10000, 150000],
    decor: [500, 15000],
    textiles: [1000, 10000],
    lighting: [2000, 30000],
    skincare: [500, 8000],
    makeup: [300, 5000],
    perfume: [2000, 25000],
  }
  
  const [min, max] = basePrices[category] || [1000, 10000]
  const price = Math.round((Math.random() * (max - min) + min) / 100) * 100
  const hasDiscount = Math.random() > 0.6
  const oldPrice = hasDiscount ? Math.round(price * (1 + Math.random() * 0.3) / 100) * 100 : undefined
  
  return { price, oldPrice }
}

const brandNames: Record<string, string[]> = {
  smartphones: ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'OPPO', 'Realme', 'OnePlus', 'Honor'],
  laptops: ['ASUS', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Apple', 'Huawei'],
  headphones: ['Sony', 'JBL', 'Bose', 'Sennheiser', 'Marshall', 'AKG', 'Beats', 'Audio-Technica'],
  tvs: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Philips', 'Xiaomi'],
  'mens-clothing': ['Zara', 'H&M', 'Uniqlo', 'Massimo Dutti', 'Reserved', 'Mango'],
  'womens-clothing': ['Zara', 'H&M', 'Mango', 'Massimo Dutti', 'Reserved', 'Bershka'],
  shoes: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Converse', 'Vans'],
  accessories: ['Guess', 'Tommy Hilfiger', 'Calvin Klein', 'Michael Kors', 'Fossil'],
  furniture: ['IKEA', 'Hoff', 'Askona', 'Много Мебели', 'Шатура'],
  decor: ['IKEA', 'Zara Home', 'H&M Home', 'Westwing', 'La Redoute'],
  textiles: ['IKEA', 'Togas', 'Asabella', 'Arya', 'TAC'],
  lighting: ['IKEA', 'Eglo', 'Maytoni', 'Odeon Light', 'Favourite'],
  skincare: ["L'Oreal", 'Nivea', 'Vichy', 'La Roche-Posay', 'Clinique', 'Estee Lauder'],
  makeup: ['MAC', 'NYX', 'Maybelline', 'Urban Decay', 'Charlotte Tilbury'],
  perfume: ['Dior', 'Chanel', 'Armani', 'Tom Ford', 'YSL', 'Versace', 'Gucci'],
}

const additionalImages: Record<string, string[]> = {
  smartphones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
  ],
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop',
  ],
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop',
  ],
  tvs: [
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop',
  ],
}

export function generateProducts(): Product[] {
  const products: Product[] = []
  
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      const names = productNames[subcategory.slug] || ['Товар']
      const images = additionalImages[subcategory.slug] || productImages[subcategory.slug] || []
      const brands = brandNames[subcategory.slug] || ['Бренд']
      
      // Generate 6-10 products per subcategory for better coverage
      const count = Math.floor(Math.random() * 5) + 6
      
      for (let i = 0; i < count; i++) {
        const name = names[i % names.length]
        const brand = brands[i % brands.length]
        const { price, oldPrice } = generatePrice(subcategory.slug)
        const imageIndex = i % (images.length || 1)
        const defaultImage = productImages[subcategory.slug]?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'
        
        products.push({
          id: generateId(),
          name: `${brand} ${name}${i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''}`.trim(),
          description: `${brand} ${name} - высококачественный товар из категории "${subcategory.name}". Отличное соотношение цены и качества. Гарантия качества. Доставка по всей России.`,
          price,
          oldPrice,
          category: category.slug,
          subcategory: subcategory.slug,
          images: images.length > 0 ? [images[imageIndex]] : [defaultImage],
          rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
          reviewCount: Math.floor(Math.random() * 500) + 10,
          inStock: Math.random() > 0.12,
          specifications: {
            'Артикул': generateId().toUpperCase(),
            'Бренд': brand,
            'Производитель': ['Россия', 'Китай', 'Германия', 'Италия', 'Япония', 'США'][Math.floor(Math.random() * 6)],
          },
          tags: [subcategory.name, category.name, brand],
        })
      }
    }
  }
  
  return products
}

export const featuredProducts = generateProducts().slice(0, 8)
