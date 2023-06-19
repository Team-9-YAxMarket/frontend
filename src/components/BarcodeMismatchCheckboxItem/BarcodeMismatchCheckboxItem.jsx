import React from 'react';
import styles from './BarcodeMismatchCheckboxItem.module.css';

function BarcodeMismatchCheckboxItem(props) {
    return (
        <label className={`${styles.checkboxItem} ${props.isCheckedProduct === props.option ? styles.checked : ''}`}>
            <img className={styles.image} src={props.img} alt={props.title}/>
            <h2 className={styles.title}>{props.title}</h2>
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
