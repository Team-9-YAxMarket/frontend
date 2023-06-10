export const itemsList = [
  {
    id: 1,
    name: 'Коробка YMA',
  },
  {
    id: 2,
    name: 'Только одна коробка YMA',
  },
  {
    id: 3,
    name: 'YMF',
  },
  {
    id: 4,
    name: 'MYF',
  },
  {
    id: 5,
    name: 'YMC',
  },
  {
    id: 6,
    name: 'Пакет MYA',
  },
  {
    id: 7,
    name: 'MYB',
  },
  {
    id: 8,
    name: 'MYC',
  },
  {
    id: 9,
    name: 'MYD',
  },
  {
    id: 10,
    name: 'MYE',
  },
];

export const hasProblemsList = [
  {
    id: 1,
    title: 'Нет товара'
  },
  {
    id: 2,
    title: 'Товар бракованный'
  },
  {
    id: 3,
    title: 'Другая проблема'
  }
]

export const hasAnotherProblemsList = [
  {
    id: 1,
    title: 'Сломан монитор'
  },
  {
    id: 2,
    title: 'Сломан сканер'
  },
  {
    id: 3,
    title: 'Сломан принтер'
  },
  {
    id: 4,
    title: 'Позвать бригадира'
  },
]

export const cells = [
  {
    id: 1,
    name: 'B-09',
    isClicked: false,
  },
  {
    id: 2,
    name: 'B-10',
    isClicked: false,
  },
  {
    id: 3,
    name: 'B-11',
    isClicked: false,
  }
];

export const products = [
  {
    id: 1,
    title: 'Батарейка Ortega Cell CR2032, в упаковке 2 шт.',
    count: 1,
    img: 'https://m.media-amazon.com/images/I/619+LSV4iZL._AC_UF1000,1000_QL80_.jpg',
    barcode: '1234 5678 234 32',
    pack: 'Коробка YMA',
    tags: null,
  },
  {
    id: 2,
    title: 'Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный',
    count: 2,
    img: 'https://static.detmir.st/media_pim/756/808/4808756/450/0.jpg?1675176003977',
    barcode: ['1234 5678 234 32', '1234 5678 234 32'],
    pack: 'Коробка YMA',
    tags: [
      {
        id: 1,
        type: 'Пузырчатая плёнка',
        backgroundColor: '#E0EEFF',
      },
      {
        id: 2,
        type: 'Непрозрачный пакет',
        backgroundColor: '#E6E6E6',
      }
    ]
  },
  {
    id: 3,
    title: 'Умная колонка Яндекс Станция Лайт, ультрафиолет',
    count: 3,
    img: 'https://static.mvideo.ru/media/Promotions/Promo_Page/2021/July/obzor-yandex-stantsii-lajt/obzor-yandex-stantsii-lajt-top1-m.png',
    barcode: ['1234 5678 234 32', '1234 5678 234 32', '1234 5678 234 32'],
    pack: 'Коробка YMA',
    tags: [
      {
        id: 1,
        type: 'Пузырчатая плёнка',
        backgroundColor: '#E0EEFF',
      },
      {
        id: 2,
        type: 'Непрозрачный пакет',
        backgroundColor: '#E6E6E6',
      },
      {
        id: 3,
        type: 'Нужно сканировать IMEI',
        backgroundColor: '#FFECCC',
        icon: '/images/IMEI_icon.svg',
        iconAlt: 'Иконка IMEI',
      }
    ]
  },
];
