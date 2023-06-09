import React from 'react';
import styles from './ScanCellPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CellList from '../../components/CellList/CellList';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { cells } from '../../utils/constants';
import BarcodeMismatchPopup from "../../components/BarcodeMismatchPopup/BarcodeMismatchPopup";

const ScanCellPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <BarcodeMismatchPopup/>
            <Header />
            <PrimaryButton
                title='Есть проблема'
                disabled={false}
                left='24px'
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
                right='24px'
            />
            <Footer isErrorCase={false} isBackButton={false} isKeyboard={true}/>
        </div>
    );
}

export default ScanCellPage;
