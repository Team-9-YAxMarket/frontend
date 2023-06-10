import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import { useLocation } from 'react-router-dom'


function ProductList({ products, onItemClick }) {
    const location = useLocation()
    const noBorderLocation = location.pathname === '/notenaughgoods'

    return (
        <div className={`${styles.listContainer}`}>
            {!noBorderLocation && <span className={styles.package}>Коробка YMC</span>}
            <ul className={styles.list} style={ noBorderLocation ? { border: 'none' } : null}>
                {
                    products.map((product) => {
                        return <ProductItem
                            key={product.id}
                            title={product.title}
                            count={product.count}
                            img={product.img}
                            barcode={product.barcode}
                            tags={product.tags}
                            onItemClick={onItemClick}
                        />
                    })
                }
            </ul>
        </div>
    );
}

export default ProductList;
