
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Paintbrush, Type, Image as ImageIcon, Square, Ruler } from 'lucide-react';
import './index.css';

function App() {
  const canvasRef = useRef(null);
  const [tab, setTab] = useState('background');
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgColor, setBgColor] = useState('#ffffff');
  const [text, setText] = useState('Merhaba!');
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [border, setBorder] = useState({ color: '#000000', width: 5, radius: 10 });

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const scaleFactor = Math.min(1, 600 / canvasSize.height);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium w-full justify-start hover:bg-gray-200 ${
        tab === id ? 'bg-white font-bold' : 'text-gray-700'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 bg-gray-50 shadow-md p-4 flex flex-col gap-2">
        <TabButton id="background" icon={Paintbrush} label="Arka Plan" />
        <TabButton id="text" icon={Type} label="Metin" />
        <TabButton id="logo" icon={ImageIcon} label="Logo" />
        <TabButton id="frame" icon={Square} label="Çerçeve" />
        <TabButton id="size" icon={Ruler} label="Tuval" />
        <button onClick={handleDownload} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">İndir</button>
      </aside>

      <main className="flex-1 flex items-center justify-center bg-gray-200">
        <div
          className="canvas-wrapper"
          style={{
            transform: `scale(${scaleFactor})`,
            transformOrigin: 'top left',
            width: canvasSize.width,
            height: canvasSize.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            ref={canvasRef}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              backgroundColor: bgColor,
              border: `${border.width}px solid ${border.color}`,
              borderRadius: `${border.radius}px`,
              padding: 20,
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize,
              color: fontColor,
              fontFamily: 'Quicksand',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {text}
            {logo && (
              <img
                src={logo}
                alt="logo"
                style={{ position: 'absolute', bottom: 10, right: 10, height: 60 }}
              />
            )}
          </div>
        </div>
      </main>

      <aside className="w-64 bg-white shadow-inner p-4 overflow-y-auto">
        {tab === 'background' && (
          <>
            <label className="block text-sm font-medium mb-1">Arka Plan Rengi</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10" />
          </>
        )}
        {tab === 'text' && (
          <>
            <label className="block text-sm font-medium mb-1">Metin</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full mb-2" />
            <label className="block text-sm font-medium mb-1">Yazı Boyutu</label>
            <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full mb-2" />
            <label className="block text-sm font-medium mb-1">Yazı Rengi</label>
            <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} className="w-full h-10" />
          </>
        )}
        {tab === 'logo' && (
          <>
            <label className="block text-sm font-medium mb-1">Logo Yükle</label>
            <input type="file" accept="image/*" onChange={e => setLogo(URL.createObjectURL(e.target.files[0]))} />
          </>
        )}
        {tab === 'frame' && (
          <>
            <label className="block text-sm font-medium mb-1">Çerçeve Rengi</label>
            <input type="color" value={border.color} onChange={e => setBorder({ ...border, color: e.target.value })} className="w-full h-10 mb-2" />
            <label className="block text-sm font-medium mb-1">Kalınlık (px)</label>
            <input type="number" value={border.width} onChange={e => setBorder({ ...border, width: Number(e.target.value) })} className="w-full mb-2" />
            <label className="block text-sm font-medium mb-1">Köşe Yuvarlaklığı</label>
            <input type="number" value={border.radius} onChange={e => setBorder({ ...border, radius: Number(e.target.value) })} className="w-full" />
          </>
        )}
        {tab === 'size' && (
          <>
            <label className="block text-sm font-medium mb-1">Tuval Boyutu</label>
            <select
              value={`${canvasSize.width}x${canvasSize.height}`}
              onChange={e => {
                const [w, h] = e.target.value.split('x').map(Number);
                setCanvasSize({ width: w, height: h });
              }}
              className="w-full"
            >
              <option value="1080x1080">Instagram (1:1)</option>
              <option value="1080x1350">3:4</option>
              <option value="1080x1920">Story (9:16)</option>
            </select>
          </>
        )}
      </aside>
    </div>
  );
}

export default App;
