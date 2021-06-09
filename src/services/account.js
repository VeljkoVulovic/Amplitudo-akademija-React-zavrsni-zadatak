import axiosInstance from "./axios";
import axios from "axios";

export const login = (data) => {
  return axios({
    method: "POST",
    baseURL: "http://akademija-api.proserver.me/",
    url: "/api/auth/login",
    data: data,
  });
};

export const info = () => {
  return axiosInstance.post(`/api/auth/me`);
};

export const logout = () => {
  return axiosInstance.post(`/api/auth/logout`);
};

export const refreshToken = () => {
  return axiosInstance.post(`/api/auth/refresh`);
};

export const changePassword = (data) => {
  return axiosInstance.post(`/api/auth/change-password`, data);
};
