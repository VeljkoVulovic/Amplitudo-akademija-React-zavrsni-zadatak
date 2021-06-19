import axiosInstance from "./axios";

export const getReservations = () => {
  return axiosInstance.get(`/reservations`);
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
