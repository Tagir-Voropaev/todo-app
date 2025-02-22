import React from 'react'
import s from './Auth.module.scss'
import Login from './Login'
import axios from 'axios';

const Auth = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // Добавляем токен в заголовок запроса
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
   
    return (
        <div className={s.auth} >
            <div className={s.authBlock}>
                <div className={s.authChoise}>
                    <div draggable="false" className={s.authTitle}>Авторизация</div>
                    <span className={s.authLine}></span>
                </div>
                {<Login />}
            </div>
        </div>
    )
}

export default Auth