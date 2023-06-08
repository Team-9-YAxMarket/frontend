import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import { HasProblemsPage, NotEnoughGoodsPage } from './pages';



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
          <Route path="/" element={<NotEnoughGoodsPage />} />
          {/* <Route path="/hasproblems" element={<HasProblemsPage />} /> */}
          {/* <Route path="/notenaughgoods" element={<NotEnoughGoodsPage />} /> */}
        </Routes>
 
      </div>
    </div>
  );
}

export default App;
