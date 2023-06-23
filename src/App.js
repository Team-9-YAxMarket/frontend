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
  const [userProgress, setUserProgress] = useState(0)
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
    setUserProgress((prev) => prev + 11)
  };

  async function handleStartSession()  {
    setLoading(true);
    const serverData = await fetchDataFromServer(userId);
    if (typeof serverData === 'undefined') {
      const manuallyCreatedData = {
        "session_id": "session_id",
        "user_id": "ssd-12gfcpt",
        "order": {
          "order_id": "unique_order_011",
          "recommended_carton": [
            {
              "carton_id": "carton_id_2",
              "carton_type": "myd",
              "barcode": "000987654321",
              "box_id": "box_id_3"
            }
          ],
          "items": [
            {
              "id": "unique_sku_3_id",
              "sku": "Умная колонка Яндекс Станция Лайт, ультрафиолет",
              "barcode": "2134433212",
              "img": "https://static.mvideo.ru/media/Promotions/Promo_Page/2021/July/obzor-yandex-stantsii-lajt/obzor-yandex-stantsii-lajt-top1-m.png",
              "count": 1,
              "prompt": ["пузырчатая пленка", "непрозрачный пакет", "нужно сканировать IMEI"],
              "box_id": "box_id_3"
            },
            {
              "id": "unique_sku_4_id",
              "sku": "Умные часы Apple Watch Series 7 45 мм Aluminium Case, (PRODUCT)RED",
              "barcode": "0909092202",
              "img": "https://ipixel.ru/upload/iblock/a94/ua1sef2ps2eb3j790i2qxo655d2q1u8g.jpg",
              "count": 1,
              "prompt": ["нужно сканировать IMEI"],
              "box_id": "box_id_3"
            },
            {
              "id": "unique_sku_5_id",
              "sku": "Интимный гель-смазка Contex Green с антибактериальным эффектом, 30 мл",
              "barcode": "0123333333",
              "img": "https://evropharm.ru/Storage/gelj-smazka-contex-romantic-100ml-aromat.jpg",
              "count": 1,
              "prompt": ["непрозрачный пакет"],
              "box_id": "box_id_3"
            },
            {
              "id": "unique_sku_6_id",
              "sku": "Тарелка. Императорский фарфоровый завод. Форма 'Стандартная - 2', рисунок 'Скарлетт 2'. Костяной фарфор . 270 мм.",
              "barcode": "01221212124",
              "img": "https://fissman.ru/upload/resize_cache/webp/upload/iblock/1f7/azd2ffb6amk19it16ozmr3vldco8fdqu/FarforovayatarelkaTOLEDO21sm.webp",
              "count": 4,
              "prompt": ["пузырчатая пленка", "стретч-пленка"],
              "box_id": null
            }
          ]
        }
      };
      setSessionData(manuallyCreatedData);
    } else {
      setSessionData(serverData);
    }
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
          <Header userId={sessionData.user_id} userProgress={userProgress}/>
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
