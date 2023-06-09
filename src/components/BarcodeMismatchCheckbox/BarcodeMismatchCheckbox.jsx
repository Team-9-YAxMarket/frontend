import React, { useState } from 'react';
import styles from './BarcodeMismatchCheckbox.module.css';
import BarcodeMismatchCheckboxItem from '../BarcodeMismatchCheckboxItem/BarcodeMismatchCheckboxItem';
import { products } from '../../utils/constants';

function BarcodeMismatchCheckbox() {
    const [isCheckedProduct, setCheckedProduct] = useState('');

    const handleCheckboxChange = (product) => {
        setCheckedProduct(product);
    };

    return (
        <div className={styles.checkbox}>
            {
                products.map((product) => {
                    return <BarcodeMismatchCheckboxItem
                        key={product.id}
                        title={product.title}
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
