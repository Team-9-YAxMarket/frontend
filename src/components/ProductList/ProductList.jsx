import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';

function ProductList() {
    return (
        <div className={styles.listContainer}>
            <span className={styles.package}>Коробка YMC</span>
            <ul className={styles.list}>
                <ProductItem
                    title='Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный'
                    barcode='1234 5678 234 32'
                    totalCount={1}
                />
                <ProductItem
                    title='Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный'
                    barcode='1234 5678 234 32'
                    totalCount={2}
                />
                <ProductItem
                    title='Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный'
                    barcode='1234 5678 234 32'
                    totalCount={3}
                />
                <ProductItem
                    title='Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный'
                    barcode='1234 5678 234 32'
                    totalCount={3}
                />
            </ul>
        </div>
    );
}

export default ProductList;
