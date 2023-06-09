import styles from './PutGoodsInBox.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PageMainText from '../../components/PageMainText/PageMainText'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import { useNavigate } from 'react-router-dom'

const PutGoodsInBox = () => {
    const navigate = useNavigate()

    const handleEndSession = () => {
   navigate('/')
    }
  return (
    <>
    <Header />
    <div className={styles.pageWrapper}>
    <div className={styles.pageImage}></div>
    <PageMainText title='Положите бракованные товары в тару'/>
    <PrimaryButton variant='yellow' right='24px' title='Закрыть коробку' onClick={handleEndSession}/>
    </div>
    <Footer isErrorCase={true} isBackButton={true} isKeyboard={true}/>
    </>
  )
}

export default PutGoodsInBox
