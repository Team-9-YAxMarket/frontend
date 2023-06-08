import styles from './ScanPrinterBarcodePage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ScanPrinterBarcodePage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <h1 className={styles.title}>Сканируйте штрихкод принтера</h1>
            <Footer isErrorCase={false} isBackButton={true} isKeyboard={true}/>
        </div>
    );
}

export default ScanPrinterBarcodePage;
