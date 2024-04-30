import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import UserExtension from '../extensions/user-extension';

export default function Authorization() {
    const userExtension = UserExtension();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userExtension.isUserValid(login, password)) navigate('/main');
      else setMessage('Неверный логин или пароль');
    };
    
    return (
      <section className='forms'>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <div className='inplate'>
            <span>{message}</span>
            <input className='inputs' type='text' placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div className='inplate'>
            <input className='inputs' type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input className='btn' type='submit' value='Войти' />
        </form>
        <Link className='htext' to='/registration'>Нет аккаунта?</Link>
      </section>
    );
  }