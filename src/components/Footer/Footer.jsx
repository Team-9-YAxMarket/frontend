import styles from './Footer.module.css';
import React from 'react';
import GoBackButton from '../GoBackButton/GoBackButton';

const Footer = ({
  isBackButton,
  isKeyboard,
  isErrorCase,
  onKeyboardButtonClick,
}) => {
  return (
    <footer
      className={`${styles.footer} ${!isBackButton ? styles.center : ''} ${
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
              className={`${styles.keyboardButton} ${
                isErrorCase ? styles.keyboardButtonWhite : ''
              }`}
            >
              Ввести с клавиатуры
            </button>
          </>
        )}
      </div>
      <div />
    </footer>
  );
};

export default Footer;
