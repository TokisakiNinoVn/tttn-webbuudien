import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5007',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Thêm dòng này để cookie được gửi kèm trong yêu cầu
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
