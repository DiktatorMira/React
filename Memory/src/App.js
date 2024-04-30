import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Используем Routes
import Authorization from './components/authorization';
import Registration from './components/registration';
import Main from './components/main';
import { UserProvider } from './extensions/user-extension'; // Импорт UserProvider

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Authorization />} /> 
          <Route path="/registration" element={<Registration />} />
          <Route path="/main" element={<Main/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}