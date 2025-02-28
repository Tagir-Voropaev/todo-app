import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/authSlice'; // Импортируем действие
import s from './Header.module.scss';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Получаем dispatch

    // Функция для выхода из аккаунта
    const handleLogout = async () => {
        try {
            // Отправляем запрос на сервер для выхода
            await axios.post('http://localhost:5000/api/logout', {}, {
                withCredentials: true, // Отправляем куки с запросом
            });
    
            // Очищаем localStorage и sessionStorage
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
    
            // Очищаем состояние пользователя в Redux
            await dispatch(logoutUser());
    
            // Перенаправляем на страницу авторизации
            navigate('/auth');
        } catch (error) {
            console.error('Ошибка при выходе из аккаунта:', error);
        }
    };
    
    return (
        <div className={s.header}>
            <div className={s.profile}>
                <div
                    className={`${s.profileButton} ${isMenuOpen ? s.profileButtonActive : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={s.profilePerson}>
                        <div className={s.profileName}>Тагир</div>
                        <div className={s.profileStatus}>Администратор</div>
                    </div>
                    <div className={s.profileImage}></div>
                </div>
                <ul className={`${s.profileMenu} ${isMenuOpen ? s.profileMenuOpen : ''}`}>
                    <li className={s.profileMenuItem}>Задачи</li>
                    <li className={s.profileMenuItem}>Заведения</li>
                    <li className={s.profileMenuItem}>База знаний</li>
                    <li className={s.profileMenuItem}>Контакты</li>
                    <li className={s.profileMenuItem}>Настройки</li>
                    <li className={s.profileMenuItem} onClick={handleLogout}>Выйти</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;