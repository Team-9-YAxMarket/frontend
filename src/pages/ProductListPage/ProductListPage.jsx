import React from 'react';
import styles from './ProductListPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProductList from '../../components/ProductList/ProductList';

const ProductListPage = () => {
    return (
        <div>
            <Header />
            <PrimaryButton
                title='Есть проблема'
                disabled={false}
            />
            <h1>Сканируйте товары B-09 и упаковку</h1>
            <ProgressBar />
            <ProductList />
            <PrimaryButton
                title='Закончить упаковку'
                disabled={false}
                variant='yellow'
            />
            <Footer isErrorCase={false} isBackButton={true} isKeyboard={true}/>
        </div>
    );
}

export default ProductListPage;
