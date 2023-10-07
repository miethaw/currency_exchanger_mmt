import axios from "axios";
import axiosInstance from "../configs/axiosInstance";

const getSupportedCurrencies = async (signal) => {
  try {
    const res = await axiosInstance.get("/list", { signal });
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

export { getSupportedCurrencies, convertCurrencies };
