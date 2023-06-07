import React from 'react';
import styles from './IssueButtonList.module.css';
import IssueButton from '../IssueButton/IssueButton';

function IssueButtonList() {
    return (
        <div className={styles.buttonList}>
            <IssueButton
                text='Нет товара'
            />
            <IssueButton
                text='Товар бракованный'
            />
            <IssueButton
                text='Другая проблема'
            />
        </div>
    );
}

export default IssueButtonList;
