import React from 'react'
import s from '../static/css/header/header.module.scss'
import Search from './Search'
import Notifications from './Notifications'
const Header = ({ text }) => {
    return (
        <div className={s.header}>
            <h1 draggable='false' className={s.pageTitle}>{text[0]}</h1>
            <Search text={text[1]} />
            <div className={s.menu}>
                <Notifications />
                <Notifications />
                <Notifications />
            </div>
        </div>
    )
}

export default Header