import styles from './FinishSession.module.css';
import PageMainText from '../../components/PageMainText/PageMainText';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

const FinishSession = ({ isSuccessSession, handleEndSession, loading }) => {
 
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.mainContainer}>
          {isSuccessSession ? (
            <>
              <div className={styles.putBoxOnImage}></div>
              <PageMainText title="Поставьте коробку на конвейер" />
              <p className={styles.subtext}>Отличная работа!</p>
              <PrimaryButton
                variant="yellow"
                title={loading ? 'Отправляем' : 'Готово'}
                right="24px"
                onClick={handleEndSession}
              />
            </>
          ) : (
            <>
              <div className={styles.putCellImage}></div>
              <PageMainText title="Положите товары обратно в ячейку" />
              <p className={styles.subtext}>
                После этого появится другое задание
              </p>
              <PrimaryButton
                variant="yellow"
                title={loading ? 'Отправляем' : 'Готово'}
                right="24px"
                onClick={handleEndSession}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FinishSession;
