export interface MenuItem {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  isOpen: boolean;
  phone: string;
  deliveryTime: string;
  image: string;
  menuItems: MenuItem[];
  description?: string;
  specialty?: string;
  // Optional: show a discount badge and use in featured sections
  discountPercent?: number;
}

export interface PickupPoint {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export const pickupPoints: PickupPoint[] = [
  {
    id: '1',
    name: 'مجمع سفريات الطفيلة',
    description: 'النقطة الرئيسية للاستلام - 5-10 دقائق مشي'
  },
  {
    id: '2',
    name: 'بوابة الجامعة الرئيسية',
    description: 'عند المدخل الرئيسي لجامعة الطفيلة التقنية - 2-5 دقائق مشي'
  },
  {
    id: '3',
    name: 'منطقة العيص - شارع الجامعة',
    description: 'قرب مستر شاورما ومطعم المهندس - 10-15 دقيقة مشي'
  },
  {
    id: '4',
    name: 'منطقة الهيص',
    description: 'قرب حلويات السفير - 15-20 دقيقة مشي'
  }
];

export const categories = [
  'الكل',
  'شاورما',
  'مندي & زربيان',
  'فلافل',
  'بيتزا & معجنات',
  'حلويات'
];

export const restaurants: Restaurant[] = [
  {
    id: 'haboob',
    name: 'حلويات حبوب',
    categories: ['حلويات', 'وافل', 'كريب', 'سباغيتي', 'عصائر', 'موهيتو'],
    rating: 4.8,
    isOpen: true,
    phone: '+962781613637',
    deliveryTime: '15-25 دقيقة',
    image: 'https://i.postimg.cc/vBTV0Nnj/459844055-515888791200781-6987469598372442707-n.jpg',
    discountPercent: 20,
    description: 'واجهة خاصة بالمستثمر – منيو مميز وعرض خصم.',
    specialty: 'وافل وسباغيتي وكريب وعصائر موهيتو',
    menuItems: [
      { id: 'hb-w1', name: 'Stick Waffle', price: 0.75, isAvailable: true, category: 'وافل' },
      { id: 'hb-w2', name: 'Taiyaki Waffle', price: 1.00, isAvailable: true, category: 'وافل' },
      { id: 'hb-w3', name: 'Classic Waffle (Large)', price: 1.50, isAvailable: true, category: 'وافل' },
      { id: 'hb-c1', name: 'كريب', price: 1.25, isAvailable: true, category: 'كريب' },
      { id: 'hb-s1', name: 'سباغيتي حبوب', price: 1.25, isAvailable: true, category: 'سباغيتي' },
      { id: 'hb-j1', name: 'عصير مكس بيري', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-j2', name: 'باشن فروت', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-j3', name: 'فراولة', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-j4', name: 'بلو كوراساو', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-j5', name: 'مانجا', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-j6', name: 'كيوي', price: 1.00, isAvailable: true, category: 'عصائر' },
      { id: 'hb-m1', name: 'مهيتو كنزا ليمون (كبير)', price: 1.00, isAvailable: true, category: 'موهيتو' },
      { id: 'hb-m2', name: 'مهيتو BM (كبير)', price: 1.25, isAvailable: true, category: 'موهيتو' },
      { id: 'hb-m3', name: 'مهيتو بوم بوم (كبير)', price: 1.50, isAvailable: true, category: 'موهيتو' },
    ]
  },
  {
    id: '1',
    name: 'مطعم وشاورما المهندس',
    categories: ['شاورما'],
    rating: 4.5,
    isOpen: true,
    phone: '+962791234567',
    deliveryTime: '20-35 دقيقة',
    image: 'https://images.unsplash.com/photo-1659329843929-2222cec43a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGF3YXJtYSUyMGFyYWJpYyUyMGZvb2R8ZW58MXx8fHwxNzU2NTkxNjgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'شاورما بطعم أصيل وأسعار مناسبة. وجبات عربية وعروض يومية.',
    specialty: 'الشاورما',
    menuItems: [
      {
        id: '1-1',
        name: 'سندويش شاورما دجاج',
        price: 1.65,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '1-2',
        name: 'وجبة شاورما عادي',
        price: 4.25,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '1-3',
        name: 'وجبة شاورما سوبر',
        price: 5.00,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '1-4',
        name: 'سدر أرز عائلي (دجاج)',
        price: 10.50,
        isAvailable: true,
        category: 'أرز عائلي'
      }
    ]
  },
  {
    id: '2',
    name: 'بيت المندي',
    categories: ['مندي & زربيان'],
    rating: 4.6,
    isOpen: true,
    phone: '+962791234568',
    deliveryTime: '35-50 دقيقة',
    image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5kaSUyMHJpY2UlMjBhcmFiaWN8ZW58MXx8fHwxNzU2NTkxNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'مندي وزربيان على الأصول. كميات عائلية وأسعار عادلة.',
    specialty: 'المندي',
    menuItems: [
      {
        id: '2-1',
        name: 'نصف دجاج مندي',
        price: 5.00,
        isAvailable: true,
        category: 'مندي'
      },
      {
        id: '2-2',
        name: 'دجاجة كاملة مندي',
        price: 9.50,
        isAvailable: true,
        category: 'مندي'
      },
      {
        id: '2-3',
        name: 'زربيان لحم (ربع كيلو)',
        price: 7.50,
        isAvailable: true,
        category: 'زربيان'
      },
      {
        id: '2-4',
        name: 'أرز + لحم',
        price: 7.50,
        isAvailable: true,
        category: 'زربيان'
      }
    ]
  },
  {
    id: '3',
    name: 'الصحن التركي',
    categories: ['مندي & زربيان'],
    rating: 4.3,
    isOpen: true,
    phone: '+962791234569',
    deliveryTime: '30-45 دقيقة',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJraXNoJTIwa2ViYWJ8ZW58MXx8fHwxNzU2NTkxNzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'تشكيلة مندي وأطباق تركية أصيلة بنكهات مميزة.',
    specialty: 'التركي',
    menuItems: [
      {
        id: '3-1',
        name: 'نصف دجاج مندي',
        price: 5.00,
        isAvailable: true,
        category: 'مندي'
      },
      {
        id: '3-2',
        name: 'دجاجة كاملة مندي',
        price: 9.50,
        isAvailable: true,
        category: 'مندي'
      },
      {
        id: '3-3',
        name: 'كباب تركي',
        price: 6.00,
        isAvailable: true,
        category: 'تركي'
      },
      {
        id: '3-4',
        name: 'شاورما تركي',
        price: 4.50,
        isAvailable: true,
        category: 'تركي'
      }
    ]
  },
  {
    id: '4',
    name: 'مطعم بوابة الطفيلة',
    categories: ['فلافل', 'شاورما'],
    rating: 4.2,
    isOpen: true,
    phone: '+962791234570',
    deliveryTime: '15-25 دقيقة',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    menuItems: [
      {
        id: '4-1',
        name: 'سندويش فلافل',
        price: 0.70,
        isAvailable: true,
        category: 'فلافل'
      },
      {
        id: '4-2',
        name: 'صحن شاورما دجاج',
        price: 4.50,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '4-3',
        name: 'بطاطا مقلية',
        price: 1.00,
        isAvailable: true,
        category: 'سناكات'
      },
      {
        id: '4-4',
        name: 'حمص بالطحينة',
        price: 2.00,
        isAvailable: true,
        category: 'فلافل'
      },
      {
        id: '4-5',
        name: 'فول مدمس',
        price: 1.50,
        isAvailable: true,
        category: 'فلافل'
      }
    ]
  },
  {
    id: '5',
    name: 'مستر شاورما - العيص',
    categories: ['شاورما'],
    rating: 4.1,
    isOpen: true,
    phone: '+962791234571',
    deliveryTime: '15-20 دقيقة',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
    menuItems: [
      {
        id: '5-1',
        name: 'وجبة شاورما عادي',
        price: 1.50,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '5-2',
        name: 'وجبة شاورما سوبر',
        price: 2.00,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '5-3',
        name: 'وجبة شاورما دبل',
        price: 2.50,
        isAvailable: true,
        category: 'شاورما'
      },
      {
        id: '5-4',
        name: 'وجبة إيطالي/حلبي',
        price: 2.75,
        isAvailable: true,
        category: 'شاورما'
      }
    ]
  },
  {
    id: '6',
    name: 'فرِندز للمعجنات والبيتزا',
    categories: ['بيتزا & معجنات'],
    rating: 4.0,
    isOpen: true,
    phone: '+962791234572',
    deliveryTime: '20-30 دقيقة',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    menuItems: [
      {
        id: '6-1',
        name: 'بيتزا مارغريتا (صغير)',
        price: 2.75,
        isAvailable: true,
        category: 'بيتزا'
      },
      {
        id: '6-2',
        name: 'فطيرة زعتر',
        price: 0.65,
        isAvailable: true,
        category: 'معجنات'
      },
      {
        id: '6-3',
        name: 'شاورما صغير/سناك',
        price: 1.75,
        isAvailable: true,
        category: 'سناكات'
      },
      {
        id: '6-4',
        name: 'فطيرة جبنة',
        price: 0.85,
        isAvailable: true,
        category: 'معجنات'
      },
      {
        id: '6-5',
        name: 'بيتزا مشكلة (صغير)',
        price: 3.50,
        isAvailable: true,
        category: 'بيتزا'
      }
    ]
  },
  {
    id: '7',
    name: 'حلويات السفير',
    categories: ['حلويات'],
    rating: 4.7,
    isOpen: true,
    phone: '+962791234573',
    deliveryTime: '10-20 دقيقة',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    menuItems: [
      {
        id: '7-1',
        name: 'بقلاوة (قطعة)',
        price: 1.10,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-2',
        name: 'كنافة نابلسية (صغير)',
        price: 4.00,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-3',
        name: 'وربات (قطعة)',
        price: 1.50,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-4',
        name: 'بسبوسة/هريسة',
        price: 1.25,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-5',
        name: 'مهلبية',
        price: 1.50,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-6',
        name: 'كنافة آيس كريم',
        price: 5.00,
        isAvailable: true,
        category: 'حلويات'
      },
      {
        id: '7-7',
        name: 'عش البلبل (قطعة)',
        price: 1.00,
        isAvailable: true,
        category: 'حلويات'
      }
    ]
  }
];
