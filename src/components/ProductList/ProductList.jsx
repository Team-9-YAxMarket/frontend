import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import { products } from '../../utils/constants';

function ProductList() {
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
