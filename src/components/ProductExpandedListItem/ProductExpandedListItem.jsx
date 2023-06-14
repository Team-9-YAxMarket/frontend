import React, { useState, useEffect } from 'react';
import styles from './ProductExpandedListItem.module.css';

function ProductExpandedListItem(props) {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
    setIsSelected(props.selectedItems.includes(props.index))
    },[props.selectedItems, props.index])
    

    const handleExpandedListItemClick = () => {
        if (isSelected) {
            return;
        }
        props.onItemClick(props.index);
    };

    const listItemBackgroundStyle = {
        background: '#EAF7EA',
    }

    const counterBackgroundStyle = {
        background: '#2AAD2E',
        color: '#ffffff',
    };

    return (
        <li
            className={styles.expandedListItem}
            style={isSelected ? listItemBackgroundStyle : null}
        >
            <h2 className={styles.title} onClick={handleExpandedListItemClick}>{props.title}</h2>
            <span className={styles.counter} style={isSelected ? counterBackgroundStyle : null}>1 шт.</span>
            <p className={styles.expandedListBarcode}>{props.item}</p>
        </li>
    );
}

export default ProductExpandedListItem;
