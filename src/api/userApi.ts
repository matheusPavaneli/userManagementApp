import axios from 'axios';
import globalConfig from '../config/global';
import { store } from '../app/store';

const { BASE_URL } = globalConfig;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const csrfToken = state.user.csrfToken;

    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const authenticate = async (loginContent: string, password: string) => {
  const response = await api.post('/login', { loginContent, password });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await api.post('/register', { username, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const update = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await api.post('/user/update', {
    username,
    email,
    password,
  });
  return response.data;
};

export const deleteUser = async () => {
  const response = await api.post('/user/delete');
  return response.data;
};

export const resetPassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  const response = await api.post(
    `/reset-password/${encodeURIComponent(token)}`,
    { password, confirmPassword },
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post('/forgot-password/', { email });
  return response.data;
};

export const activate2FA = async () => {
  const response = await api.post('/2FA/activate');
  return response.data;
};

export const verify2FA = async (verifyCode: string) => {
  const response = await api.post('/2FA/verify', { verifyCode });
  return response.data;
};

export const desactivate2FA = async (verifyCode: string) => {
  const response = await api.post('/2FA/desactive', { verifyCode });
  return response.data;
};

export const uploadImage = async (formData: FormData) => {
  const response = await api.post('/image/upload', formData);
  return response.data;
};

export const getCsrfToken = async () => {
  const response = await api.get('/csrf/get');
  return response.data;
};
