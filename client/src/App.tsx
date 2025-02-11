import { useState } from 'react'
import s from './App.module.scss'
import Auth from './components/auth/Auth'
import Home from './components/home/Home'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return (
        <div className={s.app}>
            {isAuthenticated ? <Home /> : <Auth />}
        </div>
    )
}

export default App
