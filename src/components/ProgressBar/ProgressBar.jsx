import styles from './ProgressBar.module.css';

const ProgressBar = ({ totalItems, scannedItems }) => {
  const progress = (scannedItems / totalItems) * 100;
  return (
    <div className={styles.progressBarContainer}>
      <span className={styles.progressBarSpan}>
        {scannedItems} из {totalItems} товаров
      </span>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
