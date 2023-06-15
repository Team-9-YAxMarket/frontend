import React from 'react';
import styles from './Toster.module.css';
import { motion as m } from 'framer-motion';
import { tosterVariants } from '../../utils/motion';

const Toster = ({ isStatusOk }) => {
  const tosterClass = isStatusOk ? styles.correct : styles.error;
  const message = isStatusOk ? 'Упаковка добавлена' : 'Упаковка не считалась';

  return (
    <m.div
      variants={tosterVariants}
      initial='hidden'
      animate={isStatusOk ? 'visible' : 'exit'}
      exit='exit'
      className={`${styles.toster} ${tosterClass}`}
    >
      {message}
    </m.div>
  );
};

export default Toster;
