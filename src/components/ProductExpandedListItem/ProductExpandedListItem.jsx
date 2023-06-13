import React, { useState } from 'react';
import styles from './ProductExpandedListItem.module.css';

function ProductExpandedListItem(props) {
    const [isSelected, setIsSelected] = useState(false);

    const handleExpandedListItemClick = () => {
        if (isSelected) {
            return;
        }
        setIsSelected(true);
        props.onSetSelectedCount(props.selectedCount + 1);
        props.onItemClick();
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
            key={props.key}
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
