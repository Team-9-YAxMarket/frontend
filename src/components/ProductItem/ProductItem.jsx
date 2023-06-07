import React, { useState } from 'react';
import styles from './ProductItem.module.css';

function ProductItem(props) {
    const img = '/images/product_image.jpg';
    const [selectedCount, setSelectedCount] = useState(0);

    const handleProductItemClick = () => {
        setSelectedCount(selectedCount + 1);
    };

    const calculateProgress = () => {
        return `${(selectedCount * 100) / props.totalCount}%`;
    };

    const productBackgroundStyle= {
        background: `linear-gradient(to right, #EAF7EA ${calculateProgress()}, #ffffff ${calculateProgress()})`,
    };

    const counterBackgroundStyle= {
        background: '#2AAD2E',
        color: '#ffffff',
    };

    return (
        <li className={styles.productItem} style={productBackgroundStyle} onClick={handleProductItemClick}>
            <img className={styles.image} src={img} alt={props.title}/>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{props.title}</h2>
                <ul className={styles.tagContainer}>
                    <li className={styles.tag}>Пузырчатая плёнка</li>
                    <li className={styles.tag}>Стрейтч-плёнка</li>
                    <li className={styles.tag}><img className={styles.tagIcon} src='/images/IMEI_icon.svg' alt='Иконка IMEI'/>Нужно сканировать IMEI</li>
                </ul>
            </div>
            <span className={styles.counter} style={props.totalCount === selectedCount ? counterBackgroundStyle : null}>{props.totalCount === selectedCount ? `${props.totalCount} шт.` : `${selectedCount} из ${props.totalCount} шт.`}</span>
            <p className={styles.barcode}>{props.barcode}</p>
        </li>
    );
}

export default ProductItem;
