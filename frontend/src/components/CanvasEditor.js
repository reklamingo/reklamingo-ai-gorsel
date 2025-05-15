import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import GradientSelector from './GradientSelector';
import TextStyleControls from './TextStyleControls';
import './CanvasEditor.css';

function CanvasEditor() {
  const [size, setSize] = useState({ width: 1080, height: 1080 });
  const [backgroundType, setBackgroundType] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradient, setBgGradient] = useState('');
  const [bgImage, setBgImage] = useState(null);

  const [title, setTitle] = useState('Merhaba');
  const [body, setBody] = useState('Gövde metni');
  const [titleStyle, setTitleStyle] = useState({});
  const [bodyStyle, setBodyStyle] = useState({});
  const [frame, setFrame] = useState({ color: '#003e92', thickness: 5, padding: 20 });

  const previewRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(previewRef.current);
    const link = document.createElement('a');
    link.download = 'tasarim.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleSizeChange = (ratio) => {
    const sizes = {
      '1:1': { width: 1080, height: 1080 },
      '9:16': { width: 1080, height: 1920 },
      '3:4': { width: 1080, height: 1440 },
      '4:3': { width: 1080, height: 810 },
    };
    setSize(sizes[ratio]);
  };

  return (
    <div
  ref={previewRef}
  className="preview-box"
  style={{
    width: size.width,
    height: size.height,
    background:
      backgroundType === 'color'
        ? bgColor
        : backgroundType === 'gradient'
        ? bgGradient
        : bgImage
        ? `url(${URL.createObjectURL(bgImage)})`
        : '#fff',
    backgroundSize: 'cover',
    border: `${frame.thickness}px solid ${frame.color}`,
    padding: frame.padding,
    boxSizing: 'border-box',
    fontFamily: 'Quicksand',
  }}
>
          <h1 style={{ ...titleStyle }} contentEditable>{title}</h1>
          <p style={{ ...bodyStyle }} contentEditable>{body}</p>
        </div>
      </div>

      <div className="control-area">
        <h2>Tasarım Ayarları</h2>

        {/* BOYUT SEÇİMİ */}
        <div className="control-group">
          <label>Boyut Seç:</label>
          {['1:1', '9:16', '3:4', '4:3'].map(r => (
            <button key={r} onClick={() => handleSizeChange(r)}>{r}</button>
          ))}
        </div>

        {/* ARKA PLAN */}
        <div className="control-group">
          <label>Arka Plan Türü:</label>
          <select onChange={(e) => setBackgroundType(e.target.value)} value={backgroundType}>
            <option value="color">Düz Renk</option>
            <option value="gradient">Gradyan</option>
            <option value="image">Görsel</option>
          </select>

          {backgroundType === 'color' && (
            <>
              <label>Renk Seç:</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
            </>
          )}

          {backgroundType === 'gradient' && (
            <GradientSelector setGradient={setBgGradient} />
          )}

          {backgroundType === 'image' && (
            <>
              <label>Görsel Yükle:</label>
              <input type="file" accept="image/*" onChange={e => setBgImage(e.target.files[0])} />
            </>
          )}
        </div>

        {/* METİN STİLİ */}
        <TextStyleControls
          titleStyle={titleStyle}
          setTitleStyle={setTitleStyle}
          bodyStyle={bodyStyle}
          setBodyStyle={setBodyStyle}
        />

        {/* ÇERÇEVE */}
        <div className="control-group">
          <label>Çerçeve:</label>
          <input type="color" value={frame.color} onChange={e => setFrame({ ...frame, color: e.target.value })} />
          <label>Kalınlık:</label>
          <input type="range" min={0} max={50} value={frame.thickness} onChange={e => setFrame({ ...frame, thickness: parseInt(e.target.value) })} />
          <label>Kenardan Mesafe:</label>
          <input type="range" min={0} max={100} value={frame.padding} onChange={e => setFrame({ ...frame, padding: parseInt(e.target.value) })} />
        </div>

        <button className="download-button" onClick={handleDownload}>Tasarımı İndir</button>
      </div>
    </div>
  );
}

export default CanvasEditor;
