import React, {useState} from 'react';
import styles from './BarcodeMismatchPopup.module.css';
import BarcodeMismatchCheckbox from '../BarcodeMismatchCheckbox/BarcodeMismatchCheckbox';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const BarcodeMismatchPopup = (props) => {
    const [isCheckedProduct, setIsCheckedProduct] = useState('');
    const isOpen = props.isOpen ? 'popup_opened' : '';
    const disabledButton = isCheckedProduct === '';

    const handlePrimaryButtonClick = () => {
        props.onClose();
    }

    return (
        <div onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                props.onClose();
            }
        }} className={`${styles.popup} ${isOpen} popup_opened`}>
            <div className={styles.popupContainer}>
                <button onMouseDown={props.onClose} className={styles.closeButton}></button>
                <h1 className={styles.title}>Какой товар вы отсканировали?</h1>
                <BarcodeMismatchCheckbox
                    products={props.products}
                    isCheckedProduct={isCheckedProduct}
                    setIsCheckedProduct={setIsCheckedProduct}
                />
                <PrimaryButton
                    title='Выбрать'
                    variant='yellow'
                    right='24px'
                    disabled={disabledButton}
                    onClick={handlePrimaryButtonClick}
                />
            </div>
        </div>
    );
}

export default BarcodeMismatchPopup;
