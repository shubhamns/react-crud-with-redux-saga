import { baseURL } from "./../../config";
const axios = require("axios");

export const createUserAPI = (data) => {
  return axios.post(`${baseURL}/api/v1/user`, data);
};

export const getUsersAPI = () => {
  return axios.get(`${baseURL}/api/v1/user`);
};

export const getUserByIdAPI = (id) => {
  return axios.get(`${baseURL}/api/v1/user/${id}`);
};

export const updateUserByIdAPI = (id, data) => {
  return axios.put(`${baseURL}/api/v1/user/${id}`, data);
};

export const deleteUserByIdAPI = (id) => {
  return axios.delete(`${baseURL}/api/v1/user/${id}`);
};
