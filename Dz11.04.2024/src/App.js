import React, { useState } from 'react';
import './App.css';
import First from './components/first';
import Second from './components/second';
import Third from './components/third';

export default function App() {
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(true);

  const toggleFirst = () => { setShowFirst(!showFirst); };
  const toggleSecond = () => { setShowSecond(!showSecond); };
  const toggleThird = () => { setShowThird(!showThird); };

  return (
    <div className="app">
      <div className="card-container">
        {showFirst && <First />}
        <button className="btn" onClick={toggleFirst}>Переключить первое</button>
      </div>
      <div className="card-container">
        {showSecond && <Second />}
        <button className="btn" onClick={toggleSecond}>Переключить второе</button>
      </div>
      <div className="card-container">
        {showThird && <Third />}
        <button className="btn" onClick={toggleThird}>Переключить третье</button>
      </div>
    </div>
  );
}