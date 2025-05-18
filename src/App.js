
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Paintbrush, Type, ImageIcon, Square, Ruler } from 'lucide-react';
import './index.css';

const tabs = [
  { id: 'background', icon: <Paintbrush size={16} />, label: 'Arka Plan' },
  { id: 'text', icon: <Type size={16} />, label: 'Metin' },
  { id: 'logo', icon: <ImageIcon size={16} />, label: 'Logo' },
  { id: 'frame', icon: <Square size={16} />, label: 'Çerçeve' },
  { id: 'size', icon: <Ruler size={16} />, label: 'Tuval' }
];

function App() {
  const canvasRef = useRef(null);
  const [tab, setTab] = useState('background');
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgColor, setBgColor] = useState('#ffffff');
  const [text, setText] = useState('Hoş Geldiniz!');
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [border, setBorder] = useState({ color: '#000000', width: 4, radius: 12 });

  const scale = Math.min(1, 600 / canvasSize.height);

  const handleDownload = () => {
    html2canvas(canvasRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-green-100 text-sm">
      <aside className="w-60 bg-white shadow-md p-4 border-r flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                'flex items-center gap-2 px-3 py-2 rounded-md transition font-medium ' +
                (tab === t.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100 text-gray-600')
              }
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={handleDownload} className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow">İndir</button>
      </aside>

      <main className="flex-1 flex items-center justify-center overflow-hidden bg-gray-50">
        <div
          className="shadow-lg"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
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
            position: 'relative'
          }}
          ref={canvasRef}
        >
          {text}
          {logo && (
            <img src={logo} alt="logo" style={{ position: 'absolute', bottom: 10, right: 10, height: 60 }} />
          )}
        </div>
      </main>

      <aside className="w-64 bg-white shadow-inner p-5 border-l">
        {tab === 'background' && (
          <>
            <label className="block mb-1 font-semibold">Arka Plan Rengi</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10" />
          </>
        )}
        {tab === 'text' && (
          <>
            <label className="block mb-1 font-semibold">Metin</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full mb-2 border rounded px-2 py-1" />
            <label className="block mb-1 font-semibold">Boyut</label>
            <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full mb-2 border rounded px-2 py-1" />
            <label className="block mb-1 font-semibold">Renk</label>
            <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} className="w-full h-10" />
          </>
        )}
        {tab === 'logo' && (
          <>
            <label className="block mb-1 font-semibold">Logo</label>
            <input type="file" accept="image/*" onChange={e => setLogo(URL.createObjectURL(e.target.files[0]))} />
          </>
        )}
        {tab === 'frame' && (
          <>
            <label className="block mb-1 font-semibold">Çerçeve Rengi</label>
            <input type="color" value={border.color} onChange={e => setBorder({ ...border, color: e.target.value })} className="w-full h-10 mb-2" />
            <label className="block mb-1 font-semibold">Kalınlık</label>
            <input type="number" value={border.width} onChange={e => setBorder({ ...border, width: Number(e.target.value) })} className="w-full mb-2 border rounded px-2 py-1" />
            <label className="block mb-1 font-semibold">Köşe Yuvarlaklığı</label>
            <input type="number" value={border.radius} onChange={e => setBorder({ ...border, radius: Number(e.target.value) })} className="w-full border rounded px-2 py-1" />
          </>
        )}
        {tab === 'size' && (
          <>
            <label className="block mb-1 font-semibold">Tuval Boyutu</label>
            <select
              value={`${canvasSize.width}x${canvasSize.height}`}
              onChange={e => {
                const [w, h] = e.target.value.split('x').map(Number);
                setCanvasSize({ width: w, height: h });
              }}
              className="w-full border rounded px-2 py-1"
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
