import React, { useState } from 'react';

export default function Form() {
    const [login, setLogin] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleValidation = () => {
        let valid = true;

        if (!login) {
            setLoginError('Пожалуйста, введите логин');
            valid = false;
        } else setLoginError('');

        const nameRegex = /^[а-яА-Я]+ [а-яА-Я]+ [а-яА-Я]+$/;
        if (!fullName || !nameRegex.test(fullName)) {
            setFullNameError('Пожалуйста, введите ФИО в правильном формате (Например: Иванов Иван Иванович)');
            valid = false;
        } else setFullNameError('');

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!password || !passwordRegex.test(password)) {
            setPasswordError('Пароль должен быть не менее 6 символов длиной и содержать хотя бы одну заглавную букву и одну цифру');
            valid = false;
        } else setPasswordError('');

        if (password !== confirmPassword) {
            setConfirmPasswordError('Пароли не совпадают');
            valid = false;
        } else setConfirmPasswordError('');

        setIsValid(valid);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation();
        if (isValid) alert('Форма успешно отправлена!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Логин:</label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                <span className="error">{loginError}</span>
            </div>
            <div>
                <label>ФИО:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <span className="error">{fullNameError}</span>
            </div>
            <div>
                <label>Пароль:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="error">{passwordError}</span>
            </div>
            <div>
                <label>Подтвердите пароль:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="error">{confirmPasswordError}</span>
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
}