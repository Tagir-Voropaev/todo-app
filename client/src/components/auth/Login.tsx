import React, { useEffect, useState } from 'react';
import s from './Auth.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // Добавляем токен в заголовок запроса
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token && !user) {
          // Если токен есть, но пользователь не авторизован в Redux,
          // можно отправить запрос на сервер для проверки токена и получения данных пользователя
         
          axios
          .get('http://localhost:5000/api/login', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const userData = response.data;
            dispatch(loginUser(userData));
          })
          .catch(() => {
            // Если токен недействителен, очищаем его
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
          });
        }
      }, [dispatch]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        try {
            // Дожидаемся завершения асинхронного действия
            const resultAction = await dispatch(loginUser({ login, password }));

            // Проверяем, успешно ли завершилось действие
            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/'); // Переходим на главную страницу только после успешной авторизации
            } else {
                console.error('Ошибка авторизации:', resultAction.payload);
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <form className={s.authFormLogin} onSubmit={handleLogin}>
            {/* login form */}
            <input
                onChange={(e) => setLogin(e.target.value)}
                className={s.authInput}
                type="username"
                placeholder="Логин"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className={s.authInput}
                type="current-password"
                placeholder="Пароль"
            />
            <button type="submit" className={s.authButton}>
                Войти
            </button>
            <div className={s.authLinkBlock}>
                <a className={s.authLink} href="#">
                    Забыли пароль?
                </a>
            </div>
            <div className={s.authSocial}></div>
        </form>
    );
};

export default Login;