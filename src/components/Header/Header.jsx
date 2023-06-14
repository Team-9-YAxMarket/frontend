import styles from './Header.module.css';
import logo from '../../images/service_block-icon.png';
import { setEfficiencyStatus } from '../../utils/functions';
import { Link } from 'react-router-dom';

const Header = ({ userId, userProgress = 51 }) => {
  const title = 'Упаковка';
  const workerProgressStyle = setEfficiencyStatus(userProgress);

  return (
    <header className={styles.header}>
      <button className={styles.burgerMenuIcon} onClick={() => {}} />
      <div className={styles.mainContainer}>
        <Link to="/">
          <img src={logo} alt="Я-Склад, логотип" className={styles.logo} />
        </Link>
        <p className={styles.title}>{title}</p>
        <div className={styles.workerContainer}>
          <p className={styles.workerId}>{userId}</p>
          <div
            className={styles.workerProgress}
            style={{ backgroundColor: workerProgressStyle }}
          >
            {userProgress}%
          </div>
        </div>
      </div>
      <button className={styles.settingsIcon} onClick={() => {}} />
    </header>
  );
};

export default Header;
