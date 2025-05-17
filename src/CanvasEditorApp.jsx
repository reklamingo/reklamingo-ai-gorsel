// CanvasEditorApp.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HexColorPicker } from 'react-colorful';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';

const fonts = ['Quicksand', 'Arial', 'Georgia', 'Impact', 'Courier New', 'Roboto', 'Montserrat', 'Oswald', 'Poppins', 'Lato'];

const CanvasEditorApp = () => {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [gradient, setGradient] = useState('linear-gradient(135deg, #003e92, #3ecf00)');
  const [backgroundType, setBackgroundType] = useState('solid');
  const [frameEnabled, setFrameEnabled] = useState(false);
  const [frameColor, setFrameColor] = useState('#3ecf00');
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

  const addText = () => {
    setElements([...elements, { id: Date.now(), type: 'text', content: 'Yeni Metin', x: 50, y: 50, fontSize: 24, fontFamily: 'Quicksand', bold: false, italic: false, color: '#ffffff' }]);
  };

  const addLogo = () => {
    setElements([...elements, { id: Date.now(), type: 'logo', src: '/default-logo.png', x: 100, y: 100, size: 100 }]);
  };

  const removeElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
    setSelected(null);
  };

  const updateSelectedStyle = (key, value) => {
    setElements(prev => prev.map(el => el.id === selected?.id ? { ...el, [key]: value } : el));
    setSelected(prev => prev ? { ...prev, [key]: value } : null);
  };

  const updateSelectedText = (value) => {
    setElements(prev => prev.map(el => el.id === selected?.id ? { ...el, content: value } : el));
    setSelected(prev => prev ? { ...prev, content: value } : null);
  };

  const downloadImage = () => {
    const canvas = document.getElementById('canvas-area');
    html2canvas(canvas).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tasarim.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handlePosition = (e, data, id) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, x: data.x, y: data.y } : el));
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#f0f4f8] font-[Quicksand]">
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md overflow-y-auto">
        <h2 className="text-xl font-semibold text-[#003e92] mb-4">Araçlar</h2>
        <Button onClick={addText}>Metin Ekle</Button>
        <Button onClick={addLogo} className="mt-2">Logo Ekle</Button>
        <div className="mt-4">
          <p className="font-medium">Arka Plan:</p>
          <select value={backgroundType} onChange={(e) => setBackgroundType(e.target.value)} className="border mt-2 w-full">
            <option value="solid">Düz Renk</option>
            <option value="gradient">Gradyan</option>
          </select>
          {backgroundType === 'solid' ? (
            <HexColorPicker color={bgColor} onChange={setBgColor} className="mt-2" />
          ) : (
            <div className="mt-2">
              <p>Örnek Gradyanlar:</p>
              <select value={gradient} onChange={(e) => setGradient(e.target.value)} className="border mt-1 w-full">
                <option value="linear-gradient(135deg, #003e92, #3ecf00)">Lacivert → Yeşil</option>
                <option value="linear-gradient(135deg, #f43f5e, #fb923c)">Pembe → Turuncu</option>
                <option value="linear-gradient(135deg, #9333ea, #3b82f6)">Mor → Mavi</option>
              </select>
            </div>
          )}
          <div className="mt-2">
            <label>Opaklık:</label>
            <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full" />
            <label>Bulanıklık:</label>
            <input type="range" min="0" max="20" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
        {selected && selected.type === 'text' && (
          <div className="mt-4">
            <p className="font-medium">Metin Ayarları:</p>
            <textarea value={selected.content} onChange={(e) => updateSelectedText(e.target.value)} className="w-full border p-1 mt-1"></textarea>
            <input type="range" min="12" max="72" value={selected.fontSize} onChange={(e) => updateSelectedStyle('fontSize', parseInt(e.target.value))} className="w-full mt-2" />
            <select value={selected.fontFamily} onChange={(e) => updateSelectedStyle('fontFamily', e.target.value)} className="w-full mt-2">
              {fonts.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <input type="color" value={selected.color} onChange={(e) => updateSelectedStyle('color', e.target.value)} className="w-full mt-2" />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => updateSelectedStyle('bold', !selected.bold)}>{selected.bold ? 'Kalın ✓' : 'Kalın'}</Button>
              <Button onClick={() => updateSelectedStyle('italic', !selected.italic)}>{selected.italic ? 'İtalik ✓' : 'İtalik'}</Button>
            </div>
          </div>
        )}
        {selected && selected.type === 'logo' && (
          <div className="mt-4">
            <p className="font-medium">Logo Boyutu:</p>
            <input type="range" min="20" max="300" value={selected.size} onChange={(e) => updateSelectedStyle('size', parseInt(e.target.value))} className="w-full mt-2" />
          </div>
        )}
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={frameEnabled} onChange={(e) => setFrameEnabled(e.target.checked)} className="mr-2" /> Çerçeve ekle
          </label>
          {frameEnabled && (
            <div className="mt-2">
              <p>Çerçeve Rengi:</p>
              <HexColorPicker color={frameColor} onChange={setFrameColor} className="mt-1" />
            </div>
          )}
        </div>
        {selected && (
          <div className="mt-4">
            <p className="font-medium">Seçilen öğe:</p>
            <Button onClick={() => removeElement(selected.id)} className="mt-1">Sil</Button>
          </div>
        )}
        <div className="mt-6 text-xs text-gray-500">
          Bu uygulama ile metin, logo ve arka plan seçeneklerini kolayca düzenleyebilirsiniz. Öğeleri sürükleyin, yerleştirin ve PNG olarak dışa aktarın.
        </div>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center">
        <div id="canvas-area" className="relative w-[1080px] h-[1080px] shadow-lg"
          style={{ background: backgroundType === 'solid' ? bgColor : gradient, border: frameEnabled ? `10px solid ${frameColor}` : 'none', opacity, filter: `blur(${blur}px)` }}>
          {elements.map(el => (
            <Draggable
              key={el.id}
              position={{ x: el.x, y: el.y }}
              onStop={(e, data) => handlePosition(e, data, el.id)}>
              <div
                onClick={() => setSelected(el)}
                className="absolute cursor-move">
                {el.type === 'text' && (
                  <p style={{ fontSize: el.fontSize, fontFamily: el.fontFamily, fontWeight: el.bold ? 'bold' : 'normal', fontStyle: el.italic ? 'italic' : 'normal', color: el.color }}>{el.content}</p>
                )}
                {el.type === 'logo' && (
                  <img src={el.src} alt="logo" style={{ width: `${el.size}px`, height: 'auto' }} />
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={downloadImage} className="bg-[#3ecf00] text-white px-4 py-2 rounded-xl shadow">İndir</Button>
      </div>
    </div>
  );
};

export default CanvasEditorApp;
