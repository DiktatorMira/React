import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from "./components/navigation";
import { AboutFunc } from './components/about-func';
import { AboutClass } from './components/about-class';
import { CityFunc } from './components/city-func';
import { CityClass } from './components/city-class';
import { BookFunc } from './components/book-func';
import { BookClass } from './components/book-class';

export const App = () => {
  return (
    <>
    <Router>
        <header>
          <div className="container">
            <Navigation />
          </div>
        </header>
        <main>
          <div className="container">
            <Routes>
              <Route path="/about-func" Component={AboutFunc} />
              <Route path='/about-class' Component={AboutClass} />
              <Route path='/city-func' Component={CityFunc} />
              <Route path='/city-class' Component={CityClass} />
              <Route path='/book-func' Component={BookFunc} />
              <Route path='/book-class' Component={BookClass} />
            </Routes>
          </div>
        </main>
    </Router>
    </>
  );
}