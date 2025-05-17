// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import CanvasEditorApp from './CanvasEditorApp';
import './index.css'; // Tailwind veya global stiller için

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CanvasEditorApp />
  </React.StrictMode>
);
