import axios from 'axios';

axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop';
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
