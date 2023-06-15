import styles from './ScanTableBarcodePage.module.css';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const ScanTableBarcodePage = () => {

    const navigate = useNavigate()

    const handleScanClick = () => {
     navigate('/scanprinter')
    }

    return (
        <div className={styles.pageWrapper}>
            
            <h1 className={styles.title} onClick={handleScanClick}>Сканируйте штрихкод стола</h1>
            <Footer isErrorCase={false} isBackButton={false} isKeyboard={true}/>
        </div>
    );
}

export default ScanTableBarcodePage;
