import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import { HasProblemsPage } from './pages';


function App() {
  //const [isStatusOk, setIsStatusOk] = useState(true);
  //const [isModalOpen, setIsModalOpen] = useState(true);

  // const toggleModalWindow = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Routes>
          <Route path="/" element={<HasProblemsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
