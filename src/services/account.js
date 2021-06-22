import axiosInstance from "./axios";
import axios from "axios";

export const login = (data) => {
  return axios({
    method: "POST",
    baseURL: "http://akademija-api.proserver.me/api/",
    url: "/auth/login",
    data: data,
  });
};

export const logout = (data) => {
  return axiosInstance.post(`/auth/logout`,data,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}})
};

