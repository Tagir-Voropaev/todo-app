import React, { useState } from 'react'
import s from './Auth.module.scss'
import Login from './Login'
import Register from './Register'
const Auth = () => {
    const [left, isLeft] = useState(false)
    return (
        <div className={s.auth} >
            <div className={s.authBlock}>
                <div className={s.authChoise}>
                    <div draggable="false" className={s.authTitle} onClick={() => isLeft(false)}>Авторизация</div>
                    <div draggable="false" className={s.authTitle} onClick={() => isLeft(true)}>Регистрация</div>
                    <span className={`${s.authLine} ${left ? s.authLineRight : ''}`}></span>
                </div>
                {left ? <Register /> : <Login />}
            </div>
        </div>
    )
}

export default Auth