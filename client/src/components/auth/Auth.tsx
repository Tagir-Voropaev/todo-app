import { useEffect } from 'react';
import s from './Auth.module.scss';
import Login from './Login';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const { user, loading } = useSelector((state: RootState) => state.auth);

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
                    <div draggable="false" className={s.authTitle}>Авторизация</div>
                    <span className={s.authLine}></span>
                </div>
                {!user && <Login />} {/* Показываем форму входа только если пользователь не авторизован */}
            </div>
        </div>
    );
};

export default Auth;