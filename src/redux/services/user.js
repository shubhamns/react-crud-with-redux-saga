import { baseURL } from "./../../config";
const axios = require("axios");

export const createUserAPI = (data) => {
  return axios.post(`${baseURL}/api/user`, data);
};

export const getUsersAPI = () => {
  return axios.get(`${baseURL}/api/user`);
};

export const getUserByIdAPI = (id) => {
  return axios.get(`${baseURL}/api/user/${id}`);
};

export const updateUserByIdAPI = (id, data) => {
  return axios.put(`${baseURL}/api/user/${id}`, data);
};

export const deleteUserByIdAPI = (id) => {
  return axios.delete(`${baseURL}/api/user/${id}`);
};
