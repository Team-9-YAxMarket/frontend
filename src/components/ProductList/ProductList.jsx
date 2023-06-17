import React from 'react';

import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import { useLocation } from 'react-router-dom';
import { getBackgroundColor } from '../../utils/functions';

function ProductList({ products, onItemClick, onPackageClick, onBarcodeClick, selectedItemsCounts }) {


  const location = useLocation();
  const noBorderLocation = location.pathname === '/notenaughgoods';
  const cartons = products.recommended_carton
  const cartonColors = cartons.reduce((colors, carton) => {
    if (!colors[carton.box_id]) {
      colors[carton.box_id] = getBackgroundColor(carton.carton_type);
    }
    return colors;
  }, {});

  const defaultItems = products.items.filter((item) => item.box_id === null);
  console.log('Товары без рекомендованной упаковки', defaultItems)
  const unsortedListStyle = defaultItems.length > 0 ? { border: '4px solid gray' } : {};

  return (
    <div className={`${styles.listContainer}`}>
      {cartons.map((carton) => {
        const boxId = carton.box_id;
        const cartonItems = products.items.filter((item) => item.box_id === boxId);
        console.log('Товары с рекомендованной упаковкой', cartonItems)

        const sortedListStyle = noBorderLocation ? { border: 'none' } : { border: `4px solid ${cartonColors[boxId]}` };

        return (
          <div key={boxId} className={styles.listWrapper}>
            <span
              className={styles.package}
              style={{ backgroundColor: `${getBackgroundColor(carton.carton_type)}`}}
              onClick={() => onPackageClick(carton)}
            >
              {carton.carton_type.toUpperCase()}
            </span>
            {cartonItems.length > 0 && (
              <ul className={styles.list} style={sortedListStyle}>
                {cartonItems.map((item) => {
                  // let selectedCount = 0;
                  // if (selectedItemsCounts.hasOwnProperty(item.id)) {
                  //   selectedCount = selectedItemsCounts[item.id];
                  // }

                  return <ProductItem
                      key={item.id}
                      id={item.id}
                      title={item.sku}
                      count={item.count}
                      img={item.img}
                      barcode={item.barcode}
                      tags={item.prompt}
                      //selectedCount={selectedCount}
                      onItemClick={() => onItemClick(item.id)}
                      onBarcodeClick={onBarcodeClick}
                  />
                })}
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
            {defaultItems.map((item) => {
              // let selectedCount = 0;
              // if (selectedItemsCounts.hasOwnProperty(item.id)) {
              //   selectedCount = selectedItemsCounts[item.id];
              // }

              return <ProductItem
                  key={item.id}
                  title={item.sku}
                  count={item.count}
                  img={item.img}
                  barcode={item.barcode}
                  tags={item.prompt}
                  onItemClick={() => onItemClick(item.id)}
                  onBarcodeClick={onBarcodeClick}
                  //selectedCount={selectedCount}
              />
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductList;
