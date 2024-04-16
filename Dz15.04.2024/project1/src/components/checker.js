import React, { useState } from 'react';

export default function Checker() {
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
        document.body.style.backgroundColor = darkTheme ? '#fff' : '#333'; // Изменение цвета фона
        document.body.style.color = darkTheme ? '#333' : '#fff'; // Изменение цвета текста
    };
    return (
        <div className='thirdplate'>
            <label class="toggle-slider">
                <input type="checkbox" onChange={toggleTheme} checked={darkTheme}/>
                <span class="slider"></span>
            </label>
        </div>
    );
}