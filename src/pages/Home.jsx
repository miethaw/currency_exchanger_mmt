import React, { useEffect, useState } from "react";

import Input from "../components/Input";
import Select from "../components/Select";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import {
  convertCurrencies,
  getCurrencyHistoricalData,
  getSupportedCurrencies,
} from "../services/apiService";

import HistoryTable from "../components/HistoryTable";
import LineChart from "../components/LineChart";
import moment from "moment/moment";
import Loading from "../components/Loading";
// import SkeletonLoading from "../components/SkeletonLoading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoading from "../components/SkeletonLoading";

<Skeleton />;

function Home() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState(null);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currencyList, setCurrencyList] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  const onAmountChange = (e) => {
    if (e.target.value < 0) {
      setWarning("Please enter an amount greater than 0");

    } else if (e.target.value < 1) {
      setWarning("Please enter an amount greater than 0");

      setAmount(e.target.value);
    } else {
      setWarning(null);
      setAmount(e.target.value);
      convertCurrency(e.target.value);
      getHistoricalData();
    }
  };

  const convertCurrency = (value) => {
    setLoading(true);
    const params = {
      from: currencyFrom,
      to: currencyTo,
      amount: value,
    };
    convertCurrencies(params)
      .then((response) => {
        setResult(response?.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const switchCurrency = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }


  const getHistoricalData = async() => {
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");

    const params = {
      start_date: startDate,
      end_date: endDate,
      currencies: `${currencyFrom},${currencyTo}`,
    };
    await delay();
    getCurrencyHistoricalData(params)
      .then((response) => {
        setHistoryData(response?.quotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHistoricalData();
  }, []);

  useEffect(() => {
    if (amount > 0) {
      convertCurrency(amount);
    }
    getHistoricalData();
    
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    getSupportedCurrencies().then((response) => {
      setCurrencyList(response?.currencies);
    });
  }, []);

  return (
    <>
      <div className=" mt-10">
        <p className="uppercase text-3xl text-textWhite drop-shadow-md hover:drop-shadow-xl">
          We Change your currency for everday
        </p>
      </div>
      <div className="justify-center flex flex-wrap">
        <div className="w-2/5 m-3 mt-11 md:min-w-0 min-w-full mx-10">
          <div className=" justify-center bg-primary/[0.6] backdrop-blur-md px-10 py-5 items-center  rounded-md">
            <div className="flex  justify-center  items-center">
              <div className="w-2/5 mr-1 ">
                <Input
                  onAmountChange={onAmountChange}
                  amount={amount}
                  warning={warning}
                />
              </div>

              <div className="w-1/5 justify-center  mt-2  text-white">
                <p className=" text-center"> =</p>
              </div>
              <div className="w-2/5  mr-1 justify-start flex mt-2 text-textPrimary">
                {loading ? (
                  <p className=" text-left  text-xl loading">...</p>
                ) : (
                  <p className=" text-left  text-lg">{result?.toFixed(4)}</p>
                )}
                <p className=" text-left  text-lg ml-4">{currencyTo}</p>
              </div>
            </div>
            <div className="flex  justify-center  items-center mt-6">
              <div className="w-2/5 mr-1  relative">
                <Select
                  currencyList={
                    currencyList &&
                    Object.keys(currencyList)
                      ?.filter((item) => item != `${currencyTo}`)
                      .map((v) => v)
                  }
                  onCurrencyChange={setCurrencyFrom}
                  selected={currencyFrom}
                  label={"From"}
                />
                <p className=" text-left  text-xs text-textSecondry h-10">
                  {currencyList?.[currencyFrom]}
                </p>
              </div>
              <div
                className="w-1/5  flex justify-center  items-center text-white"
                style={{ marginTop: -14 }}
              >
                <span
                  className=" cursor-pointer"
                  onClick={() => switchCurrency()}
                >
                  <ArrowsRightLeftIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="w-2/5 mr-1 text-white">
                <Select
                  currencyList={
                    currencyList &&
                    Object.keys(currencyList)
                      ?.filter((item) => item != `${currencyFrom}`)
                      .map((v) => v)
                  }
                  onCurrencyChange={setCurrencyTo}
                  selected={currencyTo}
                  label={"To"}
                />
                <p className=" text-left  text-xs text-textSecondry h-10">
                  {currencyList?.[currencyTo]}
                </p>
              </div>
            </div>
          </div>
          <div className=" w-full mt-10">
            <div
              className=" p-10 bg-primary backdrop-blur-md"
              style={{ position: "relative", zIndex: -100 }}
            >
              {historyData ? (
                <LineChart
                  historyData={historyData}
                  name={currencyFrom.concat(currencyTo)}
                />
              ) : (
                <div className="">
                  <Loading type={"bars"} color={"#37B9F3"} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-2/5 md:min-w-0 min-w-full  mx-10">
          {historyData ? (
            <HistoryTable
              currencyFrom={currencyFrom}
              currencyTo={currencyTo}
              historyData={historyData}
            />
          ) : (
            <div className=" mt-10 justify-center">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
