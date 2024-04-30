import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../extensions/user-extension';

export default function Main() {
    const [isGameStarted, setIsGameStarted] = useState(false); // Состояние игры
    const [timeElapsed, setTimeElapsed] = useState(0); // Время таймера
    const [cardCount, setCardCount] = useState(0);  // Количество карточек для генерации
    const [inputDisabled, setInputDisabled] = useState(false); // Активен ли ввод кол-ва
    const intervalRef = useRef(null), { currentUser } = useUser(); // Ссылка на логин пользователя
    const [openedCards, setOpenedCards] = useState([]); // Кол-во открытых карточек
    const [images, setImages] = useState([]);
    const [cardStyles, setCardStyles] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]); 

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartGame = () => { // Начало игры
        if(cardCount === 0) {
            alert('Введите число карточек!');
            return;
        } else if (cardCount % 2 !== 0) {
            alert('Число каточек должно быть кратно 2!');
            return;
        } else if(cardCount > 32){
            alert('Максимальное число - 32 карточки!');
            return;
        }
        setIsGameStarted(true);
        setInputDisabled(true);
        setTimeElapsed(0);
        intervalRef.current = setInterval(() => { // Сохраняем ссылку на таймер
            setTimeElapsed(prevTime => prevTime + 1);
        }, 1000);
        setImages([]);
        setCardStyles([]);
        genereateAndShuffle();
    };

    const genereateAndShuffle = () => {
        const newImages = [];
        const newCardStyles = [];
        for (let i = 1; i <= cardCount / 2; i++) {
            for (let j = 0; j < 2; j++) {
                newImages.push(`../public/textures/${i}.webp`);
                newCardStyles.push('url(../public/textures/background.webp) center / contain no-repeat');
            }
        }
        for (let i = newImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newImages[i], newImages[j]] = [newImages[j], newImages[i]];
        }
        setImages(newImages);
        setCardStyles(newCardStyles);
    }

    const handleCardClick = (index) => { // Обработка нажатия на карточку
        if (!isGameStarted || openedCards.includes(index)) return;
        const newOpenedCards = [...openedCards, index]; // Добавляем открытую карточку
        setOpenedCards(newOpenedCards);
        const newCardStyles = [...cardStyles]; // Обновляем стили карточек
        newCardStyles[index] = `url('${images[index]}') center / contain no-repeat`;
        setCardStyles(newCardStyles);
        console.log(images[index]);
        if (newOpenedCards.length === 2) { // Проверяем совпадение карточек
            const [firstIndex, secondIndex] = newOpenedCards;
            if (images[firstIndex] === images[secondIndex]) {
                const newCardStyles = [...cardStyles];
                newCardStyles[firstIndex] = 'matched';
                newCardStyles[secondIndex] = 'matched';
                matchedCards.push(newCardStyles[firstIndex]);
                matchedCards.push(newCardStyles[secondIndex]);
                setCardStyles(newCardStyles);
                setOpenedCards([]);
                checkWin(); // Проверяем, выиграли ли игру после каждого совпадения
            } else {
                setTimeout(() => {
                    const resetCardStyles = [...cardStyles];
                    resetCardStyles[firstIndex] = 'url(../public/textures/background.webp) center / contain no-repeat';
                    resetCardStyles[secondIndex] = 'url(../public/textures/background.webp) center / contain no-repeat';
                    setCardStyles(resetCardStyles);
                    setOpenedCards([]);
                }, 750);
            }
        }
    };
    const checkWin = () => { // Проверка выигрыша
        if (matchedCards.length === cardCount) {
            setIsGameStarted(false);
            setInputDisabled(false);
            clearInterval(intervalRef.current);
            if (window.confirm('Вы выиграли! Начать заново?')) window.location.reload(); 
        }
    }
    const handleEndGame = () => { // Конец игры
        setOpenedCards([]);
        setMatchedCards([]);
        const resetCardStyles = Array(cardCount).fill('url(../public/textures/1.webp) center / contain no-repeat');
        setCardStyles(resetCardStyles);
        clearInterval(intervalRef.current);
        window.confirm('Игра окончена!')
        window.location.reload(); 
    };
    const handleInputChange = (event) => { // Ввод кол-ва карточек
        const { value } = event.target;
        setCardCount(parseInt(value));
    };
    return (
        <>
            <section className='top'>
                <h1>{formatTime(timeElapsed)}</h1>
                <div className='forinp'>
                    {isGameStarted ? (
                        <input className='btn sec' type='button' value='Закончить' onClick={handleEndGame} />
                    ) : (
                        <input className='btn sec' type='button' value='Начать' onClick={handleStartGame} />
                    )}
                    <input className='inputs sec' type='number' placeholder='Кол-во карточек' onChange={handleInputChange} disabled={inputDisabled}/>
                </div>
            </section>
            <h1 className='user'>Добро пожаловать, {currentUser}! <Link className='htext small' to='/'>Выйти</Link></h1> 
            <section className='cards'>
                {isGameStarted && cardStyles.map((style, index) => (
                    <div key={index} className={`card ${style === 'matched' ? 'matched' : ''}`} style={{ backgroundImage: style }} onClick={() => handleCardClick(index)}></div>
                ))}
            </section>
        </>
    );
}