import styles from './PutGoodsInBox.module.css';
import Footer from '../../components/Footer/Footer';
import PageMainText from '../../components/PageMainText/PageMainText';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';


const PutGoodsInBox = ({ handleEndSession }) => {
  

 

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.pageImage}></div>
        <PageMainText title="Положите бракованные товары в тару" />
        <PrimaryButton
          variant="yellow"
          right="24px"
          title="Закрыть коробку"
          onClick={handleEndSession}
        />
      </div>
      <Footer isErrorCase={true} isBackButton={true} isKeyboard={false} />
    </>
  );
};

export default PutGoodsInBox;
