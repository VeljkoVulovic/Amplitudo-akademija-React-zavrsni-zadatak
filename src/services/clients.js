import axiosInstance from "./axios";

export const getClients = ({ pageParam = 1, queryKey }) => {
  const { search } = queryKey[1];
  return axiosInstance.get(`/clients?page=${pageParam}`, {
    params: {
      search: search,
    },
  });
};

export const storeClient = (data) => {
  return axiosInstance.post(`/user-store`, data);
};

export const showClient = (id) => {
  return axiosInstance.get(`/user-show/${id}`);
};

export const updateClient = (data, id) => {
  return axiosInstance.post(`/user-update/${id}`, data);
};

export const deleteClient = (id) => {
  return axiosInstance.delete(`/user-delete/${id}`);
};

export const getCountries = () => {
  return axiosInstance.get(`/countries`);
};
