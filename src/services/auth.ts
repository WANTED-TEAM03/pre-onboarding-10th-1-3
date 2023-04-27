import { AxiosError } from 'axios';
import { AuthForm } from '@/types/authForm';
import { API_URL } from '@/utils/config';
import apiClient from './apiClient';

export const SignInAPI = async (form: AuthForm) => {
  try {
    const response = await apiClient.post(API_URL.signIn, form);
    return response;
  } catch (e) {
    const err = e as AxiosError<any>;
    if (err.response?.status === 401) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert(err.response?.data.message);
    }
    return Promise.reject(err);
  }
};
