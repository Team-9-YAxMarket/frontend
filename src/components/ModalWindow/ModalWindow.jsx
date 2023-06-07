import styles from './ModalWindow.module.css';
import { useState } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import { itemsList } from '../utils/constants';

const ModalWindow = ({ title, onClose }) => {
  const selectPackage = 'Выберите упаковку';
  const [value, setValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9\s]/g, ''); // Оставить только цифры и пробелы
    setValue(filteredValue);
  };

  const handleClick = (itemId) => {
    setSelectedItemId(itemId);
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
      <form className={styles.modal}>
        <h3 className={styles.modalTitle}>{title || selectPackage}</h3>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={styles.modalInput}
          placeholder="Штрихкод"
          pattern="[^0-9\s]*"
        />
        {!title &&(
          <ul className={styles.modalList}>
            {itemsList.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`${styles.modalListButton} ${
                    selectedItemId === item.id
                      ? styles.modalListButtonActive
                      : ''
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        <SubmitButton />
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
