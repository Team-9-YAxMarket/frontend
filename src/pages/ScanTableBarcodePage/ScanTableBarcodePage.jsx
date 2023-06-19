import styles from './ScanTableBarcodePage.module.css';
import Footer from '../../components/Footer/Footer';

const ScanTableBarcodePage = ({ handleStartSession, loading }) => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title} onClick={handleStartSession}>
        {!loading ? 'Сканируйте штрихкод стола' : 'Получаем данные с сервера ...'}
      </h1>
      <Footer isErrorCase={false} isBackButton={false} isKeyboard={true} />
    </div>
  );
};

export default ScanTableBarcodePage;
