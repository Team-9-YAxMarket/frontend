import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/service_block-icon.svg';
import { setEfficiencyStatus } from '../../utils/functions';

const Header = ({ userProgress = 71, userId}) => {

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
            <figure className={styles.rocketFigure}/>
            <span>{userProgress}%</span>
          </div>
        </div>
      </div>
      <button className={styles.settingsIcon} onClick={() => {}} />
    </header>
  );
};

export default Header;
