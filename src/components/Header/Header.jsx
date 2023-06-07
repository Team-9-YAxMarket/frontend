import styles from './Header.module.css';
import logo from '../../images/service_block-icon.png';
import { setEfficiencyStatus } from '../utils/functions';

const Header = ({ userId = 'sof-natgemokee', userProgress = 51 }) => {
  const title = 'Упаковка';
  const workerProgressStyle = setEfficiencyStatus(userProgress);

  return (
    <header className={styles.header}>
      <button className={styles.burgerMenuIcon} onClick={() => {}} />
      <div className={styles.mainContainer}>
        <img src={logo} alt="Я-Склад, логотип" className={styles.logo} />
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
