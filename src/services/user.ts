import axios, { AxiosError } from 'axios';
import { Form } from '@/types/form';

export const SignUpAPI = async (form: Form) => {
  try {
    const response = await axios.post('/auth/signup', form, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return alert((e as AxiosError<any>).response?.data.message);
  }
};

export const SignInAPI = async (form: Form) => {
  try {
    const response = await axios.post('/auth/signin', form, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('token', response.data.access_token);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    return response;
  } catch (e) {
    const err = e as AxiosError<any>;
    if (err.response?.status === 401) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert(err.response?.data.message);
    }
    return null;
  }
};
