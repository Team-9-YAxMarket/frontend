import styles from './ScanTableBarcodePage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ScanTableBarcodePage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <h1 className={styles.title}>Сканируйте штрихкод стола</h1>
            <Footer isErrorCase={false} isBackButton={false} isKeyboard={true}/>
        </div>
    );
}

export default ScanTableBarcodePage;
