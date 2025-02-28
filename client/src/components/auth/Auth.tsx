import React from 'react'
import s from './Auth.module.scss'
import Login from './Login'



const Auth = () => {

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