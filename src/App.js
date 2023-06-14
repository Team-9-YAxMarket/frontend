import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Header from './components/Header/Header';
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
import { trueGoods } from './utils/truegoods';

function App() {
  const [isStatusOk, setIsStatusOk] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');
  const [products, setProducts] = useState(trueGoods)

  console.log(products)

  const userId = products.user.id
  const goods = products.order
  console.log(goods)

  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        {/* {isModalOpen && <ModalWindow onClose={toggleModalWindow} />} */}
        <Header userId={userId}/>
        <Routes>
          <Route path="/" element={<ScanTableBarcodePage />} />
          <Route path="/scanprinter" element={<ScanPrinterBarcodePage />} />
          <Route path="/scancell" element={<ScanCellPage />} />
          <Route path="/productlist" element={<ProductListPage products={goods} />} />
          <Route
            path="/hasproblems"
            element={<HasProblemsPage setPageTitle={setPageTitle} />}
          />
          <Route
            path="/notenaughgoods"
            element={<NotEnoughGoodsPage pageTitle={pageTitle} products={goods}/>}
          />
          <Route path="/finishsession" element={<FinishSession isStatusOk={false}/>} />
          <Route path="/putgoodsinbox" element={<PutGoodsInBox />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
