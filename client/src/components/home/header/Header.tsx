import React, { useState } from 'react'
import s from './Header.module.scss'
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className={s.header}>
            <div className={s.profile} onClick={() => setIsMenuOpen(!isMenuOpen)} >
                <div className={s.profileName}>Имя Фамилия</div>
                <div className={s.profileImage}></div>
            </div>
            <div className={`${s.profileMenu} ${isMenuOpen ? s.profileMenuOpen : ''}`}>
                <ul>
                    <li>Задачи</li>
                    <li>Контакты</li>
                    <li>Настройки</li>
                    <li>Выйти</li>
                </ul>
            </div>
        </div>
    )
}

export default Header