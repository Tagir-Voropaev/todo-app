import { useEffect, useState } from 'react';
import s from './Auth.module.scss';
import Login from './Login';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';

const Auth = () => {
    const navigate = useNavigate();
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const [isLeft, setLeft] = useState(true);


    // Если пользователь авторизован, перенаправляем на главную страницу
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Если идет загрузка, показываем индикатор загрузки
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={s.auth}>
            <div className={s.authBlock}>
                <div className={s.authChoise}>
                    <div onClick={() => setLeft(true)} draggable="false" className={s.authTitle}>Авторизация</div>
                    <div onClick={() => setLeft(false)} draggable="false" className={s.authTitle}>Регистрация</div>
                    <span className={`${s.authLine} ${isLeft ? s.authLineLeft : s.authLineRight}`}></span>
                </div>
                <div className={s.authForms}>
                    <div className={`${s.authWrapper} ${isLeft ? '' : s.authWrapperRight}`}>
                        <Login />
                        <Registration />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;