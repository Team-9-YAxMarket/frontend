import React from 'react';
import styles from './BarcodeMismatchPopup.module.css';
import BarcodeMismatchCheckbox from '../BarcodeMismatchCheckbox/BarcodeMismatchCheckbox';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const BarcodeMismatchPopup = (props) => {
    const isOpen = props.isOpen ? 'popup_opened' : '';

    return (
        <div onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                props.onClose()
            }
        }} className={`${styles.popup} ${isOpen}`}>
            <div className={styles.popupContainer}>
                <button onMouseDown={props.onClose} className={styles.closeButton}></button>
                <h1 className={styles.title}>Какой товар вы отсканировали?</h1>
                <BarcodeMismatchCheckbox />
                <PrimaryButton
                    title='Выбрать'
                    disabled={false}
                    variant='yellow'
                    right='24px'
                />
            </div>
        </div>
    );
}

export default BarcodeMismatchPopup;
