import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.scss';
import { checkAuth, logoutUser } from '../../../store/authSlice';
import { AppDispatch, RootState } from '../../../store/store';

import logo from '../../../images/logo.png'



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); // Получаем dispatch
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const [isPageState, setPageState] = useState(0);
    // Функция для выхода из аккаунта
    const handleLogout = async () => {

        try {
            await dispatch(logoutUser()).unwrap(); // Вызываем action для выхода из аккаунта
            navigate('/auth'); // Перенаправляем на страницу авторизации после выхода
            await dispatch(checkAuth()).unwrap(); // Вызываем action для выхода из аккаунта
        } catch (error) {
            console.error('Ошибка выхода из аккаунта:', error);
        }
    };


    // Передвижение подчеркивания у навигации

    return (
        <div className={s.header}>
            {/* <img className={s.headerBackground} src={headerbg}/> */}
            <Link className={s.headerLogoLink} to='/'>
                <img className={s.headerLogo} src={logo} alt="" />
            </Link>
            <ul className={s.headerList}>
                <li onClick={() => setPageState(0)} className={s.headerItem}>
                    <Link to='/' className={`${s.headerItemLink}`}>Главная</Link>
                    <div className={`${s.headerListLine}
                     ${isPageState === 0 ? s.headerItemActive1 : ''}
                     ${isPageState === 1 ? s.headerItemActive2 : ''}
                     ${isPageState === 2 ? s.headerItemActive3 : ''}
                     ${isPageState === 3 ? s.headerItemActive4 : ''}
                     `}></div>
                </li>
                <li onClick={() => setPageState(1)} className={s.headerItem}>
                    <p className={s.headerItemLink}>Клубы</p>
                </li>
                <li onClick={() => setPageState(2)} className={s.headerItem}>
                    <p className={s.headerItemLink}>Акции</p>
                </li>
                <li onClick={() => setPageState(3)} className={s.headerItem}>
                    <p className={s.headerItemLink}>Цены</p>
                </li>
            </ul>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={s.profilePerson}>
                <div className={s.profileName}>{user?.login}</div>
                {user?.role === 'user' && <div className={s.profileStatus}>Пользователь</div>}
                {user?.role === 'admin' && <div className={s.profileStatus}>Администратор</div>}
                {user?.role === 'control' && <div className={s.profileStatus}>Управляющий</div>}
                <div className={`${s.burgerMenu} ${isMenuOpen ? s.burgerMenuOpen : s.burgerMenuClose}`}>
                    <Link to='/' className={s.burgerMenuItem}>Главная</Link>
                    <Link to='/profile' className={s.burgerMenuItem}>Профиль</Link>
                    {user?.role === 'admin' || user?.role === 'control' ?
                        <Link to='/tasks' className={s.burgerMenuItem}>Задачи</Link>
                        : ''
                    }
                    <div className={s.burgerMenuItem}>Статистика</div>
                    <div className={s.burgerMenuItem}>Настройки</div>
                    <div onClick={handleLogout} className={s.burgerMenuItem}>Выйти</div>
                </div>
            </div>

        </div>
    );
};

export default Header;