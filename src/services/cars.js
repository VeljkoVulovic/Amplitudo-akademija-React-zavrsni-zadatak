import axiosInstance from "./axios";

export const getCars = () => {
  return axiosInstance.get(`/api/vehicles`);
};

export const storeCar = (data) => {
  return axiosInstance.post(`/api/vehicle`, data);
};

export const showCar = (id) => {
  return axiosInstance.get(`/api/vehicle-show/${id}`);
};

export const updateCar = (id, data) => {
  return axiosInstance.post(`/api/vehicle-update/${id}`, data);
};

export const deleteCar = (id) => {
  return axiosInstance.delete(`/api/vehicle-delete/${id}`);
};
