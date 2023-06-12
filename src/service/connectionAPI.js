import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7084/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const login = async (url, data, setData) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const create = async (url, data, setData) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const find = async (url, setData) => {
  const response = await api.get(url);
  setData(response.data);
};

export const update = async (url, data, setData) => {
  const response = await api.put(url, data);
  setData(response.data);
};

export const remove = async (url) => {
  await api.delete(url);
};
