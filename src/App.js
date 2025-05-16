// CanvasEditorPro: Sosyal Medya Tasarım Aracı (Nihai Sürüm + Giriş Sistemi ve Kod Kontrolü)

import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [codeUsed, setCodeUsed] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const usedCodes = JSON.parse(localStorage.getItem('usedCodes') || '[]');
  const validCodes = [
    "X7JQ9K", "R4T2LM", "M9G2HT", "B1V8QN", "K5Y6CW", "Z3L4EX", "T2N1PM", "U6D5FA", "C7W3BR", "N8K2LS",
    "H3J7DX", "F1T6VE", "G9Q2MP", "A3E5ZU", "Y2B4CN", "D8F1RJ", "L5V7OA", "W3Z6MK", "P9X1QE", "E7U3YL"
  ];

  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgType, setBgType] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradient, setBgGradient] = useState('linear-gradient(to right, #3ecf00, #003e92)');
  const [bgImage, setBgImage] = useState(null);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleStyle, setTitleStyle] = useState({ fontSize: 40, bold: false, italic: false, align: 'center', color: '#000000' });
  const [bodyStyle, setBodyStyle] = useState({ fontSize: 24, bold: false, italic: false, align: 'center', color: '#000000' });

  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(100);

  const [nameLogo, setNameLogo] = useState('');
  const [nameLogoStyle, setNameLogoStyle] = useState({ fontSize: 20, bold: false, italic: false, align: 'center', color: '#000000' });

  const [frame, setFrame] = useState({ active: false, color: '#003e92', width: 10, margin: 20 });

  const canvasRef = useRef(null);

  const downloadImage = () => {
    if (!canvasRef.current) return;
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      localStorage.setItem('used', 'true');
    });
  };

  const checkCode = () => {
    if (localStorage.getItem('used') === 'true') {
      if (validCodes.includes(inputCode) && !usedCodes.includes(inputCode)) {
        usedCodes.push(inputCode);
        localStorage.setItem('usedCodes', JSON.stringify(usedCodes));
        setAccessGranted(true);
      } else {
        alert("Geçersiz ya da kullanılmış kod.");
      }
    } else {
      setAccessGranted(true);
    }
  };

  const getBackgroundStyle = () => {
    if (bgType === 'color') return { background: bgColor };
    if (bgType === 'gradient') return { background: bgGradient };
    if (bgType === 'image' && bgImage) return { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' };
    return { background: '#ffffff' };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!accessGranted) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#003e92] text-white font-quicksand">
        <h1 className="text-2xl mb-4">Tasarım Uygulamasına Giriş</h1>
        <p className="mb-2">İlk kullanım ücretsiz. Sonraki tasarımlar için kod giriniz:</p>
        <input
          type="text"
          placeholder="6 haneli kod"
          className="text-black p-2 rounded"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button onClick={checkCode} className="bg-[#3ecf00] text-white px-4 py-2 mt-4 rounded">Devam Et</button>
      </div>
    );
  }

  return (
    <div className="editor-container font-quicksand bg-light min-h-screen p-4">
      <div className="controls w-full flex flex-wrap gap-2 mb-4">
        <select onChange={(e) => {
          const ratio = e.target.value;
          if (ratio === '1:1') setCanvasSize({ width: 1080, height: 1080 });
          if (ratio === '3:4') setCanvasSize({ width: 1080, height: 1440 });
          if (ratio === '4:3') setCanvasSize({ width: 1440, height: 1080 });
          if (ratio === '9:16') setCanvasSize({ width: 1080, height: 1920 });
        }}>
          <option value="1:1">Kare (1:1)</option>
          <option value="3:4">3:4</option>
          <option value="4:3">4:3</option>
          <option value="9:16">Hikaye (9:16)</option>
        </select>

        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        <input type="file" onChange={handleImageUpload} />
        <button onClick={() => setBgType('color')}>Renk</button>
        <button onClick={() => setBgType('gradient')}>Gradyan</button>
        <button onClick={() => setBgType('image')}>Görsel</button>

        <input type="text" placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Gövde" value={body} onChange={(e) => setBody(e.target.value)} />

        <input type="file" onChange={handleLogoUpload} />
        <input type="text" placeholder="İsim Logosu" value={nameLogo} onChange={(e) => setNameLogo(e.target.value)} />
        <button onClick={downloadImage}>Tasarımı İndir</button>
      </div>

      <div
        ref={canvasRef}
        className="canvas-area mx-auto relative shadow-xl"
        style={{ ...getBackgroundStyle(), width: canvasSize.width, height: canvasSize.height }}
      >
        {frame.active && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              border: `${frame.width}px solid ${frame.color}`,
              top: frame.margin,
              left: frame.margin,
              right: frame.margin,
              bottom: frame.margin,
              position: 'absolute'
            }}
          ></div>
        )}

        {title && (
          <Draggable><div style={{ position: 'absolute', top: 50, left: 50, fontSize: titleStyle.fontSize, fontWeight: titleStyle.bold ? 'bold' : 'normal', fontStyle: titleStyle.italic ? 'italic' : 'normal', color: titleStyle.color, textAlign: titleStyle.align }}>{title}</div></Draggable>
        )}

        {body && (
          <Draggable><div style={{ position: 'absolute', bottom: 50, left: 50, fontSize: bodyStyle.fontSize, fontWeight: bodyStyle.bold ? 'bold' : 'normal', fontStyle: bodyStyle.italic ? 'italic' : 'normal', color: bodyStyle.color, textAlign: bodyStyle.align }}>{body}</div></Draggable>
        )}

        {logo && (
          <Draggable><img src={logo} alt="logo" style={{ position: 'absolute', top: 20, right: 20, width: logoSize }} /></Draggable>
        )}

        {nameLogo && (
          <Draggable><div style={{ position: 'absolute', top: 20, right: 20, fontSize: nameLogoStyle.fontSize, fontWeight: nameLogoStyle.bold ? 'bold' : 'normal', fontStyle: nameLogoStyle.italic ? 'italic' : 'normal', color: nameLogoStyle.color, textAlign: nameLogoStyle.align }}>{nameLogo}</div></Draggable>
        )}
      </div>
    </div>
  );
};

export default App;
