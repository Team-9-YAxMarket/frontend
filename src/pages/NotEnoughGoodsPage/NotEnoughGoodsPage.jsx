import styles from './NotEnoughGoodsPage.module.css';
import Header from '../../components/Header/Header';
import PageMainText from '../../components/PageMainText/PageMainText';
import ProductList from '../../components/ProductList/ProductList';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Footer from '../../components/Footer/Footer';

const NotEnoughGoodsPage = () => {
  const pageText = 'Выберите отсутствующий товар';
  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
        <div className={styles.listContainer}>
          <PageMainText title={pageText} />
          <ProductList />
        </div>
          <PrimaryButton variant="yellow" title="Готово" />
        </div>
      </div>
      <Footer isErrorCase={true} isBackButton={true} />
    </>
  );
};

export default NotEnoughGoodsPage;
