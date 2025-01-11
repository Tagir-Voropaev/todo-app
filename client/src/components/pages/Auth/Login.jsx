import React from 'react'
import s from '../../../static/css/components/auth/Login.module.scss'

const Login = () => {
    return (
        <div className={s.Login}>
            <h1 className={s.authTitle}>Авторизация</h1>
            <input className={s.authInput} type="text" placeholder="Логин" />
            <input className={s.authInput} type="password" placeholder="Пароль" />
            <button className={s.authButton}>Войти</button>
            <a className={s.authLink} href="#">Забыли пароль?</a>
        </div>
    )
}

export default Login