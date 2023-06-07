import styles from './PrimaryButton.module.css';

const PrimaryButton = ({ type, title, disabled, variant, onClick }) => {

  // variant = 'yellow' - желтая кнопка
  
  let buttonClassName = styles.primaryButton;

  if (variant === 'yellow') {
    buttonClassName = styles.primaryButtonYellow;
  }
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={buttonClassName}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
