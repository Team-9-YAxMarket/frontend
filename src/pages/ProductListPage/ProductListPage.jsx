import React, { useState } from 'react';
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

const ProductListPage = ({ products }) => {
    const navigate = useNavigate();
    const [isBarcodeMismatchPopupOpen, setIsBarcodeMismatchPopupOpen] = useState(false);
    const [scannedItems, setScannedItems] = useState(0);
    const totalItems = products.reduce((total, product) => total + product.count, 0);
    const packList = products.map(product => product.pack)
    console.log(packList)
    const finishGoodsScan = totalItems === scannedItems
 

    function closePopup() {
        setIsBarcodeMismatchPopupOpen(false);
    }

    const handleProductItemClick = () => {
        setScannedItems(scannedItems + 1);
    };

    const handleFinishPackingButtonClick = () => {
        navigate('/finishsession');
    };

    const handleHasProblemsButtonClick = () => {
        navigate('/hasproblems');
    };

    return (
        <div className={styles.pageWrapper}>
            <BarcodeMismatchPopup
                isOpen={isBarcodeMismatchPopupOpen}
                onClose={closePopup}
            />
            <Header />
            <Toster isStatusOk={finishGoodsScan}/>
            <PrimaryButton
                title='Есть проблема'
                disabled={false}
                left='24px'
                onClick={handleHasProblemsButtonClick}
            />
            <div className={styles.listWrapper}>
                <h1 className={styles.title}>Сканируйте товары B-09 и упаковку</h1>
                <ProgressBar totalItems={totalItems} scannedItems={scannedItems}/>
                <ProductList products={products} onItemClick={handleProductItemClick}/>
            <PackageList list={packList}/>
            </div>
            <PrimaryButton
                title='Закончить упаковку'
                disabled={false}
                variant='yellow'
                right='24px'
                onClick={handleFinishPackingButtonClick}
            />
            <Footer isErrorCase={false} isBackButton={true} isKeyboard={true}/>
        </div>
    );
}

export default ProductListPage;
