import React from 'react'
import s from '../static/css/header/notifications.module.scss'
const Notifications = () => {
    return (
        <div className={s.notifications}>
            <button className={s.notifButton}><i className={`${s.notifIcon} fa-regular fa-bell`}></i></button>
        </div>
    )
}

export default Notifications