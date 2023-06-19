import styles from './CellList.module.css';
import { useState, useEffect } from 'react';

const CellList = (props) => {
  const [activeCells, setActiveCells] = useState([]);

  useEffect(() => {
    if (activeCells.length === props.cells.length) {
      props.onSetIsAllCellsClicked(true);
    }
  }, [activeCells]);

  const handleCellClick = (cellId) => {
    if (activeCells.includes(cellId)) {
      setActiveCells(activeCells.filter((id) => id !== cellId));
    } else {
      setActiveCells([...activeCells, cellId]);
    }
  };

  return (
    <ul className={styles.cellList}>
      {props.cells.map((cell) => (
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

export default CellList;
