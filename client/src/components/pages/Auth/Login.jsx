import React, { useEffect, useState } from 'react'
import s from '../../../static/css/components/auth/Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoginUser } from '../../../store/users/loginSlice'
import { useForm } from 'react-hook-form'


const Login = () => {
    const [notification, setNotification] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { data, status, error } = useSelector(state => state.loginUser);
    useEffect(() => {
        console.log(data);
        if (error) {
            setNotification(data.message)
        }
    }, [data, status, error]);



    const onSubmit = async (values) => {
        await dispatch(fetchLoginUser(values))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Login}>

            <h1 className={s.authTitle}>Авторизация</h1>
            {/* Ввод логина */}
            <input className={s.authInput}
                {...register("login", { required: true })}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                name='login' type="text" placeholder="Логин" />
            {/* Ввод пароля */}
            <input className={s.authInput}
                {...register("password", { required: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name='password' type="password" placeholder="Пароль" />

            <div className={`${s.notification} ${error ? s.error : ''}`}>{notification}</div>
            <button type='submit' className={s.authButton} >Войти</button>
            <a className={s.authLink} href="#">Забыли пароль?</a>
        </form>
    )
}

export default Login