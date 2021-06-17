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

export const info = () => {
  return axiosInstance.post(`/auth/me`);
};

export const refreshToken = () => {
  return axiosInstance.post(`/auth/refresh`);
};

export const changePassword = (data) => {
  return axiosInstance.post(`/auth/change-password`, data);
};
