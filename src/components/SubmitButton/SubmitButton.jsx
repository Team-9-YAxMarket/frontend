import styles from './SubmitButton.module.css'

const SubmitButton = ({ title, disabled, onClick }) => {
  return (
    <button onClick={onClick} type='submit' className={styles.submitButton} disabled={disabled}>
      {title || 'Выбрать'}
    </button>
  )
}

export default SubmitButton
