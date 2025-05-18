import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgType, setBgType] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradient, setBgGradient] = useState('linear-gradient(to right, #003e92, #3ecf00)');
  const [bgImage, setBgImage] = useState(null);
  const [bgBlur, setBgBlur] = useState(false);

  const [text, setText] = useState('Merhaba!');
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState('#000000');
  const [textAlign, setTextAlign] = useState('center');

  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState(5);
  const [borderRadius, setBorderRadius] = useState(12);
  const [padding, setPadding] = useState(20);

  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(80);

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="editor-wrapper">
      <div className="side-panel">
        <h2>CanvasEditor V8</h2>

        <label>Boyut:</label>
        <select onChange={e => {
          const [w, h] = e.target.value.split('x').map(Number);
          setCanvasSize({ width: w, height: h });
        }}>
          <option value="1080x1080">Instagram (1:1)</option>
          <option value="1080x1350">3:4</option>
          <option value="1080x1920">Story (9:16)</option>
        </select>

        <hr />
        <label>Arka Plan:</label>
        <select value={bgType} onChange={e => setBgType(e.target.value)}>
          <option value="color">Düz Renk</option>
          <option value="gradient">Gradyan</option>
          <option value="image">Görsel</option>
        </select>

        {bgType === 'color' && (
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        )}
        {bgType === 'gradient' && (
          <input type="text" value={bgGradient} onChange={e => setBgGradient(e.target.value)} />
        )}
        {bgType === 'image' && (
          <input type="file" accept="image/*" onChange={e => setBgImage(URL.createObjectURL(e.target.files[0]))} />
        )}
        <label>
          <input type="checkbox" checked={bgBlur} onChange={() => setBgBlur(!bgBlur)} /> Blur
        </label>

        <hr />
        <label>Metin:</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <label>Boyut:</label>
        <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
        <label>Renk:</label>
        <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
        <label>Hizalama:</label>
        <select value={textAlign} onChange={e => setTextAlign(e.target.value)}>
          <option value="left">Sola</option>
          <option value="center">Ortala</option>
          <option value="right">Sağa</option>
        </select>

        <hr />
        <label>Çerçeve Rengi:</label>
        <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} />
        <label>Çerçeve Kalınlığı:</label>
        <input type="number" value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} />
        <label>Köşe Yuvarlaklığı:</label>
        <input type="number" value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} />
        <label>Padding:</label>
        <input type="number" value={padding} onChange={e => setPadding(Number(e.target.value))} />

        <hr />
        <label>Logo:</label>
        <input type="file" accept="image/*" onChange={e => setLogo(URL.createObjectURL(e.target.files[0]))} />
        <label>Logo Boyutu:</label>
        <input type="number" value={logoSize} onChange={e => setLogoSize(Number(e.target.value))} />

        <button onClick={handleDownload}>İndir</button>
      </div>

      <div className="canvas-container">
        <div
          className="canvas"
          ref={canvasRef}
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            background: bgType === 'color' ? bgColor : bgType === 'gradient' ? bgGradient : 'none',
            backgroundImage: bgType === 'image' ? `url(${bgImage})` : undefined,
            backgroundSize: 'cover',
            filter: bgBlur ? 'blur(2px)' : 'none',
            border: `${borderWidth}px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`,
            padding: `${padding}px`,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
            color: fontColor,
            fontSize: fontSize,
            fontFamily: 'Quicksand',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {text}
          {logo && (
            <img
              src={logo}
              alt="logo"
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: logoSize,
                height: 'auto'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
