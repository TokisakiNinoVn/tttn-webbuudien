import instance from '@/services/axiosConfig';

const login = async ({username, email, password}) => instance.post('/api/public/auth/login', {username, email, password});

export {
  login
}