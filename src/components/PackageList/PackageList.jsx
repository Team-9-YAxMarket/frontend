import styles from './PackageList.module.css';
import { getBackgroundColor } from '../../utils/functions';

const PackageList = ({ cartonList, onDelete }) => {
  return (
    <div className={styles.packageListWrapper}>
      <p className={styles.packageText}>Выбрано:</p>
      <ul className={styles.packageList}>
        {cartonList.map((carton) => (
          <li
            key={carton.carton_id}
            className={styles.packageItem}
            style={{ backgroundColor: getBackgroundColor(carton.carton_type) }}
          >
            <p>{carton.carton_type.toUpperCase()}</p>
            <figure
              className={styles.figure}
              onClick={() => onDelete(carton.carton_id)}
            ></figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;
