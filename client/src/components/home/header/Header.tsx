import React, { useState } from 'react'
import s from './Header.module.scss'
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className={s.header}>
            <div className={s.profile} >
                <div className={`${s.profileButton} ${isMenuOpen ? s.profileButtonActive : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} >
                    <div className={s.profilePerson}>
                        <div className={s.profileName}>Тагир</div>
                        <div className={s.profileStatus}>Администратор</div>
                    </div>
                    <div className={s.profileImage}></div>
                </div>
                <ul className={`${s.profileMenu} ${isMenuOpen ? s.profileMenuOpen : ''}`}>
                    <li className={s.profileMenuItem}>Задачи</li>
                    <li className={s.profileMenuItem}>Контакты</li>
                    <li className={s.profileMenuItem}>Настройки</li>
                    <li className={s.profileMenuItem}>Выйти</li>
                </ul>
            </div>
        </div>
    )
}

export default Header