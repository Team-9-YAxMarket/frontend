import React, {useState} from 'react';
import styles from "./BarcodeModalWindow.module.css";
import SubmitButton from "../SubmitButton/SubmitButton";

function BarcodeModalWindow({ itemId, onClose, onSubmit }) {
    const [barcode, setBarcode] = useState("");
    const [touched, setTouched] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        onClose();
        onSubmit(itemId);
    };
    const handleClose = () => {
        onClose();
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setBarcode(value);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const isBarcodeValid = barcode.length >= 8 && barcode.length <= 12;

    return (
        <div className={styles.overlay}>
            <form className={styles.modal}>
                <h3 className={styles.modalTitle}>Введите штрихкод товара</h3>
                <fieldset className={styles.modalFieldset}>
                    <input
                        type="text"
                        className={styles.modalInput}
                        placeholder="Штрихкод"
                        value={barcode}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
                        inputMode="numeric"
                        maxLength={12}
                    />
                    {touched && !isBarcodeValid && <p className={styles.errorText}>Штрихкод может сожержать только цифры, от 8 до 12 символов</p>}
                </fieldset>
                <SubmitButton
                    title="Применить"
                    onClick={handleSubmit}
                    disabled={!isBarcodeValid}
                />
                <button
                    type="button"
                    className={styles.modalCloseButton}
                    onClick={handleClose}
                />
            </form>
        </div>
    );
}

export default BarcodeModalWindow;
