import './App.css';
import AdmissionForm from './pages/AdmissionForm';
import {Routes, Route} from "react-router-dom"
import Payment from './pages/Payment';
import { DataProvider } from './contextData/DigitalContent';
import ReactGA from 'react-ga4';

function App() {
  ReactGA.initialize("G-86XXG6VF1L");
  ReactGA.send({ hitType: "pageview", page: "/signup/payment", title: "Success page" });
  
  return (
    <>
    <DataProvider>
    <Routes basename='/signup' >
      <Route path='/signup' element={<AdmissionForm/>} />
      <Route path='/signup/payment' element={<Payment/>} />
    </Routes>
    </DataProvider>
    </>
  );
}

export default App;
