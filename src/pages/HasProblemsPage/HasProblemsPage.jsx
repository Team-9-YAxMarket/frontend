import styles from './HasProblemsPage.module.css'
import { useState } from 'react'
import IssueButtonList from '../../components/IssueButtonList/IssueButtonList'
import ForemanCallToster from '../../components/ForemanCallToster/ForemanCallToster'
import Footer from '../../components/Footer/Footer'

const HasProblemsPage = ({ setPageTitle }) => {

  const [isForemanCall, setIsForemanCall] = useState(false)

  return (
    <div className={styles.pageWrapper}>
      <ForemanCallToster isForemanCall={isForemanCall} />
      <IssueButtonList setIsForemanCall={setIsForemanCall} setPageTitle={setPageTitle}/>
      <Footer isErrorCase={true} isBackButton={true}/>
    </div>
  )
}

export default HasProblemsPage
