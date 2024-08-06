import axios from "axios";

const baseUrl = process.env.REACT_APP_API;
const path = process.env.REACT_APP_PATH;

const config = {
  baseUrl: baseUrl + path,
  timeout: 60 * 1000,
  withCredentials: true,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    const authToken = window.localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

_axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const useAxios = () => {
  return _axios;
};

export default _axios;
