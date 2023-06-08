import styles from './Toster.module.css';


const Toster = ({ isStatusOk }) => {
  return (
    <div
      className={`${styles.toster} ${
        isStatusOk ? styles.correct : styles.error
      }`}
    >
      {isStatusOk ? 'Упаковка добавлена' : 'Упаковка не считалась'}
    </div>
  );
};

export default Toster;
