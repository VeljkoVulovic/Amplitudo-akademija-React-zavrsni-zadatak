import axiosInstance from "./axios";
import axios from "axios";

export const getReservations = ({ pageParam = 1 }) => {
  return axios({
    method: "GET",
    baseURL: "http://akademija-api.proserver.me/api/",
    url: `/reservations?page=${pageParam}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};

export const storeReservation = (data) => {
  return axiosInstance.post(`/reservation-store`, data,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};

export const showReservation = (id) => {
  return axiosInstance.get(`/reservation-show/${id}`,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};

export const updateReservation = (data, id) => {
  return axiosInstance.post(`/reservation-update/${id}`, data,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};

export const deleteReservation = (id) => {
  return axiosInstance.delete(`/reservation-delete/${id}`,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};

export const getEquipment = () => {
  return axiosInstance.get(`/equipment`,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};

export const getLocations = () => {
  return axiosInstance.get(`/locations`,{ headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}`}});
};
