import styles from './ModalWindow.module.css';
import { useState, useEffect } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
//import { itemsList } from '../../utils/constants';

const ModalWindow = ({
  title,
  cartons,
  onClose,
  setSelectedPackage,
  selectedPackage,
  setIsPackageSelected,
  setShowToster,
  setTosterMessage,
}) => {
  const selectPackage = 'Выберите упаковку';
  const [value, setValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isInvalidBarcode, setIsInvalidBarcode] = useState(false);

  useEffect(() => {
    const selectedItem = cartons?.find((item) => item.barcode === value);
    setIsInvalidBarcode(value.length > 0 && !selectedItem);
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const selectedItem = cartons?.find((item) => item.barcode === inputValue);
    if (selectedItem) {
      setSelectedItemId(selectedItem.id);
      setIsInvalidBarcode(false);
    } else {
      setSelectedItemId(null);
      setIsInvalidBarcode(true);
    }
  };

  const handleClick = (itemId) => {
    setSelectedItemId(itemId);
    const selectedItem = cartons?.find((item) => item.id === itemId);
    setValue(selectedItem.barcode);
  };

  const handleSelectPackage = () => {
    const selectedItem = cartons?.find(
      (item) => item.id === selectedItemId
    );
    if (
      selectedItem &&
      !selectedPackage.find((item) => item.id === selectedItemId)
      ) {
      setSelectedPackage((prevSelectedPackages) => [
        ...prevSelectedPackages,
        selectedItem,
      ]);
      setIsPackageSelected(true);
      setShowToster(true);
      setTosterMessage('Упаковка добавлена')
      setTimeout(() => {
        setShowToster(false);
      }, 1000);
    }
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSelectPackage();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClose}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h3 className={styles.modalTitle}>{title || selectPackage}</h3>
        <fieldset className={styles.modalFieldset}>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={styles.modalInput}
            placeholder="Штрихкод"
           
          />
          {isInvalidBarcode && (
            <p className={styles.errorText}>
              Штрихкод не соответствует ни одной упаковке
            </p>
          )}
        </fieldset>

        {!title && (
          <ul className={styles.modalList}>
            {cartons?.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`${styles.modalListButton} ${
                    item.id === selectedItemId
                      ? styles.modalListButtonActive
                      : ''
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  {item.carton_type}
                </button>
              </li>
            ))}
          </ul>
        )}
        <SubmitButton onClick={handleSubmit} />
        <button
          type="button"
          className={styles.modalCloseButton}
          onClick={handleClose}
        />
      </form>
    </div>
  );
};

export default ModalWindow;
