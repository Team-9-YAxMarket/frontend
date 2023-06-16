import styles from './ForemanCallToster.module.css';
import { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion';
import { tosterVariants } from '../../utils/motion';
import PageMainText from '../PageMainText/PageMainText';

const ForemanCallToster = ({ isForemanCall }) => {
  const foremanCall = 'Бригадир скоро подойдет';
  const foremanTosterTest = 'Подождите немного';
  const [showToster, setShowToster] = useState(false);


  useEffect(() => {
    if (isForemanCall) {
      setShowToster(true);

      const timer = setTimeout(() => {
        setShowToster(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isForemanCall]);

  return (
    showToster && (
      <m.div
        variants={tosterVariants}
        initial='hidden'
        animate={showToster ? 'visible' : 'exit'}
        exit='exit'
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
