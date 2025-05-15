import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CanvasEditorV2 from './components/CanvasEditorV2';
<Route path="/" element={<CanvasEditorV2 />} />
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CanvasEditor />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/kayit" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
