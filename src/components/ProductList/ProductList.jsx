import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import { useLocation } from 'react-router-dom';

function ProductList({ products, onItemClick }) {
  const location = useLocation();
  const noBorderLocation = location.pathname === '/notenaughgoods';

  return (
    <div className={`${styles.listContainer}`}>
      {!noBorderLocation && <span className={styles.package}>Коробка YMC</span>}
      <ul
        className={styles.list}
        style={noBorderLocation ? { border: 'none' } : null}
      >
        {products.items.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.sku}
              count={item.count}
              img={item.img}
              barcode={item.barcode}
              tags={item.prompt}
              onItemClick={onItemClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;
