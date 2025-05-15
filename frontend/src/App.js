import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './components/CanvasEditor';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/kayit" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
