// CanvasEditorV2.js - GÜNCELLENDİ (Kredi ve kod kontrolü eklendi)
import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import TabPanel from './TabPanel';
import FontControl from './FontControl';
import GradientPalette from './GradientPalette';
import './CanvasEditorV2.css';

function CanvasEditorV2() {
  const [size, setSize] = useState({ width: 1080, height: 1080 });
  const [bgType, setBgType] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradient, setBgGradient] = useState('');
  const [bgImage, setBgImage] = useState(null);

  const [title, setTitle] = useState('Selam');
  const [body, setBody] = useState('Gövde metni');
  const [titleStyle, setTitleStyle] = useState({});
  const [bodyStyle, setBodyStyle] = useState({});
  const [frame, setFrame] = useState({ color: '#003e92', thickness: 5, padding: 20 });

  const [logoFile, setLogoFile] = useState(null);
  const [logoText, setLogoText] = useState('');
  const previewRef = useRef();

  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  const [downloadCount, setDownloadCount] = useState(0);
  const [hasValidCode, setHasValidCode] = useState(false);
  const [codeInput, setCodeInput] = useState('');

  const handleCodeSubmit = () => {
    const validCodes = ['ABC123', 'XYZ789', 'KLM456'];
    if (validCodes.includes(codeInput.trim().toUpperCase())) {
      setHasValidCode(true);
      alert('Kod onaylandı!');
    } else {
      alert('Geçersiz kod.');
    }
  };

  const handleDownload = async () => {
    if (downloadCount >= 1 && !hasValidCode) {
      alert('İlk indiriminiz ücretsizdir. Devam etmek için geçerli bir kod giriniz.');
      return;
    }

    const canvas = await html2canvas(previewRef.current);
    const link = document.createElement('a');
    link.download = 'tasarim.png';
    link.href = canvas.toDataURL();
    link.click();

    setDownloadCount(downloadCount + 1);
  };

  const handleSizeChange = (ratioOrObj) => {
    if (typeof ratioOrObj === 'string') {
      const sizes = {
        '1:1': { width: 1080, height: 1080 },
        '9:16': { width: 1080, height: 1920 },
        '3:4': { width: 1080, height: 1440 },
        '4:3': { width: 1080, height: 810 },
      };
      setSize(sizes[ratioOrObj]);
    } else {
      setSize(ratioOrObj);
    }
  };

  const handleCustomSize = () => {
    const w = parseInt(customWidth);
    const h = parseInt(customHeight);
    if (w > 0 && h > 0) setSize({ width: w, height: h });
  };

  return (
    <div className="editorv2-container">
      <div className="previewv2-area" style={{ width: size.width / 3, height: size.height / 3 }}>
        <div
          ref={previewRef}
          className="previewv2-box"
          style={{
            width: size.width,
            height: size.height,
            background:
              bgType === 'color'
                ? bgColor
                : bgType === 'gradient'
                ? bgGradient
                : bgImage
                ? `url(${URL.createObjectURL(bgImage)})`
                : '#fff',
            backgroundSize: 'cover',
            border: `${frame.thickness}px solid ${frame.color}`,
            padding: frame.padding,
            boxSizing: 'border-box',
            fontFamily: 'Quicksand',
            position: 'relative',
          }}
        >
          <h1
            className="draggable"
            style={{ position: 'absolute', cursor: 'move', ...titleStyle }}
            contentEditable
          >
            {title}
          </h1>
          <p
            className="draggable"
            style={{ position: 'absolute', cursor: 'move', ...bodyStyle }}
            contentEditable
          >
            {body}
          </p>
          {logoFile && (
            <img
              src={URL.createObjectURL(logoFile)}
              alt="Logo"
              className="draggable"
              style={{ position: 'absolute', cursor: 'move', maxWidth: '100px' }}
            />
          )}
          {!logoFile && logoText && (
            <div
              className="draggable"
              style={{ position: 'absolute', cursor: 'move', fontWeight: 'bold' }}
              contentEditable
            >
              {logoText}
            </div>
          )}
        </div>
      </div>

      <div className="controlv2-panel">
        <TabPanel
          bgType={bgType} setBgType={setBgType}
          bgColor={bgColor} setBgColor={setBgColor}
          bgGradient={bgGradient} setBgGradient={setBgGradient}
          bgImage={bgImage} setBgImage={setBgImage}
          size={size} setSize={handleSizeChange}
          titleStyle={titleStyle} setTitleStyle={setTitleStyle}
          bodyStyle={bodyStyle} setBodyStyle={setBodyStyle}
          frame={frame} setFrame={setFrame}
          logoFile={logoFile} setLogoFile={setLogoFile}
          logoText={logoText} setLogoText={setLogoText}
        />

        <div className="custom-size-group">
          <label>Özel Genişlik (px):</label>
          <input type="number" value={customWidth} onChange={e => setCustomWidth(e.target.value)} />
          <label>Özel Yükseklik (px):</label>
          <input type="number" value={customHeight} onChange={e => setCustomHeight(e.target.value)} />
          <button onClick={handleCustomSize}>Boyutu Uygula</button>
        </div>

        <div className="code-entry">
          <label>Promo Kod:</label>
          <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value)} />
          <button onClick={handleCodeSubmit}>Kodu Onayla</button>
        </div>

        <button className="downloadv2-button" onClick={handleDownload}>Tasarımı İndir</button>
      </div>
    </div>
  );
}

export default CanvasEditorV2;
