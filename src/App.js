
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgColor, setBgColor] = useState('#003e92');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderWidth, setBorderWidth] = useState(10);
  const [padding, setPadding] = useState(20);
  const [text, setText] = useState('Örnek Metin');
  const [fontSize, setFontSize] = useState(48);

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>CanvasEditor V5</h2>

        <label>Ebat:</label>
        <select onChange={e => {
          const [w, h] = e.target.value.split('x').map(Number);
          setCanvasSize({ width: w, height: h });
        }}>
          <option value="1080x1080">Instagram Gönderisi (1:1)</option>
          <option value="1080x1350">3:4</option>
          <option value="1080x1920">Hikaye (9:16)</option>
          <option value="custom">Özel</option>
        </select>

        <label>Arka Plan Rengi:</label>
        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />

        <label>Çerçeve Rengi:</label>
        <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} />

        <label>Çerçeve Kalınlığı (px):</label>
        <input type="number" value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} />

        <label>İç Boşluk (Padding px):</label>
        <input type="number" value={padding} onChange={e => setPadding(Number(e.target.value))} />

        <label>Metin:</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />

        <label>Yazı Boyutu:</label>
        <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />

        <button onClick={handleDownload}>İndir</button>
      </aside>

      <main className="canvas-wrapper">
        <div
          ref={canvasRef}
          className="canvas"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            backgroundColor: bgColor,
            border: `${borderWidth}px solid ${borderColor}`,
            padding: padding,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Quicksand',
            fontSize: fontSize,
            color: '#ffffff',
            boxSizing: 'border-box'
          }}
        >
          {text}
        </div>
      </main>
    </div>
  );
}

export default App;
