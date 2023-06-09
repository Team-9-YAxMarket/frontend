import styles from './HasProblemsPage.module.css'
import Header from "../../components/Header/Header"
import ProblemButtonsList from '../../components/ProblemButtonsList/ProblemButtonsList'
import Footer from '../../components/Footer/Footer'
import {hasProblemsList, hasAnotherProblemsList} from '../../utils/constants'
import BarcodeMismatchPopup from "../../components/BarcodeMismatchPopup/BarcodeMismatchPopup";

const HasProblemsPage = () => {
  return (
    <div className={styles.pageWrapper}>
        <BarcodeMismatchPopup />
      <Header />
      <ProblemButtonsList list={hasProblemsList}/>
      <Footer isErrorCase={true} isBackButton={true}/>
    </div>
  )
}

export default HasProblemsPage
