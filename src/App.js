import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import Header from './components/Header/Header';
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
import { trueGoods } from './utils/truegoods';

export const AppContext = createContext()

function App() {
  const [isSuccessSession, setIsSuccessSession] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');
  const [sessionData, setSessionData] = useState({
    userId: trueGoods.user.id,
    order: trueGoods.order,
  });
  console.log('sessionData',sessionData)
  console.log('Упаковщик выбрал упаковку:', selectedPackage)

  // Функция обновления данных
  const updateSessionData = (updatedData) => {
    setSessionData(updatedData)
  }

  const sendDataToServer = () => {
    // Тут Будет логика отправки данных на сервер
  }

  // Загрузка данных из localStorage при запуске приложения
  useEffect(() => {
    const savedSessionData = localStorage.getItem('sessionData');
    if (savedSessionData) {
      setSessionData(JSON.parse(savedSessionData));
    } else {
      // Если данных в localStorage нет, устанавливаем начальное значение из trueGoods
      setSessionData({
        userId: trueGoods.user.id,
        order: trueGoods.order,
      });
    }
  }, []);

  // Обновление данных в localStorage при изменении sessionData
  useEffect(() => {
    if (sessionData) {
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }
  }, [sessionData]);


  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <AppContext.Provider value={{ sessionData, updateSessionData, sendDataToServer }}>
        {isModalOpen && (
          <ModalWindow
            onClose={toggleModalWindow}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />
        )}
        <Header userId={sessionData.userId} />
        <Routes>
          <Route path="/" element={<ScanTableBarcodePage />} />
          <Route path="/scanprinter" element={<ScanPrinterBarcodePage />} />
          <Route path="/scancell" element={<ScanCellPage products={sessionData.order} />} />
          <Route
            path="/productlist"
            element={
              <ProductListPage
                products={sessionData.order}
                setSelectedPackage={setSelectedPackage}
                setIsSuccessSession={setIsSuccessSession}
                isModalOpen={toggleModalWindow}
              />
            }
          />
          <Route
            path="/hasproblems"
            element={<HasProblemsPage setPageTitle={setPageTitle} />}
          />
          <Route
            path="/notenoughgoods"
            element={
              <NotEnoughGoodsPage pageTitle={pageTitle} products={sessionData.order} />
            }
          />
          <Route
            path="/finishsession"
            element={<FinishSession isSuccessSession={isSuccessSession} />}
          />
          <Route path="/putgoodsinbox" element={<PutGoodsInBox />} />
        </Routes>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
