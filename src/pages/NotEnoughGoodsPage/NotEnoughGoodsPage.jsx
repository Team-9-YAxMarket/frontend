import styles from './NotEnoughGoodsPage.module.css';
import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import PageMainText from '../../components/PageMainText/PageMainText';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import ProblemProductList from '../../components/ProblemProductList/ProblemProductList';
import BarcodeModalWindow from '../../components/BarcodeModalWindow/BarcodeModalWindow';

const NotEnoughGoodsPage = ({ pageTitle, products }) => {
  const { updateProductStatus } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scannedItems, setScannedItems] = useState(0);
  const navigate = useNavigate();
  const defective = pageTitle.includes('брак');
  const disabledButton = scannedItems === 0

  function toggleModal() {
    setIsModalOpen(!isModalOpen)
  }


  const dynamicButtonText = () => {
    if (defective) {
      return 'Закрыть коробку';
    }
    return 'Готово';
  };

  const handleEndSession = () => {
    if (defective) {
      navigate('/putgoodsinbox');
    } else {
      navigate('/finishsession');
    }
  };

  const handleItemScan = (productId) => {
    setScannedItems((prev) => prev + 1)
    updateProductStatus(productId, defective ? 'fault' : 'absent')
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.listWrapper}>
        <PageMainText title={pageTitle} />
        <ProblemProductList products={products} onItemClick={handleItemScan}/>
      </div>
      <PrimaryButton
          variant="yellow"
          title={dynamicButtonText()}
          right="24px"
          onClick={handleEndSession}
          disabled={disabledButton}
      />

      {isModalOpen && <BarcodeModalWindow onClose={toggleModal}/>}
      <Footer isErrorCase={true} isBackButton={true} isKeyboard={defective} isModalOpen={toggleModal}/>
    </div>
  );
};

export default NotEnoughGoodsPage;
