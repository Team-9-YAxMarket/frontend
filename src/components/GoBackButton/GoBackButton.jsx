import styles from './GoBackButton.module.css';
//import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ isErrorCase }) => {
  //   const navigate = useNavigate();

  //   const handleClick = () => {
  //     navigate(-1);
  //   };

  return (
    <button
      className={`${styles.goBackButton} ${
        isErrorCase ? styles.goBackButtonError : ''
      }`}
      type="button"
      onClick={() => {}}
    >
      Назад
    </button>
  );
};

export default GoBackButton;
