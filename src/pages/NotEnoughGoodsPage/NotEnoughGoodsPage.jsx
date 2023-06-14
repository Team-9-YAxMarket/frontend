import styles from './NotEnoughGoodsPage.module.css';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import PageMainText from '../../components/PageMainText/PageMainText';
import ProductList from '../../components/ProductList/ProductList';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const NotEnoughGoodsPage = ({ pageTitle, products }) => {
  const [scannedItems, setScannedItems] = useState(0);
  const navigate = useNavigate();
  const defective = pageTitle.includes('брак');
  const disabledButton = scannedItems === 0
  console.log(products)

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

  const handleItemScan = () => {
    setScannedItems((prev) => prev + 1)
  }

  return (
    <>
      <Header />
      <PrimaryButton
        variant="yellow"
        title={dynamicButtonText()}
        right="24px"
        onClick={handleEndSession}
        disabled={disabledButton}
      />
      <div className={styles.pageWrapper}>
        <div className={styles.listContainer}>
          <PageMainText title={pageTitle} />
          <ProductList products={products} onItemClick={handleItemScan}/>
        </div>
      </div>

      <Footer isErrorCase={true} isBackButton={true} />
    </>
  );
};

export default NotEnoughGoodsPage;
