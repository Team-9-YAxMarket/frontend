import styles from './FinishSession.module.css';
import Header from '../../components/Header/Header';

import PageMainText from '../../components/PageMainText/PageMainText';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const FinishSession = ({ isStatusOk }) => {
    const navigate = useNavigate()

    const handleEndSession = () => {
        navigate('/')
    }
  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
          <div className={styles.mainContainer}>
          {isStatusOk ? (
              <>
              <div className={styles.putBoxOnImage}></div>
              <PageMainText title="Поставьте коробку на конвейер" />
              <p className={styles.subtext}>Отличная работа!</p>
              <PrimaryButton variant='yellow' title='Готово' right='24px' onClick={handleEndSession}/>
           </>
          ) : (
              <>
              <div className={styles.putCellImage}></div>
              <PageMainText title="Положите товары обратно в ячейку" />
              <p className={styles.subtext}>
                После этого появится другое задание
              </p>
              <PrimaryButton variant='yellow' title='Готово' right='24px' onClick={handleEndSession}/>
            </>
          )}
          </div>
      </div>
    </>
  );
};

export default FinishSession;
