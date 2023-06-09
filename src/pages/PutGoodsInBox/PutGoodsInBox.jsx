import styles from './PutGoodsInBox.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PageMainText from '../../components/PageMainText/PageMainText'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'

const PutGoodsInBox = () => {
  return (
    <>
    <Header />
    <div className={styles.pageWrapper}>
    <div className={styles.pageImage}></div>
    <PageMainText title='Положите бракованные товары в тару'/>
    <PrimaryButton variant='yellow' right='24px' title='Закрыть коробку'/>
    </div>
    <Footer isErrorCase={true} isBackButton={true} isKeyboard={true}/>
    </>
  )
}

export default PutGoodsInBox
