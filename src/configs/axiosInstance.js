import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://api.currencylayer.com',
  timeout: 5000,
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    access_key: 'ff912a3b31030a9db33d3adb014f36c8',
  },
});

export default axiosInstance;
