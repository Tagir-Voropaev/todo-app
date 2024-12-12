import React from 'react'
import { Link } from 'react-router-dom';
import '../static/css/header.css'
// import whitelogo from '../static/images/whitelogo.png'
// import whitebluelogo from '../static/images/whiteblue.png'
import bluelogo from '../static/images/blue.png'
// import blacklogo from '../static/images/blacklogo.png'

// import viollogo from '../images/viollogo.png'


const Header = () => {
    return (
        <div className="header">
            <div className='header-nav'>
                <div className="header-logo">
                    <Link to="/"><img src={bluelogo} alt="" /></Link>
                </div>
                <nav className="header-links">
                    <Link draggable="false"  to="/" className='header-link'>
                        <p className='header-link-item'>Главная</p>
                        <i className="header-link-item fa-solid fa-house"></i>
                    </Link>
                    <Link draggable="false" to="/tasks" className='header-link'>
                        <p className='header-link-item'>Задачи</p>
                        <i className="header-link-item fa-solid fa-list-check"></i>
                    </Link>
                    <Link draggable="false" to="/scripts/subtab/" className='header-link'>
                        <p className='header-link-item'>Скрипты</p>
                        <i className="header-link-item fa-solid fa-list"></i>
                    </Link>
                </nav>
                <div className="header-side">
                   
                </div>
            </div>
        </div>
    )
}


export default Header;