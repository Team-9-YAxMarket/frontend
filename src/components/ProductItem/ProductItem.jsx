import React, { useState } from 'react';
import styles from './ProductItem.module.css';

function ProductItem(props) {
    const [selectedCount, setSelectedCount] = useState(0);

    const handleProductItemClick = () => {
        if (selectedCount === props.count) {
            return;
        }
        setSelectedCount(selectedCount + 1);
    };

    const calculateProgress = () => {
        return `${(selectedCount * 100) / props.count}%`;
    };

  const productBackgroundStyle = {
    background: `linear-gradient(to right, #EAF7EA ${calculateProgress()}, #ffffff ${calculateProgress()})`,
  };

  const counterBackgroundStyle = {
    background: '#2AAD2E',
    color: '#ffffff',
  };

    return (
        <li className={styles.productItem} style={productBackgroundStyle} onClick={handleProductItemClick}>
            <img className={styles.image} src={props.img} alt={props.title}/>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{props.title}</h2>
                {props.tags === null
                    ? null
                    :
                    <ul className={styles.tagContainer}>
                        {props.tags.map((tag) => (
                            <li
                                key={tag.id}
                                className={styles.tag}
                                style={{ backgroundColor: tag.backgroundColor }}
                            >
                                {tag.icon && <img className={styles.tagIcon} src={tag.icon} alt={tag.iconAlt}/>}
                                {tag.type}
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <span className={styles.counter} style={props.count === selectedCount ? counterBackgroundStyle : null}>{props.count === selectedCount ? `${props.count} шт.` : `${selectedCount} из ${props.count} шт.`}</span>
            <p className={styles.barcode}>{props.barcode}</p>
        </li>
    );
}

export default ProductItem;
