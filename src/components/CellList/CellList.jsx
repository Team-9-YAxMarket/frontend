import styles from './CellList.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CellList = ({ cells }) => {
  const navigate = useNavigate()
  const [activeCells, setActiveCells] = useState([]);

  const handleCellClick = (cellId) => {
    if (activeCells.includes(cellId)) {
      setActiveCells(activeCells.filter((id) => id !== cellId));
    } else {
      setActiveCells([...activeCells, cellId]);
    }
    if (activeCells.length + 1 === cells.length) {
      navigate('/scanproducts');
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

export default CellList;
