import React from 'react'
import s from './Home.module.scss'
import Header from './header/Header'
import Tasks from './tasks/Tasks'
const Home = () => {
    return (
        <div className={s.home}>
            <Header/>
            <Tasks/>
        </div>
    )
}

export default Home