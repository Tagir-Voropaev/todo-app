import React from 'react'
import { Link } from 'react-router-dom';
import '../static/css/header.css'
// import whitelogo from '../static/images/whitelogo.png'
// import whitebluelogo from '../static/images/whiteblue.png'
import bluelogo from '../static/images/blue.png'
// import blacklogo from '../static/images/blacklogo.png'

// import viollogo from '../images/viollogo.png'


const Header = () => {
    let isAuth = true
    return (
        <div className="header">
            <div className='header-nav'>
                <div className="header-logo">
                    <Link to="/"><img src={bluelogo} alt="" /></Link>
                </div>
                <nav className="header-links">
                    <div className='header-link'>
                        <p className='header-link-item'>Задачи</p>
                        <i className="header-link-item fa-solid fa-list-check"></i>
                    </div>
                    <div className='header-link'>
                        <p className='header-link-item'>Скрипты</p>
                        <i class="header-link-item fa-solid fa-list"></i>
                    </div>
                </nav>
                <div className="header-side">
                    {isAuth ? (
                        <>
                            <div className="header-auth">
                                <button className='header-auth-elem header-logout'>Выйти</button>
                            </div>
                        </>) : (
                        <>
                            <div className="header-auth">
                                <Link to="/auth" className='header-auth-elem header-login'>Войти</Link>
                                <Link to="/registration" className='header-auth-elem header-reg'>Создать аккаунт</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Header;