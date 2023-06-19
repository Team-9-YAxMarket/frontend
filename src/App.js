import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Toster from './components/Toster/Toster';
import { fetchCarton, fetchDataFromServer, sendDataToServer } from './utils/api';

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

export const AppContext = createContext();

function App() {
  const navigate = useNavigate();
  const userId = 'c76a86b5-d8ed-4034-aaba-5fade610ec41';
  const [isSuccessSession, setIsSuccessSession] = useState(false);
  
  const [selectedPackage, setSelectedPackage] = useState([]);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showToster, setShowToster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState('');

  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');
  const [cartons, setCartons] = useState([])
  const [getLocalSessionData, setLocalSessionData] = useLocalStorage(
    'sessionData',
    {}
    );
  const [sessionData, setSessionData] = useState(getLocalSessionData());
  console.log('sessionData', sessionData);
  console.log('Упаковщик выбрал упаковку:', selectedPackage);
  const cartonIds = selectedPackage.map((item) => item.id);
  console.log('Массив упаковок для бека:', cartonIds);


  // Заготовка для хранения сессии в localStorage чтобы не терять данные сессии при перезагрузке страницы
  useEffect(() => {
    setLocalSessionData(sessionData);
  }, [sessionData, setLocalSessionData]);

  
  
  async function handleEndSession() {
    setLoading(true)
    const sessionId = sessionData.session_id;
    await sendDataToServer(sessionData, setSessionData, selectedPackage, sessionId,);
    setLoading(false)
    setSelectedPackage([]);
    navigate('/');
  };

  async function handleStartSession()  {
    setLoading(true)
    await fetchDataFromServer(userId, setSessionData)
    await fetchCarton(setCartons)
    setLoading(false)
    setSelectedPackage([]);
    setIsSuccessSession(false)
    navigate('/scanprinter')
  };

  
  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Функция обновления данных
  const updateSessionData = (updatedData) => {
    setSessionData(updatedData);
  };

  const updateProductStatus = (productId, status) => {
    const updatedItems = sessionData.order.items.map((item) => {
      if (item.id === productId) {
        const isAllItemsScanned = item.count === (item.scannedCount || 0) + 1;
        if (isAllItemsScanned) {
          // added — когда товар только создался
          // scanned — когда товар успешно отсканирован
          // fault — когда товар бракованный
          // absent — когда товар отсутствует
          item.status = status;
        }
        item.scannedCount = (item.scannedCount || 0) + 1;
      }
      return item;
    });
    const updatedOrder = {
      ...sessionData.order,
      items: updatedItems,
    };
    setSessionData({
      ...sessionData,
      order: updatedOrder,
    });
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <AppContext.Provider
          value={{
            sessionData,
            updateProductStatus,
            updateSessionData,
          }}
        >
          {showToster && <Toster tosterMessage={tosterMessage}/>}
          {isModalOpen && (
            <ModalWindow
              onClose={toggleModalWindow}
              cartons={cartons}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              setIsPackageSelected={setIsPackageSelected}
              setShowToster={setShowToster}
              setTosterMessage={setTosterMessage}
            />
          )}
          <Header userId={sessionData.user_id}/>
          <Routes>
            <Route
              path="/"
              element={
                <ScanTableBarcodePage handleStartSession={handleStartSession} loading={loading}/>
              }
            />
            <Route path="/scanprinter" element={<ScanPrinterBarcodePage />} />
            <Route
              path="/scancell"
              element={<ScanCellPage products={sessionData.order} />}
            />
            <Route
              path="/productlist"
              element={
                <ProductListPage
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  setIsSuccessSession={setIsSuccessSession}
                  isModalOpen={toggleModalWindow}
                  showToster={showToster}
                  setShowToster={setShowToster}
                  tosterMessage={tosterMessage}
                  setTosterMessage={setTosterMessage}
                  isPackageSelected={isPackageSelected}
                  setIsPackageSelected={setIsPackageSelected}
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
                <NotEnoughGoodsPage
                  pageTitle={pageTitle}
                  products={sessionData.order}
                />
              }
            />
            <Route
              path="/finishsession"
              element={
                <FinishSession
                  loading={loading}
                  isSuccessSession={isSuccessSession}
                  handleEndSession={handleEndSession}
                />
              }
            />
            <Route
              path="/putgoodsinbox"
              element={<PutGoodsInBox handleEndSession={handleEndSession} />}
            />
          </Routes>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
