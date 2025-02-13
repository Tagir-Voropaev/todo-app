import React from 'react'
import s from './Home.module.scss'
import Header from './header/Header'
const Home = () => {
    return (
        <div className={s.home}>
            <Header/>
        </div>
    )
}

export default Home