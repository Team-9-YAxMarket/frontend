import React from 'react';
import styles from './ScanCellPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CellList from '../../components/CellList/CellList';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { cells } from '../../utils/constants';

const ScanCellPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.buttonWrapper}>
                <PrimaryButton
                    title='Есть проблема'
                    disabled={false}
                />
                <div className={styles.cellWrapper}>
                    <h1 className={styles.title}>Сканируйте ячейку</h1>
                    <CellList
                        cells={cells}
                    />
                </div>
                <PrimaryButton
                    title='Взять другое задание'
                    disabled={false}
                    variant='yellow'
                />
            </div>
            <Footer isErrorCase={false} isBackButton={false} isKeyboard={true}/>
        </div>
    );
}

export default ScanCellPage;
