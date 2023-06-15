import axios from 'axios';
import { Slide, toast } from 'react-toastify';
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

export const create = async (url, data) => {
  try {
    await api.post(url, data);
    toast.success('Criado com sucesso.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Erro ao criar.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  }
};

export const find = async (url, setData) => {
  try {
    const response = await api.get(url);
    setData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const update = async (url, data) => {
  try {
    await api.put(url, data);
    toast.success('Atualizado com sucesso.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Erro ao atualizar.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  }
};

export const remove = async (url) => {
  try {
    await api.delete(url);
    toast.success('Item excluído.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Erro ao deletar.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  }
};
