import axios from "axios";
import axiosInstance from "../configs/axiosInstance";

const getSupportedCurrencies = async () => {
  try {
    const res = await axiosInstance.get("/list", {  });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request was aborted");
    } else {
      console.error(err.message);
    }
  }
};

const convertCurrencies = async (params) => {
  try {
    const res = await axiosInstance.get("/convert", { params });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request was aborted");
    } else {
      console.error(err.message);
    }
  }
};

const getCurrencyHistoricalData = async (params) => {
    try {
      const res = await axiosInstance.get("/timeframe", { params });
      return res.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request was aborted");
      } else {
        console.error(err.message);
      }
    }
  };

const curreciesExchangeList= async (params) => {
    try {
      const res = await axiosInstance.get("/live", { params });
      return res.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request was aborted");
      } else {
        console.error(err.message);
      }
    }
  };

export { getSupportedCurrencies, convertCurrencies,getCurrencyHistoricalData,curreciesExchangeList };
