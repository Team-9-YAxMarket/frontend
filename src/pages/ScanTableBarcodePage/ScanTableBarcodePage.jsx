import styles from './ScanTableBarcodePage.module.css';
import Footer from '../../components/Footer/Footer';

const ScanTableBarcodePage = ({ handleStartSession }) => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title} onClick={handleStartSession}>
        Сканируйте штрихкод стола
      </h1>
      <Footer isErrorCase={false} isBackButton={false} isKeyboard={true} />
    </div>
  );
};

export default ScanTableBarcodePage;
