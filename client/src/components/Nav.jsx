import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import s from '../static/css/nav.module.scss'
import defaultAvatar from '../assets/images/avatar.png'

const Header = () => {
    return (
        <nav className={s.nav}>
            <Link className={s.avatar} to="/">
                <img className={s.avatarImg} src={defaultAvatar} alt="" />
            </Link>
            <p className={s.name}>Name SurnameAAA</p>
            <p className={s.email}>example@email.com</p>
            <ul className={s.navLinks}>
                <li className={s.navLinkElem}>
                    <NavLink to="/" className={({isActive}) =>`${s.navLink} ${isActive && s.navActive}`} draggable="false">
                        <i className={`${s.navLinkIcon} fa-solid fa-house`}></i>
                        <p className={s.navLinkText}>Главная</p>
                    </NavLink>
                </li>
                <li className={s.navLinkElem}>
                    <NavLink to="/tasks" className={({isActive}) =>`${s.navLink} ${isActive && s.navActive}`} draggable="false" >
                        <i className={`${s.navLinkIcon} fa-solid fa-list-check`}></i>
                        <p className={s.navLinkText}>Задачи</p>
                    </NavLink>
                </li>
                <li className={s.navLinkElem}>
                    <NavLink to="/scripts/subtab/" className={({isActive}) =>`${s.navLink} ${isActive && s.navActive}`} draggable="false" >
                        <i className={`${s.navLinkIcon} fa-solid fa-list`}></i>
                        <p className={s.navLinkText}>Скрипты</p>
                    </NavLink>
                </li>
                <li className={s.navLinkElem}>
                    <NavLink to="/timetable" className={({isActive}) =>`${s.navLink} ${isActive && s.navActive}`} draggable="false" >
                        <i className={`${s.navLinkIcon} fa-solid fa-calendar-days`}></i>
                        <p className={s.navLinkText}>Расписание</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}


export default Header;