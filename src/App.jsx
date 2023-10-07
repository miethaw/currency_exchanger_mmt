import { useEffect, useState } from 'react'
import './App.css'
import { getSupportedCurrencies } from './services/apiService';
import Home from './pages/Home';
import Background from './assets/images/currency.webp'

function App() {
  const [ currencyList, setCurrencyList ]=useState(null);

  useEffect(() => {
    const abort = new AbortController();
      getSupportedCurrencies(abort.signal).then((response) => {
        setCurrencyList(response?.currencies);
      });
    return () => {
      abort.abort();
    };
  }, [])
  

  return (
    <div className=' w-screen h-screen flex justify-center' style={{ backgroundImage : `url(${Background})` }}>
      <Home currencyList={currencyList} />
    </div>
  )
}

export default App
