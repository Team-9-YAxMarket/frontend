import React, { useState } from 'react';
import styles from './BarcodeMismatchCheckbox.module.css';
import BarcodeMismatchCheckboxItem from '../BarcodeMismatchCheckboxItem/BarcodeMismatchCheckboxItem';

function BarcodeMismatchCheckbox() {
    const [isCheckedProduct, setCheckedProduct] = useState('');

    const handleCheckboxChange = (product) => {
        setCheckedProduct(product);
    };

    return (
        <div className={styles.checkbox}>
            <BarcodeMismatchCheckboxItem
                isCheckedProduct={isCheckedProduct}
                onChange={() => handleCheckboxChange('option1')}
                option='option1'
            />
            <BarcodeMismatchCheckboxItem
                isCheckedProduct={isCheckedProduct}
                onChange={() => handleCheckboxChange('option2')}
                option='option2'
            />
            <BarcodeMismatchCheckboxItem
                isCheckedProduct={isCheckedProduct}
                onChange={() => handleCheckboxChange('option3')}
                option='option3'
            />
        </div>
    );
}

export default BarcodeMismatchCheckbox;
