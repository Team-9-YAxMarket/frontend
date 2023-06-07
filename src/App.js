import './App.css';
import { useState, useEffect } from 'react';
import Toster from './components/Toster/Toster';
import PrimaryButton from './components/PrimaryButton/PrimaryButton';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
function App() {
  const [isStatusOk, setIsStatusOk] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="App">
      {/* <PrimaryButton title='Закончить упаковку' disabled={false}/> */}
      {/* <Toster isStatusOk={isStatusOk}/> */}
      {/* <ProgressBar totalItems={7} scannedItems={4}/> */}
      {/* {isModalOpen && <ModalWindow onClose={toggleModalWindow}/>}
      <Footer isBackButton={true} onKeyboardButtonClick={toggleModalWindow}/> */}
      <Header />
    </div>
  );
}

export default App;
