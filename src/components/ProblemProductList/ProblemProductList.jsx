import React from 'react';
import styles from './ProblemProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';

function ProblemProductList({ products, onItemClick }) {
    return (
        <ul className={styles.list}>
            {products.items.map((item) => (
                <ProductItem
                    key={item.id}
                    title={item.sku}
                    count={item.count}
                    img={item.img}
                    barcode={item.barcode}
                    tags={item.prompt}
                    onItemClick={onItemClick}
                />
            ))}
        </ul>
    );
}

export default ProblemProductList;
