import styles from './PackageList.module.css'

const PackageList = ({ list }) => {

    const getBackgroundColor = (pack) => {
        pack = pack.toLowerCase();
      
        if (pack.includes('yma')) {
          return '#FF3C3C';
        } else if (pack.includes('ymf')) {
          return '#F29528';
        } else if (pack.includes('myf')) {
          return '#A75FC9';
        } else if (pack.includes('ymc')) {
          return '#336D57';
        } else if (pack.includes('mya')) {
          return '#F55B89';
        } else if (pack.includes('myb')) {
          return '#A3353A';
        } else if (pack.includes('myc')) {
          return '#54B7D6';
        } else if (pack.includes('myd')) {
          return '#ECC62E';
        } else if (pack.includes('mye')) {
          return '#7B6D35';
        } else {
          return '#000000'; // Default color if pack value doesn't match any case
        }
      };

  return (
    <div className={styles.packageListWrapper}>
      <p className={styles.packageText}>Выбрано:</p>
      <ul className={styles.packageList}>
        {list.map((pack, index) => (
            <li key={index} className={styles.packageItem} style={{backgroundColor: getBackgroundColor(pack)}}>{pack}</li>
        ))}
      </ul>
    </div>
  )
}

export default PackageList
