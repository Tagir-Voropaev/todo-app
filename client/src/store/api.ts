import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Укажите базовый URL вашего бэкенда
});

// Добавляем интерцептор для запросов
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
  }
  return config;
});

export default api;