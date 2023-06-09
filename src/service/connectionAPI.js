import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7084/api/',
});

export const login = async (url, data, setData) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const create = async (url, data, setData, headers) => {
  const response = await api.post(url, data, headers);
  setData(response.data);
};

export const find = async (url, setData, headers) => {
  const response = await api.get(url, headers);
  setData(response.data);
};

export const update = async (url, data, setData, headers) => {
  const response = await api.put(url, data, headers);
  setData(response.data);
};

export const remove = async (url, headers) => {
  await api.delete(url, headers);
};
