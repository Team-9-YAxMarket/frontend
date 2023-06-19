import styles from './PageMainText.module.css'

const PageMainText = ({ title, size }) => {
  return (
    <h2 className={styles.headText} style={{fontSize: size}}>
      {title}
    </h2>
  )
}

export default PageMainText
