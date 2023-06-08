import styles from './HasProblemsPage.module.css'
import { useState } from 'react'
import Header from "../../components/Header/Header"
import IssueButtonList from '../../components/IssueButtonList/IssueButtonList'
import ForemanCallToster from '../../components/ForemanCallToster/ForemanCallToster'
import Footer from '../../components/Footer/Footer'

const HasProblemsPage = () => {

  const [isForemanCall, setIsForemanCall] = useState(false)

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <ForemanCallToster isForemanCall={isForemanCall} />
      <IssueButtonList setIsForemanCall={setIsForemanCall}/>
      <Footer isErrorCase={true} isBackButton={true}/>
    </div>
  )
}

export default HasProblemsPage
