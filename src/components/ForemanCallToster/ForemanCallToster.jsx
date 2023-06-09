import styles from './ForemanCallToster.module.css';
import { motion as m } from 'framer-motion';
import PageMainText from '../PageMainText/PageMainText';

const ForemanCallToster = ({ isForemanCall }) => {
  const foremanCall = 'Бригадир скоро подойдет';
  const foremanTosterTest = 'Подождите немного';
  return (
    isForemanCall && (
      <m.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isForemanCall ? 1 : 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.foremanToster}
      >
        <PageMainText title={foremanCall} />
        <p className={styles.foremanTosterText}>{foremanTosterTest}</p>
      </m.div>
    )
  );
};

export default ForemanCallToster;
