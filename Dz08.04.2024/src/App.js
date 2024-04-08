import React from 'react';
import './App.css';
import { AboutFunc } from './components/about-func';
import { AboutClass } from './components/about-class';
import { CityFunc } from './components/city-func';
import { CityClass } from './components/city-class';
import { BookFunc } from './components/book-func';
import { BookClass } from './components/book-class';

export const App = () => {
  return (
    <>
      <AboutFunc/>
      <AboutClass/>
      <CityFunc/>
      <CityClass/>
      <BookFunc/>
      <BookClass/>
    </>
  );
}