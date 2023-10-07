import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { convertCurrencies } from "../services/apiService";

function Home(props) {
  const { currencyList } = props;
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [ amount, setAmount ]=useState(0);
  const [ warning, setWarning ]=useState(null);
  const [ result,setResult ]=useState(0);
  const [ loading,setLoading ]=useState(false);

  const onAmountChange=(e)=>{
    
    if(e.target.value <0){
      setWarning('Please enter an amount greater than 0');
    }
    else if(e.target.value < 1){
      setWarning('Please enter an amount greater than 0');

      setAmount(e.target.value);
    }
    else{
      setWarning(null);
      setAmount(e.target.value);
      convertCurrency(e.target.value);
    }
  }

  const convertCurrency=(value)=>{
    setLoading(true);
    const params={
      'from': currencyFrom,
      'to':currencyTo,
      'amount':value
    }
    convertCurrencies(params).then((response) => {
      setResult(response?.result);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });;
  }

  const switchCurrency = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  useEffect(()=>{
    if(amount>0){
      convertCurrency(amount);
    }
  },[currencyFrom,currencyTo])
  return (
    <div className=" w-2/4 justify-center items-end flex-col m-3  mt-44">
      <div className=" mb-10">
        <p className="uppercase text-3xl text-textWhite drop-shadow-md hover:drop-shadow-xl">
          We Change your currency for everday
        </p>
      </div>
      <div className="  h-3/4 justify-center bg-primary/[0.6] backdrop-blur-md p-16  rounded-md">
        <div className="flex  justify-center  items-center">
          <div className="w-2/5 mr-1 ">
            <Input onAmountChange={onAmountChange} amount={amount} warning={warning} />
            
          </div>

          <div className="w-1/5 justify-center  mt-2  text-white">
            <p className=" text-center"> =</p>
          </div>
          <div className="w-2/5  mr-1 justify-start flex mt-2 text-textPrimary">
            {
              loading ? <p className=" text-left  text-xl loading">...</p> : <p className=" text-left  text-lg">{result?.toFixed(4)}</p>
            }
            <p className=" text-left  text-lg ml-4">{currencyTo}</p>
          </div>
        </div>
        <div className="flex  justify-center  items-center mt-6">
          <div className="w-2/5 mr-1 ">
            <Select
              currencyList={currencyList}
              onCurrencyChange={setCurrencyFrom}
              selected={currencyFrom}
              label={"From"}
            />
            <p className=" text-left  text-xs text-textSecondry">{currencyList?.[currencyFrom]}</p>
          </div>
          <div className="w-1/5  flex justify-center  items-center mt-3 text-white">
            <span className=" cursor-pointer" onClick={() => switchCurrency()}>
              <ArrowsRightLeftIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="w-2/5 mr-1 text-white">
            <Select
              currencyList={currencyList}
              onCurrencyChange={setCurrencyTo}
              selected={currencyTo}
              label={"To"}
            />
            <p className=" text-left  text-xs text-textSecondry">{currencyList?.[currencyTo]}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
