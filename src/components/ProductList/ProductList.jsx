import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';

function ProductList() {
    const products = [
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
            barcode: '1234 5678 234 32',
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
            barcode: '1234 5678 234 32',
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

    return (
        <div className={styles.listContainer}>
            <span className={styles.package}>Коробка YMC</span>
            <ul className={styles.list}>
                {
                    products.map((product) => {
                        return <ProductItem
                            key={product.id}
                            title={product.title}
                            count={product.count}
                            img={product.img}
                            barcode={product.barcode}
                            tags={product.tags}
                        />
                    })
                }
            </ul>
        </div>
    );
}

export default ProductList;
