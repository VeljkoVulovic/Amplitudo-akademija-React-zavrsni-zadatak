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
  return axiosInstance.post(`/reservation-store`, data);
};

export const showReservation = (id) => {
  return axiosInstance.get(`/reservation-show/${id}`);
};

export const updateReservation = (data, id) => {
  return axiosInstance.post(`/reservation-update/${id}`, data);
};

export const deleteReservation = (id) => {
  return axiosInstance.delete(`/reservation-delete/${id}`);
};

export const getEquipment = () => {
  return axiosInstance.get(`/equipment`);
};

export const getLocations = () => {
  return axiosInstance.get(`/locations`);
};
