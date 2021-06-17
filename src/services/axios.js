import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://akademija-api.proserver.me/api/",
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
});

export default axiosInstance;
