import React from 'react'
import s from './Profile.module.scss'
import Header from '../header/Header'
const Profile = () => {
  return (
    <div className={s.profile}>
        <div className={s.profileBlock}>
            <h3 className={s.profileTitle}>Профиль</h3> 
            <div className={s.fields}>
                <p>Имя</p>
                <input type="text" className={s.field} placeholder="Введите имя" />
                <p>Фамилия</p>
                <input type="text" className={s.field} placeholder="Введите фамилию" />
                <p>Email</p>
                <input type="email" className={s.field} placeholder="Введите email" />
                
            </div>
        </div>

    </div>
  )
}

export default Profile