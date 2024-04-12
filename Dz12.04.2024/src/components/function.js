import React, { useState } from 'react';
import './style.css';

export default function Function() {
    const [value, setValue] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const handleIncrement = (amount) => { setValue(value + amount); };
    const handleDecrement = (amount) => { setValue(value - amount); };
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        const body = document.querySelector('body');
        if (darkMode) {
            body.style.backgroundColor = 'rgb(255, 255, 255)';
            body.style.color = 'rgb(0, 0, 0)';
        } else {
            body.style.backgroundColor = 'rgb(30, 30, 30)';
            body.style.color = 'rgb(255, 255, 255)';
        }
    };
    return (
        <>
            <ValueDisplay value={value} />
            <div className='forbut'>
                <ActionButton onClick={() => handleIncrement(1)} label="+1"/>
                <ActionButton onClick={() => handleIncrement(10)} label="+10"/>
                <ActionButton onClick={() => handleDecrement(100)} label="-100"/>
                <ActionButton onClick={() => handleIncrement(25)} label="+25"/>
            </div>
            <input className='theme' type="button" value="Сменить тему" onClick={toggleTheme} />
        </>
    );
}
function ValueDisplay({ value }) { return <h2>Значение: {value}</h2>; }
function ActionButton({ onClick, label }) {
    return (
        <input className='buttons' type='button' value={label} onClick={onClick}/>
    );
}