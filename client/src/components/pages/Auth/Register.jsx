import React, { useEffect, useState } from 'react'
import s from '../../../static/css/components/auth/Register.module.scss'
import { useSelector } from 'react-redux';

const Register = ({ setIsLogin }) => {
    const [notification, setNotification] = useState()

    const { data, status, error } = useSelector(state => state.loginUser);
    useEffect(() => {
        console.log(data);
        if (data && data.message) {
            setNotification(data.message);
        }
    }, [data]);
    return (
        <div className={s.Register}>
            <h1 className={s.authTitle}>Регистрация</h1>
            <input className={s.authInput} type="text" placeholder="Логин" />
            <input className={s.authInput} type="password" placeholder="Пароль" />
            <div className={`${s.notification} ${error ? s.error : ''}`}>{notification}</div>

            <button className={s.authButton}>Создать аккаунт</button>
            <a onClick={() => setIsLogin(true)} className={s.authLink} href="#">Уже есть аккаунт?</a>
        </div>
    )
}

export default Register