import styles from './PageMainText.module.css'

const PageMainText = ({ title }) => {
  return (
    <h2 className={styles.headText}>
      {title}
    </h2>
  )
}

export default PageMainText
