import styles from './ScanPrinterBarcodePage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const ScanPrinterBarcodePage = () => {

    const navigate = useNavigate()

    const handleScanClick = () => {
     navigate('/scancell')
    }

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <h1 className={styles.title} onClick={handleScanClick}>Сканируйте штрихкод принтера</h1>
            <Footer isErrorCase={false} isBackButton={true} isKeyboard={true}/>
        </div>
    );
}

export default ScanPrinterBarcodePage;
