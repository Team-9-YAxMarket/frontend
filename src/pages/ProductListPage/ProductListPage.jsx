import React, { useState } from 'react';
import styles from './ProductListPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProductList from '../../components/ProductList/ProductList';
import BarcodeMismatchPopup from '../../components/BarcodeMismatchPopup/BarcodeMismatchPopup';

const ProductListPage = () => {
    const [isBarcodeMismatchPopupOpen, setIsBarcodeMismatchPopupOpen] = useState(false);

    function closePopup() {
        setIsBarcodeMismatchPopupOpen(false);
    }

    return (
        <div className={styles.pageWrapper}>
            <BarcodeMismatchPopup
                isOpen={isBarcodeMismatchPopupOpen}
                onClose={closePopup}
            />
            <Header />
            <PrimaryButton
                title='Есть проблема'
                disabled={false}
                left='24px'
            />
            <div className={styles.listWrapper}>
                <h1 className={styles.title}>Сканируйте товары B-09 и упаковку</h1>
                <ProgressBar />
                <ProductList />
            </div>
            <PrimaryButton
                title='Закончить упаковку'
                disabled={false}
                variant='yellow'
                right='24px'
            />
            <Footer isErrorCase={false} isBackButton={false} isKeyboard={true}/>
        </div>
    );
}

export default ProductListPage;
