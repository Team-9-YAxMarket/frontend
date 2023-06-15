import React from 'react';
import styles from './BarcodeMismatchCheckbox.module.css';
import BarcodeMismatchCheckboxItem from '../BarcodeMismatchCheckboxItem/BarcodeMismatchCheckboxItem';

function BarcodeMismatchCheckbox({ products, isCheckedProduct, setIsCheckedProduct }) {
    const handleCheckboxChange = (product) => {
        setIsCheckedProduct(product);
    };

    return (
        <div className={styles.checkbox}>
            {
                products.items.map((product) => {
                    return <BarcodeMismatchCheckboxItem
                        key={product.id}
                        title={product.sku}
                        img={product.img}
                        isCheckedProduct={isCheckedProduct}
                        onChange={() => handleCheckboxChange(product.id)}
                        option={product.id}
                    />
                })
            }
        </div>
    );
}

export default BarcodeMismatchCheckbox;
