import React from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import { useLocation } from 'react-router-dom';
import { getBackgroundColor } from '../../utils/functions';

function ProductList({ products, recommendedCarton, onItemClick, onPackageClick }) {
  
  const location = useLocation();
  const noBorderLocation = location.pathname === '/notenaughgoods';
  console.log('products on List', products);
  console.log('recommendedCarton', recommendedCarton);

  const cartonColors = recommendedCarton.reduce((colors, carton) => {
    if (!colors[carton.box_id]) {
      colors[carton.box_id] = getBackgroundColor(carton.carton_type);
    }
    return colors;
  }, {});

  const defaultItems = products.items.filter((item) => !item.box_id);
  const unsortedListStyle = defaultItems.length > 0 ? { border: '4px solid gray' } : {};


  return (
    <div className={`${styles.listContainer}`}>
      {recommendedCarton.map((carton) => {
        const boxId = carton.box_id;
        const cartonItems = products.items.filter((item) => item.box_id === boxId);

        const sortedListStyle = noBorderLocation ? { border: 'none' } : { border: `4px solid ${cartonColors[boxId]}` };

        return (
          <div key={boxId} className={styles.listWrapper}>
            <span
              className={styles.package}
              style={{ backgroundColor: `${getBackgroundColor(carton.carton_type)}`}}
              onClick={onPackageClick}
            >
              {carton.carton_type.toUpperCase()}
            </span>
            {cartonItems.length > 0 && (
              <ul className={styles.list} style={sortedListStyle}>
                {cartonItems.map((item, index) => (
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
            )}
          </div>
        );
      })}

      {defaultItems.length > 0 && (
        <div className={styles.listWrapper}>
          <span className={styles.package} style={{ backgroundColor: '#676764' }} onClick={onPackageClick}>
            Упаковка на выбор
          </span>
          <ul className={styles.list} style={unsortedListStyle}>
            {defaultItems.map((item) => (
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
        </div>
      )}
    </div>
  );
}

export default ProductList;
