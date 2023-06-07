import styles from './GoBackButton.module.css';
//import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(-1);
//   };

  return (
    <button className={styles.goBackButton} type="button" onClick={() => {}}>
      Назад
    </button>
  );
};

export default GoBackButton;
