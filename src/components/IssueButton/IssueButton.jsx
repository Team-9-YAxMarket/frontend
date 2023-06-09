import React from 'react';
import styles from './IssueButton.module.css';

function IssueButton(props) {
    return (
        <button className={styles.button} onClick={props.onClick}>{props.text}</button>
    );
}

export default IssueButton;
