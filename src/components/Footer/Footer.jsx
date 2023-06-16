import styles from './Footer.module.css';
import React from 'react';
import GoBackButton from '../GoBackButton/GoBackButton';

const Footer = ({
  isBackButton,
  isKeyboard,
  isErrorCase,
  isModalOpen,
  onKeyboardButtonClick,
}) => {
  return (
    <footer
      className={`${styles.footer} ${
        isErrorCase ? styles.footerError : ''
      }`}
    >
      {isBackButton && <GoBackButton isErrorCase={isErrorCase} />}
      <div
        className={styles.keyboardButtonContainer}
        onClick={onKeyboardButtonClick}
      >
        {isKeyboard && (
          <>
            <figure
              className={`${styles.keyboardImage} ${
                isErrorCase ? styles.keyboardImageWhite : ''
              }`}
            />
            <button
              type='button'
              onClick={isModalOpen}
              className={`${styles.keyboardButton} ${
                isErrorCase ? styles.keyboardButtonWhite : ''
              }`}
            >
              Ввести с клавиатуры
            </button>
          </>
        )}
      </div>

      {isBackButton && <div className={styles.empty} />}
    </footer>
  );
};

export default Footer;
