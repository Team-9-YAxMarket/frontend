import React, { useState, useEffect } from 'react';
import styles from './ProductListPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProductList from '../../components/ProductList/ProductList';
import Toster from '../../components/Toster/Toster';
import PackageList from '../../components/PackageList/PackageList';
import BarcodeMismatchPopup from '../../components/BarcodeMismatchPopup/BarcodeMismatchPopup';
import { useNavigate } from 'react-router-dom';

const ProductListPage = ({ products, recommendedCarton }) => {
  const navigate = useNavigate();
  const [isBarcodeMismatchPopupOpen, setIsBarcodeMismatchPopupOpen] =
    useState(false);
  const [showToster, setShowToster] = useState(false);
  const [scannedItems, setScannedItems] = useState(0);
  const [isPackageSelected, setIsPackageSelected] = useState(false);
  const totalItems = products.items.reduce(
    (total, product) => total + product.count,
    0
  );
  const packList = products.items.map((product) => product.box_id);
  console.log('packlist', packList);
  

  const onPackageClick = () => {
    setShowToster(true);
    setTimeout(() => {
      setShowToster(false);
    }, 1000);
    setIsPackageSelected(true);
  };

  function closePopup() {
    setIsBarcodeMismatchPopupOpen(false);
  }

  const handleProductItemClick = () => {
    setScannedItems(scannedItems + 1);
  };

  const handleFinishPackingButtonClick = () => {
    if (isPackageSelected) {
      navigate('/finishsession');
    } else {
        setShowToster(true);
        setIsPackageSelected(false)
    }
  };

  const handleHasProblemsButtonClick = () => {
    navigate('/hasproblems');
  };

  return (
    <div className={styles.pageWrapper}>
      <BarcodeMismatchPopup
        products={products}
        isOpen={isBarcodeMismatchPopupOpen}
        onClose={closePopup}
      />
      <Header />
      {showToster && <Toster isStatusOk={isPackageSelected} />}
      <PrimaryButton
        title="Есть проблема"
        disabled={false}
        left="24px"
        onClick={handleHasProblemsButtonClick}
      />
      <div className={styles.listWrapper}>
        <h1 className={styles.title}>Сканируйте товары B-09 и упаковку</h1>
        <ProgressBar totalItems={totalItems} scannedItems={scannedItems} />
        <ProductList
          products={products}
          recommendedCarton={recommendedCarton}
          onItemClick={handleProductItemClick}
          onPackageClick={onPackageClick}
        />
        {/* <PackageList list={packList}/> */}
      </div>
      <PrimaryButton
        title="Закончить упаковку"
        variant="yellow"
        right="24px"
        onClick={handleFinishPackingButtonClick}
      />
      <Footer isErrorCase={false} isBackButton={true} isKeyboard={true} />
    </div>
  );
};

export default ProductListPage;
