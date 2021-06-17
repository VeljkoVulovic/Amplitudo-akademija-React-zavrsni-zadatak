import axiosInstance from "./axios";

export const getCars = () => {
  return axiosInstance.get(`/vehicles`);
};

export const storeCar = (data) => {
  return axiosInstance.post(`/vehicle`, data);
};

export const showCar = (id) => {
  return axiosInstance.get(`/vehicle-show/${id}`);
};

export const updateCar = (data, id) => {
  return axiosInstance.post(`/vehicle-update/${id}`, data);
};

export const deleteCar = (id) => {
  return axiosInstance.delete(`/vehicle-delete/${id}`);
};

export const getCarTypes = () => {
  return axiosInstance.get(`/car-types`);
};
