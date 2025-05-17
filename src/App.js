
// CanvasEditorV4 - Başlangıç dosyası
// Kurulum: create-react-app ya da Vite ile yapılabilir
// Bu dosya App.js olacak şekilde hazırlanmıştır

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const defaultText = {
  id: Date.now(),
  value: 'Örnek Metin',
  font: 'Quicksand',
  size: 48,
  color: '#3ecf00',
  bold: false,
  italic: false,
  x: 100,
  y: 100,
};

function App() {
  const canvasRef = useRef(null);
  const [texts, setTexts] = useState([defaultText]);
  const [selectedTextId, setSelectedTextId] = useState(defaultText.id);
  const [bgType, setBgType] = useState('color');
  const [bgColor, setBgColor] = useState('#003e92');
  const [bgGradient, setBgGradient] = useState('linear-gradient(to right, #003e92, #3ecf00)');
  const [bgImage, setBgImage] = useState(null);
  const [bgBlur, setBgBlur] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const updateText = (key, value) => {
    setTexts(prev =>
      prev.map(t =>
        t.id === selectedTextId ? { ...t, [key]: value } : t
      )
    );
  };

  const selectedText = texts.find(t => t.id === selectedTextId);

  return (
    <div className="editor-container">
      <div className="sidebar">
        <h2>CanvasEditor</h2>
        <label>Font:</label>
        <select value={selectedText.font} onChange={e => updateText('font', e.target.value)}>
          <option value="Quicksand">Quicksand</option>
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Georgia">Georgia</option>
        </select>

        <label>Yazı Boyutu:</label>
        <input type="number" value={selectedText.size} onChange={e => updateText('size', parseInt(e.target.value))} />

        <label>Yazı Rengi:</label>
        <input type="color" value={selectedText.color} onChange={e => updateText('color', e.target.value)} />

        <div>
          <button onClick={() => updateText('bold', !selectedText.bold)}>B</button>
          <button onClick={() => updateText('italic', !selectedText.italic)}><i>I</i></button>
        </div>

        <hr />
        <label>Arka Plan Türü:</label>
        <select value={bgType} onChange={e => setBgType(e.target.value)}>
          <option value="color">Renk</option>
          <option value="gradient">Gradyan</option>
          <option value="image">Görsel</option>
        </select>

        {bgType === 'color' && (
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        )}

        {bgType === 'gradient' && (
          <textarea value={bgGradient} onChange={e => setBgGradient(e.target.value)} />
        )}

        {bgType === 'image' && (
          <input type="file" accept="image/*" onChange={e => setBgImage(URL.createObjectURL(e.target.files[0]))} />
        )}

        <label>
          <input type="checkbox" checked={bgBlur} onChange={() => setBgBlur(!bgBlur)} /> Arka Plan Blur
        </label>

        <button onClick={handleDownload}>İndir</button>
      </div>

      <div
        className="canvas"
        ref={canvasRef}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          background: bgType === 'color' ? bgColor : bgType === 'gradient' ? bgGradient : 'none',
          backgroundImage: bgType === 'image' ? `url(${bgImage})` : undefined,
          backgroundSize: 'cover',
          filter: bgBlur ? 'blur(3px)' : 'none',
          position: 'relative'
        }}
      >
        {texts.map(t => (
          <div
            key={t.id}
            style={{
              position: 'absolute',
              top: t.y,
              left: t.x,
              fontFamily: t.font,
              fontSize: t.size,
              color: t.color,
              fontWeight: t.bold ? 'bold' : 'normal',
              fontStyle: t.italic ? 'italic' : 'normal',
              cursor: 'move'
            }}
            onClick={() => setSelectedTextId(t.id)}
            draggable
            onDragEnd={e => updateText('x', e.pageX - canvasRef.current.offsetLeft)}
            onDragStart={e => updateText('y', e.pageY - canvasRef.current.offsetTop)}
          >
            {t.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
