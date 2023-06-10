import React, { useState } from 'react';
import styles from './ProductItem.module.css';

function ProductItem(props) {
    const [selectedCount, setSelectedCount] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleProductItemClick = () => {
        if (selectedCount === props.count) {
            return;
        }
        setSelectedCount(selectedCount + 1);
        props.onItemClick()
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

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <li className={styles.productListItem}>
            <div className={styles.productItem}>
                <div className={styles.productItemWrapper} style={productBackgroundStyle}>
                    <img className={styles.image} src={props.img} alt={props.title}/>
                    <div className={styles.titleContainer} onClick={handleProductItemClick}>
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
                    {props.count > 1 && (
                        <div className={styles.expandedListButtonWrapper}>
                            <button className={styles.expandedListButton} onClick={toggleExpanded}>
                                {isExpanded ? (
                                    <>
                                        Свернуть<span className={styles.collapsedListIcon}></span>
                                    </>
                                ) : (
                                    <>
                                        Развернуть<span className={styles.expandedListIcon}></span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    {props.count === 1 && <p className={styles.barcode}>{props.barcode}</p>}
                </div>
                {isExpanded && (
                    <ul className={styles.expandedList}>
                        {props.barcode.map((item) => (
                            <li
                                key={item.index}
                                className={styles.expandedListItem}
                            >
                                <h2 className={styles.title}>{props.title}</h2>
                                <span className={styles.counter}>1 шт.</span>
                                <p className={styles.expandedListBarcode}>{item}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
}

export default ProductItem;
