import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import s from '../../../static/css/components/auth/Auth.module.scss'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className={s.auth} >
      <div className={s.authBlock}>
        <div className={s.authSelect}>
          <button onClick={() => setIsLogin(true)} className={s.authSelectButton}>Вход</button>
          <button onClick={() => setIsLogin(false)} className={s.authSelectButton}>Регистрация</button>
          <div className={`${s.authSelectLine} ${isLogin ? s.authSelectLineLeft : s.authSelectLineRight}`}></div>
        </div>
        {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
      </div>
    </div>

  )
}

export default Auth