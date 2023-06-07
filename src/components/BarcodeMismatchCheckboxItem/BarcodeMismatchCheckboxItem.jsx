import React from 'react';
import styles from './BarcodeMismatchCheckboxItem.module.css';

function BarcodeMismatchCheckboxItem(props) {
    return (
        <label className={`${styles.checkboxItem} ${props.isCheckedProduct === props.option ? styles.checked : ''}`}>
            <img className={styles.image} src='/images/product_image.jpg' alt='Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный'/>
            <h2 className={styles.title}>Мягкая игрушка BelaiToys медведь Тони, 110 см, кофейный</h2>
            <input
                className={styles.input}
                type='checkbox'
                checked={props.isCheckedProduct === props.option}
                onChange={props.onChange}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
}

export default BarcodeMismatchCheckboxItem;
