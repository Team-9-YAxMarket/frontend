import styles from './PrimaryButton.module.css';

const PrimaryButton = ({ type, title, disabled, variant, onClick, right, left }) => {

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
      style={{right: right, left: left}}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
