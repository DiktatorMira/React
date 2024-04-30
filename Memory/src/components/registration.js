import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserExtension from '../extensions/user-extension';

export default function Registration() {
    const navigate = useNavigate();
    const userExtension = UserExtension();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userExtension.isUserExists(login)) {
            setLoginError('Пользователь с таким логином уже существует');
            return;
        } else if (password.length < 6) {
            setPasswordError('Пароль должен содержать не менее 6 символов');
            return;
        } else if (!/\d/.test(password)) {
            setPasswordError('Пароль должен содержать хотя бы одну цифру');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Пароль должен содержать хотя бы одну заглавную букву');
            return;
        } else if (password !== repeatPassword) {
            setRepeatPasswordError('Пароли не совпадают');
            return;
        }

        userExtension.addUser(login, password).then(result => {
            if (result === 'Пользователь уже существует') setLoginError('Пользователь с таким логином уже существует');
            else navigate('/main');
        }).catch(error => {
            console.error('Ошибка:', error);
            setLoginError('Произошла ошибка при регистрации');
        });
    };

    return (
        <section className='forms'>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div className='inplate'>
                    <span>{loginError}</span>
                    <input className='inputs' type='text' placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className='inplate'>
                    <span>{passwordError}</span>
                    <input className='inputs' type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='inplate'>
                    <span>{repeatPasswordError}</span>
                    <input className='inputs' type='password' placeholder='Повторите пароль' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>
                <input className='btn' type='submit' value='Зарегистрироваться' />
            </form>
            <Link className='htext' to='/'>Есть аккаунт?</Link>
        </section>
    );
}