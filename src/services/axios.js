import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://akademija-api.proserver.me/api/"
});

export default axiosInstance;
