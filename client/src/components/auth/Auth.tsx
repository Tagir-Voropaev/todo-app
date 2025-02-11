import React from 'react'
import s from './Auth.module.scss'
const Auth = () => {
    return (
        <div className={s.auth} >
            <div className={s.authBlock}>
                <div className={s.authChoise}>
                    <div className={s.authTitle}>Авторизация</div>
                    <div className={s.authTitle}>Регистрация</div>
                </div>
            </div>
        </div>
    )
}

export default Auth