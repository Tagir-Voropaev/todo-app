import React from 'react'
import s from './Auth.module.scss'
const Login = () => {
    return (
        <div className={s.authFormLogin}>
            {/* login form */}
            <input className={s.authInput} type="text" placeholder="Логин" />
            <input className={s.authInput} type="password" placeholder="Пароль" />
            <button className={s.authButton}>Войти</button>
            <div className={s.authLinkBlock}>
                <a className={s.authLink} href="#">Забыли пароль?</a>
            </div>
            <div className={s.authSocial}>
            </div>
        </div>
    )
}

export default Login