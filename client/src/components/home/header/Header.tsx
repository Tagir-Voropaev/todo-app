import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './Header.module.scss';
import { logoutUser } from '../../../store/authSlice';
import { AppDispatch } from '../../../store/store';
// import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png'
import headerbg from '../../../images/backgroundheader.jpg'
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); // Получаем dispatch

    // Функция для выхода из аккаунта
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()); // Вызываем action для выхода из аккаунта
            navigate('/auth'); // Перенаправляем на страницу авторизации после выхода
        } catch (error) {
            console.error('Ошибка выхода из аккаунта:', error);
        }
    };

    return (
        <div className={s.header}>
            {/* <img className={s.headerBackground} src={headerbg}/> */}
            <img className={s.headerLogo} src={logo} alt="" />
            <ul className={s.headerList}>
                <li className={s.headerItem}>
                    <p className={s.headerItemLink}>Клубы</p>
                </li>
                <li className={s.headerItem}>
                    <p className={s.headerItemLink}>Акции</p>
                </li>
                <li className={s.headerItem}>
                    <p className={s.headerItemLink}>Цены</p>
                </li>
                <span className={s.headerListLine}></span>
            </ul>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={s.profilePerson}>
                <div className={s.profileName}>Тагир</div>
                <div className={s.profileStatus}>Администратор</div>
                <div className={`${s.burgerMenu} ${isMenuOpen ? s.burgerMenuOpen : ''}`}>
                    <div className={s.burgerMenuItem}>Профиль</div>
                    <div className={s.burgerMenuItem}>Задачи</div>
                    <div className={s.burgerMenuItem}>Статистика</div>
                    <div className={s.burgerMenuItem}>Настройки</div>
                    <div onClick={handleLogout} className={s.burgerMenuItem}>Выйти</div>
                </div>
            </div>

        </div>
    );
};

export default Header;