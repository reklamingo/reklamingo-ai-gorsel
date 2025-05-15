import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ControlsPanel from './ControlsPanel';
import './CanvasEditor.css';

function CanvasEditor() {
  const [size, setSize] = useState({ width: 1080, height: 1080 }); // Varsayılan kare
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgImage, setBgImage] = useState(null);
  const [title, setTitle] = useState('Başlık Metni');
  const [body, setBody] = useState('Açıklama metni buraya...');
  const [logo, setLogo] = useState(null);
  const [nameLogo, setNameLogo] = useState('');
  const [frame, setFrame] = useState({ color: '#003e92', thickness: 10, padding: 20 });

  const previewRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(previewRef.current);
    const link = document.createElement('a');
    link.download = 'tasarim.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleSizeChange = (ratio) => {
    switch (ratio) {
      case '1:1': setSize({ width: 1080, height: 1080 }); break;
      case '9:16': setSize({ width: 1080, height: 1920 }); break;
      case '3:4': setSize({ width: 1080, height: 1440 }); break;
      case '4:3': setSize({ width: 1080, height: 810 }); break;
      default: break;
    }
  };

  return (
    <div className="editor-container">
      <div className="left-preview" style={{ width: size.width / 4, height: size.height / 4 }}>
        <div
          className="preview-canvas"
          ref={previewRef}
          style={{
            width: size.width,
            height: size.height,
            backgroundColor: bgColor,
            backgroundImage: bgImage ? `url(${URL.createObjectURL(bgImage)})` : 'none',
            backgroundSize: 'cover',
            border: `${frame.thickness}px solid ${frame.color}`,
            padding: frame.padding,
            boxSizing: 'border-box',
            position: 'relative'
          }}
        >
          <h1 className="editable-text" contentEditable>{title}</h1>
          <p className="editable-text" contentEditable>{body}</p>
          {logo && <img src={URL.createObjectURL(logo)} alt="Logo" className="draggable-logo" />}
          {!logo && nameLogo && (
            <div className="editable-text name-logo" contentEditable>{nameLogo}</div>
          )}
        </div>
      </div>

      <div className="right-controls">
        <ControlsPanel
          size={size}
          setSize={handleSizeChange}
          bgColor={bgColor}
          setBgColor={setBgColor}
          bgImage={bgImage}
          setBgImage={setBgImage}
          setTitle={setTitle}
          setBody={setBody}
          logo={logo}
          setLogo={setLogo}
          nameLogo={nameLogo}
          setNameLogo={setNameLogo}
          frame={frame}
          setFrame={setFrame}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  );
}

export default CanvasEditor;
