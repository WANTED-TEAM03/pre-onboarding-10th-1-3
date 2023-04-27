import { AxiosError } from 'axios';
import { API_URLS } from '@/constants/config';
import apiClient from './apiClient';

export const getTodosAPI = async () => {
  try {
    const response = await apiClient.get(API_URLS.todos);
    return response.data;
  } catch (e) {
    const err = e as AxiosError<any>;
    alert(err.response?.data.message);
  }
};

export const createTodoAPI = async (todo: string) => {
  try {
    const response = await apiClient.post(API_URLS.todos, { todo });
    return response.data;
  } catch (e) {
    const err = e as AxiosError<any>;
    alert(err.response?.data.message);
  }
};

export const updateTodoAPI = async (id: number, todo: string, isCompleted: boolean) => {
  try {
    const response = await apiClient.put(`${API_URLS.todos}/${id}`, { todo, isCompleted });
    return response.data;
  } catch (e) {
    const err = e as AxiosError<any>;
    alert(err.response?.data.message);
  }
};

export const deleteTodoAPI = async (id: number) => {
  try {
    const response = await apiClient.delete(`${API_URLS.todos}/${id}`);
    return response.data;
  } catch (e) {
    const err = e as AxiosError<any>;
    alert(err.response?.data.message);
  }
};
