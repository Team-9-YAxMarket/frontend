import React, { useState } from 'react';
import styles from './IssueButtonList.module.css';
import IssueButton from '../IssueButton/IssueButton';
import { hasProblemsList, hasAnotherProblemsList } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function IssueButtonList({ setIsForemanCall, setPageTitle }) {
  const anotherIssue = 'Другая проблема'
  const callForeman = 'Позвать бригадира'
  const noGoods = 'Нет товара'
  const haveDefective = 'Товар бракованный'
  const [list, setList] = useState(hasProblemsList);
 

  const navigate = useNavigate()

  // Отображаем другой список проблем, если упаковщик нажал 'Другая проблема'
  // Масштабируем функцию под другие сценарии
  const handleIssueClick = (itemTitle) => {
    if (itemTitle === anotherIssue) {
      setList(hasAnotherProblemsList);
    }
    if(itemTitle === callForeman) {
        setIsForemanCall(true)
        setList(hasProblemsList)
      }
      if( itemTitle === noGoods) {
        setPageTitle('Выберите отсутствующий товар')
        navigate('/notenoughgoods')
      }
      if(itemTitle === haveDefective) {
        navigate('/notenoughgoods')
        setPageTitle('Сканируйте бракованный товар')
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
