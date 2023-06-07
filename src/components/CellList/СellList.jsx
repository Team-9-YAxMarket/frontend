import styles from './CellList.module.css';
import { useState } from 'react';

const СellList = ({ cells }) => {
  const [activeCells, setActiveCells] = useState([]);

  const handleCellClick = (cellId) => {
    if (activeCells.includes(cellId)) {
      setActiveCells(activeCells.filter((id) => id !== cellId));
    } else {
      setActiveCells([...activeCells, cellId]);
    }
  };
  return (
    <ul className={styles.cellList}>
      {cells.map((cell) => (
        <li
          key={cell.id}
          className={`${styles.cellItem} ${
            activeCells.includes(cell.id) ? styles.cellItemActive : ''
          }`}
          onClick={() => handleCellClick(cell.id)}
        >
          {cell.name}
        </li>
      ))}
    </ul>
  );
};

export default СellList;
