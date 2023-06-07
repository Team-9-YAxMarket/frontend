import styles from './Footer.module.css'
import React from 'react'
import GoBackButton from '../GoBackButton/GoBackButton'
const keyboardImage = '../../images/ui kit/Icon/40×40/keyboard.svg'

const Footer = ({ isBackButton, onKeyboardButtonClick }) => {

  return (
    <footer className={`${styles.footer} ${!isBackButton ? styles.center : ''}`}>
      {isBackButton && <GoBackButton />}
      <div className={styles.keyboardButtonContainer} onClick={onKeyboardButtonClick}>
        <figure className={styles.keyboardImage}/>
        <button className={styles.keyboardButton}>Ввести с клавиатуры</button>
      </div>
      <div />
    </footer>
  )
}

export default Footer
