import React from 'react'
import s from '../../../static/css/components/auth/Register.module.scss'

const Register = ({setIsLogin}) => {
    return (
         <div className={s.Register}>
                    <h1 className={s.authTitle}>Регистрация</h1>
                    <input className={s.authInput} type="text" placeholder="Логин" />
                    <input className={s.authInput} type="password" placeholder="Пароль" />
                    <button className={s.authButton}>Создать аккаунт</button>
                    <a onClick={() => setIsLogin(true)} className={s.authLink} href="#">Уже есть аккаунт?</a>
                </div>
    )
}

export default Register