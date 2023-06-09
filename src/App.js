import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ModalWindow from './components/ModalWindow/ModalWindow';
import {
  HasProblemsPage,
  NotEnoughGoodsPage,
  FinishSession,
  PutGoodsInBox,
  ProductListPage,
  ScanTableBarcodePage,
  ScanPrinterBarcodePage,
  ScanCellPage,
} from './pages';

function App() {
  const [isStatusOk, setIsStatusOk] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');

  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        {/* {isModalOpen && <ModalWindow onClose={toggleModalWindow} />} */}
        <Routes>
          <Route path="/" element={<ScanTableBarcodePage />} />
          <Route path="/scanprinter" element={<ScanPrinterBarcodePage />} />
          <Route path="/scancell" element={<ScanCellPage />} />
          <Route
            path="/hasproblems"
            element={<HasProblemsPage setPageTitle={setPageTitle} />}
          />
          <Route
            path="/notenaughgoods"
            element={<NotEnoughGoodsPage pageTitle={pageTitle} />}
          />
          <Route path="/finishsession" element={<FinishSession isStatusOk={false}/>} />
          <Route path="/putgoodsinbox" element={<PutGoodsInBox />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
