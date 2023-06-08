import React, { useState } from 'react';
import styles from './IssueButtonList.module.css';
import IssueButton from '../IssueButton/IssueButton';
import { hasProblemsList, hasAnotherProblemsList } from '../../utils/constants';

function IssueButtonList({ setIsForemanCall }) {
  const anotherIssue = 'Другая проблема'
  const callForeman = 'Позвать бригадира'
  const [list, setList] = useState(hasProblemsList);

  // Отображаем другой список проблем, если упаковщик нажал 'Другая проблема'
  // Масштабируем функцию под другие сценарии
  const handleIssueClick = (itemTitle) => {
    if (itemTitle === anotherIssue) {
      setList(hasAnotherProblemsList);
    }
    if(itemTitle === callForeman) {
        setIsForemanCall(true)
      }
  };
  return (
    <ul className={styles.buttonList}>
      {list.map((item) => (
        <IssueButton
          key={item.id}
          text={item.title}
          onClick={() => handleIssueClick(item.title)}
        />
      ))}
    </ul>
  );
}

export default IssueButtonList;
