import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Toster from './components/Toster/Toster';

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
  const BASE_URL = 'http://ivr.sytes.net:9009/api/v1/session';
  const userId = 'c76a86b5-d8ed-4034-aaba-5fade610ec41';
  const [isSuccessSession, setIsSuccessSession] = useState(false);
  

  const [selectedPackage, setSelectedPackage] = useState([]);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showToster, setShowToster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState('');

  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');
  const [cartons, setCartons] = useState([])
  const [sessionData, setSessionData] = useState({});
  const [getLocalSessionData, setLocalSessionData] = useLocalStorage(
    'sessionData',
    {}
  );
  console.log('sessionData', sessionData);
  console.log('Упаковщик выбрал упаковку:', selectedPackage);
  const cartonIds = selectedPackage.map((item) => item.id);
  console.log('Массив упаковок для бека:', cartonIds);

  // useEffect(() => {
  //   // Обновляем данные из локального хранилища после монтирования компонента
  //   setSessionData(getLocalSessionData);
  // }, [getLocalSessionData]);

  useEffect(() => {
    setLocalSessionData(sessionData);
  }, [sessionData, setLocalSessionData]);

  const fetchDataFromServer = (endpoint, userId) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка получения данных с сервера');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно получены:', data);
        fetchCarton()
        setSessionData(data);
        setLocalSessionData(data)
      })
      .catch((error) => {
        console.log(error);
      });
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

  const fetchCarton = () => {
    fetch('http://ivr.sytes.net:9009/api/v1/carton')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCartons(data)
        // Здесь вы можете обработать полученные данные
      })
      .catch(error => {
        console.log(error);
        // Обработка ошибки запроса
      });
  };
  console.log(cartons)

  const sendDataToServer = (endpoint) => {
    const cartonIds = selectedPackage.map((item) => item.carton_id);
    const updatedItems = sessionData.order.items.map((item) => ({
      id: item.id,
      status: item.status,
    }));
    console.log(updatedItems);
    const requestBody = {
      ...sessionData,
      order: {
        items: updatedItems,
        selected_carton: cartonIds,
      },
    };
  
    setSessionData(sessionData)
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка выполнения запроса');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно отправлены', data);
      })
      .catch((error) => {
        console.log(error);
        // Обработка ошибки выполнения запроса
      });
  };
  
  async function handleEndSession() {
    await sendDataToServer(BASE_URL);
    navigate('/');
  };

  async function handleStartSession()  {
    await fetchDataFromServer(BASE_URL, userId)
    navigate('/scanprinter')
  };

  
  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <AppContext.Provider
          value={{
            sessionData,
            updateProductStatus,
            updateSessionData,
            fetchDataFromServer,
            sendDataToServer,
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
                <ScanTableBarcodePage handleStartSession={handleStartSession} />
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
