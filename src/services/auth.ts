import { AxiosError } from 'axios';
import { API_URLS } from '@/constants/config';
import { AuthFormType } from '@/types/authForm';
import apiClient from './apiClient';

export const signInAPI = async (form: AuthFormType) => {
  try {
    const response = await apiClient.post(API_URLS.signIn, form);
    localStorage.setItem('access_token', response.data.access_token);
    return response;
  } catch (e) {
    const err = e as AxiosError<any>;
    if (err.response?.status === 401) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert(err.response?.data.message);
    }
  }
};

export const signUpAPI = async (form: AuthFormType) => {
  try {
    const response = await apiClient.post(API_URLS.signUp, form);
    return response;
  } catch (e) {
    const err = e as AxiosError<any>;
    if (err.response?.status === 400) {
      alert('동일한 이메일이 이미 존재합니다.');
    } else {
      alert(err.response?.data.message);
    }
  }
};
