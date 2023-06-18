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

export const AppContext = createContext();

function App() {
  const [isSuccessSession, setIsSuccessSession] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState([]);
  const [isPackageSelected, setIsPackageSelected] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showToster, setShowToster] = useState(false);
  const [tosterMessage, setTosterMessage] = useState('');

  const [pageTitle, setPageTitle] = useState('Выберите отсутствующий товар');

  const [sessionData, setSessionData] = useState({
    userId: trueGoods.user_id,
    order: trueGoods.order,
  });
  console.log('sessionData', sessionData);
  console.log('Упаковщик выбрал упаковку:', selectedPackage);
  const cartonIds = selectedPackage.map((item) => item.carton_id);
  console.log('Массив упаковок для бека:', cartonIds);

  const fetchDataFromServer = (endpoint) => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка получения данных с сервера');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно получены:', data);
        setSessionData(data);
      })
      .catch((error) => {
        console.log(error);
        // Обработка ошибки получения данных с сервера
      });
  };

  fetchDataFromServer('http://127.0.0.1/api/v1/session');

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

  
const sendDataToServer = (endpoint) => {
  const cartonIds = selectedPackage.map((item) => item.carton_id);
  const updatedItems = sessionData.order.items.map((item) => ({
    id: item.id,
    status: item.status,
  }));
  console.log(updatedItems);
  const updatedSessionData = {
    ...sessionData,
    order: {
      items: updatedItems,
      recommended_carton: cartonIds,
    },
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSessionData),
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
  // создание глубокой копии обьекта без ссылки, чтобы хранить в сторадж
  // всегда актуальную sessionData
  useEffect(() => {
    if (sessionData) {
      const sessionDataCopy = JSON.parse(JSON.stringify(sessionData));
      localStorage.setItem('sessionData', JSON.stringify(sessionDataCopy));
    }
  }, [sessionData]);

  useEffect(() => {
    if (selectedPackage) {
      const updatedOrder = {
        ...sessionData.order,
        selected_carton: selectedPackage,
      };
      setSessionData({
        ...sessionData,
        order: updatedOrder,
      });
    }
  }, [selectedPackage]);

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
          {isModalOpen && (
            <ModalWindow
              onClose={toggleModalWindow}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              setIsPackageSelected={setIsPackageSelected}
              setShowToster={setShowToster}
              setTosterMessage={setTosterMessage}
            />
          )}
          <Header />
          <Routes>
            <Route path="/" element={<ScanTableBarcodePage />} />
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
