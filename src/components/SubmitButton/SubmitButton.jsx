import styles from './SubmitButton.module.css'

const SubmitButton = ({ title, disabled, onSubmit }) => {
  return (
    <button onSubmit={onSubmit} type='submit' className={styles.submitButton} disabled={disabled}>
      {title || 'Выбрать'}
    </button>
  )
}

export default SubmitButton
