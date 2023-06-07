import './App.css';
import { useState, useEffect } from 'react';
import Toster from './components/Toster/Toster';
import PrimaryButton from './components/PrimaryButton/PrimaryButton';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import PageMainText from './components/PageMainText/PageMainText';
import CellList from './components/CellList/СellList'
function App() {
  const [isStatusOk, setIsStatusOk] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModalWindow = () => {
    setIsModalOpen(!isModalOpen);
  };

  const cells = [
    {
      id: 1,
      name: 'B-08'
    },
    {
      id: 2,
      name: 'B-09'
    },
    {
      id: 3,
      name: 'B-10'
    }
  ]

  return (
    <div className="App">
      {/* <PrimaryButton title='Закончить упаковку' disabled={false}/> */}
      {/* <Toster isStatusOk={isStatusOk}/> */}
      {/* <ProgressBar totalItems={7} scannedItems={4}/> */}
      {/* {isModalOpen && <ModalWindow onClose={toggleModalWindow}/>}
      <Footer isBackButton={true} onKeyboardButtonClick={toggleModalWindow}/> */}
      {/* <Header /> */}
      {/* <PageMainText title='Сканируйте штрихкод принтера'/>
      <CellList cells={cells}/> */}
    </div>
  );
}

export default App;
