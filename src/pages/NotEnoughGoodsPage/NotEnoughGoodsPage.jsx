import styles from './NotEnoughGoodsPage.module.css';
import Header from '../../components/Header/Header';
import PageMainText from '../../components/PageMainText/PageMainText';
import ProductList from '../../components/ProductList/ProductList';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const NotEnoughGoodsPage = ({ pageTitle, products }) => {
  const navigate = useNavigate();
  const defective = pageTitle.includes('брак');

  const dynamicButtonText = () => {
    if (defective) {
      return 'Закрыть коробку';
    }
    return 'Готово';
  };

  const handleEndSession = () => {
    if (defective) {
      navigate('/putgoodsinbox');
    } else {
      navigate('/finishsession');
    }
  };

  return (
    <>
      <Header />
      <PrimaryButton
        variant="yellow"
        title={dynamicButtonText()}
        right="24px"
        onClick={handleEndSession}
      />
      <div className={styles.pageWrapper}>
        <div className={styles.listContainer}>
          <PageMainText title={pageTitle} />
          <ProductList products={products}/>
        </div>
      </div>

      <Footer isErrorCase={true} isBackButton={true} />
    </>
  );
};

export default NotEnoughGoodsPage;
