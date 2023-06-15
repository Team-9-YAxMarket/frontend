import React from 'react';
import styles from './Toster.module.css';
import { motion as m } from 'framer-motion';
import { tosterVariants } from '../../utils/motion';

const Toster = ({ isStatusOk, message }) => {
  const tosterClass = isStatusOk ? styles.correct : styles.error;
  

  return (
    <m.div
      variants={tosterVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={`${styles.toster} ${tosterClass}`}
    >
      {message}
    </m.div>
  );
};

export default Toster;
