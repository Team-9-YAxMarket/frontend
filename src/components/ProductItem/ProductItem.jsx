import React, {useEffect, useState} from 'react';
import styles from './ProductItem.module.css';
import ProductExpandedListItem from '../ProductExpandedListItem/ProductExpandedListItem';

function ProductItem(props) {
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]); // Массив для хранения состояния выбора
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (props.selectedCount && props.count >= props.selectedCount) {
            setSelectedCount(props.selectedCount);
        }
    }, [ props.selectedCount, props.count ])

    const handleProductItemClick = () => {
        if (selectedCount < props.count && props.count === 1) {
            setSelectedCount((prev) => prev + 1);
            props.onItemClick();
        }
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

    const backgroundStyleByTag = (tag) => {
        const bgStyleMap = {
            'нужно сканировать IMEI': '#FFECCC',
            'нужно сканировать марку': '#FFECCC',
            'упаковать отдельно в NONPACK': '#FFD9DB',
            'Непрозрачный пакет': '#E6E6E6',
        };

        const iconMap = {
            'нужно сканировать IMEI': './images/IMEI_icon.svg',
            'нужно сканировать марку': './images/mark_scan_icon.svg',
        }

        let bgStyle = '#E0EEFF';
        if (bgStyleMap.hasOwnProperty(tag)) {
            bgStyle = bgStyleMap[tag];
        }

        let icon = null;
        if (iconMap.hasOwnProperty(tag)) {
            icon = iconMap[tag];
        }

        return {
            bgColor: bgStyle,
            icon
        };
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleExpandedItemClick = (index) => {
        if (!selectedItems.includes(index)) {
          setSelectedItems([...selectedItems, index]);
          setSelectedCount((prev) => prev + 1);
          props.onItemClick();
        }
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
                                {props.tags.map((tag, index) => {
                                    const style = backgroundStyleByTag(tag);
                                    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
                                    return <li
                                        key={index}
                                        className={styles.tag}
                                        style={{backgroundColor: style.bgColor}}
                                    >
                                        {style.icon && <img className={styles.tagIcon} src={style.icon} alt={tag}/>}
                                        {formattedTag}
                                    </li>
                                })}
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
                    {props.count === 1 && <p className={styles.barcode} onClick={() => {return props.onBarcodeClick(props.id)}}>{props.barcode}</p>}
                </div>
                {props.count > 1 && isExpanded && (
          <ul className={styles.expandedList}>
            {[...Array(props.count)].map((_, index) => (
              <ProductExpandedListItem
                key={index}
                index={index}
                item={props.barcode}
                title={props.title}
                selectedItems={selectedItems}
                selectedCount={selectedCount}
                onItemClick={handleExpandedItemClick}
                onBarcodeClick={props.onBarcodeClick}
              />
            ))}
          </ul>
        )}
            </div>
        </li>
    );
}

export default ProductItem;
