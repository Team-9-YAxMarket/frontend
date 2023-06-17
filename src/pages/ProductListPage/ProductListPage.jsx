import styles from './ProductListPage.module.css';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProductList from '../../components/ProductList/ProductList';
import Toster from '../../components/Toster/Toster';
import PackageList from '../../components/PackageList/PackageList';
import BarcodeMismatchPopup from '../../components/BarcodeMismatchPopup/BarcodeMismatchPopup';
import BarcodeModalWindow from '../../components/BarcodeModalWindow/BarcodeModalWindow';

const ProductListPage = ({
  selectedPackage,
  setIsSuccessSession,
  isModalOpen,
  showToster,
  setShowToster,
  setSelectedPackage,
}) => {
  const { sessionData, updateProductStatus } = useContext(AppContext);
  const navigate = useNavigate();
  const [isBarcodeMismatchPopupOpen, setIsBarcodeMismatchPopupOpen] = useState(false);
  const [scannedItems, setScannedItems] = useState(0);
  const [isPackageSelected, setIsPackageSelected] = useState(false);
  const [tosterMessage, setTosterMessage] = useState('');
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [barcodeItemId, setBarcodeItemId] = useState(false);
  const [selectedItemsCounts, setSelectedItemsCounts] = useState({});


  const { order } = sessionData
  // Общее количество товаров
  const totalItems = order.items.reduce(
    (total, item) => total + item.count,
    0
  );
  const isAllScanned = scannedItems === totalItems
  
 
  const onPackageClick = (carton) => {
    if (isAllScanned) {
      setIsPackageSelected(true);
      setSelectedPackage([...selectedPackage, carton]);
      setTosterMessage('Упаковка добавлена');
      setIsSuccessSession(true);
      setShowToster(true);
      setTimeout(() => {
        setShowToster(false);
      }, 1000);
    } else {
      setIsPackageSelected(false);
      setTosterMessage('Сканируйте все товары');
      setShowToster(true);
      setTimeout(() => {
        setShowToster(false);
      }, 1000);
    }
  };

  const handleDeleteClick = (cartonId) => {
    setSelectedPackage((prevSelectedPackage) => 
    prevSelectedPackage.filter((carton) => carton.carton_id !== cartonId))
  }

  function closePopup() {
    setIsBarcodeMismatchPopupOpen(false);
  }

  const handleProductItemClick = () => {
    setScannedItems(scannedItems + 1);
    if (m.hasOwnProperty(itemId)) {
      m[itemId]++;
      setSelectedItemsCounts(m)
    } else {
      m[itemId] = 1;
    }
  };

  const handleFinishPackingButtonClick = () => {
    if (isPackageSelected) {
      setIsSuccessSession(true);
      navigate('/finishsession');
    } else {
      if (scannedItems === totalItems) {
        setTosterMessage('Сканируйте упаковку');
      } else {
        setTosterMessage('Сканируйте все товары');
      }
      setShowToster(true);
      setTimeout(() => {
        setShowToster(false);
      }, 1000);
    }
  };

  const handleHasProblemsButtonClick = () => {
    navigate('/hasproblems');
  };

  const handleProductItemBarcodeClick = (itemId) => {
    setIsBarcodeModalOpen(true);
    setBarcodeItemId(itemId);
  };

  const toggleBarcodeModalWindow = () => {
    setIsBarcodeModalOpen(!isBarcodeModalOpen);
  };

  return (
    <div className={styles.pageWrapper}>
      {isBarcodeModalOpen && (
          <BarcodeModalWindow
              onClose={toggleBarcodeModalWindow}
              onSubmit={handleProductItemClick}
              itemId={barcodeItemId}
          />
      )}
      <BarcodeMismatchPopup
        products={order}
        isOpen={isBarcodeMismatchPopupOpen}
        onClose={closePopup}
      />
      {showToster && (
        <Toster isStatusOk={isPackageSelected} message={tosterMessage} />
      )}
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
          products={order}
          onItemClick={handleProductItemClick}
          onPackageClick={onPackageClick}
        />
        {selectedPackage.length > 0 && <PackageList cartonList={selectedPackage} onDelete={handleDeleteClick}/>}
      </div>
      <PrimaryButton
        title="Закончить упаковку"
        variant={selectedPackage.length > 0 ? 'yellow' : ''}
        right="24px"
        onClick={handleFinishPackingButtonClick}
      />
      <Footer
        isErrorCase={false}
        isBackButton={true}
        isKeyboard={true}
        isModalOpen={isModalOpen}
        isAllScanned={isAllScanned}
      />
    </div>
  );
};

export default ProductListPage;
