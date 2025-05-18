import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [text, setText] = useState('Merhaba Dünya!');
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState('#000000');
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h1 className="title">Tuval</h1>

        <label>Tuval Boyutu:</label>
        <select onChange={e => {
          const [w, h] = e.target.value.split('x').map(Number);
          setCanvasSize({ width: w, height: h });
        }}>
          <option value="1080x1080">Instagram Gönderi (1:1)</option>
          <option value="1080x1350">3:4</option>
          <option value="1080x1920">Hikaye (9:16)</option>
        </select>

        <label>Arkaplan Rengi:</label>
        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />

        <label>Metin:</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />

        <label>Yazı Boyutu:</label>
        <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />

        <label>Yazı Rengi:</label>
        <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />

        <button onClick={handleDownload}>İndir</button>
      </div>

      <div className="canvas-area">
        <div
          ref={canvasRef}
          className="canvas"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            backgroundColor: bgColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: fontColor,
            fontSize: fontSize,
            fontFamily: 'Quicksand',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default App;
