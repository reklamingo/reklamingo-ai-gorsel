// CanvasEditorPro: Şık Arayüz + Metin ve Logo Ayarları

import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import './App.css';

const App = () => {
  // [state tanımları aynı kalacak]
  // [giriş ve kod kontrol kısmı aynı kalacak]

  if (!accessGranted) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#003e92] text-white font-quicksand">
        <h1 className="text-2xl mb-4">Tasarım Uygulamasına Giriş</h1>
        <p className="mb-2">İlk kullanım ücretsiz. Sonraki tasarımlar için kod giriniz:</p>
        <input type="text" placeholder="6 haneli kod" className="text-black p-2 rounded" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
        <button onClick={checkCode} className="bg-[#3ecf00] text-white px-4 py-2 mt-4 rounded">Devam Et</button>
      </div>
    );
  }

  return (
    <div className="editor-container font-quicksand bg-[#f4f4f4] min-h-screen p-4">
      <div className="controls w-full grid md:grid-cols-4 gap-3 mb-6">
        <div className="flex gap-2">
          <label className="font-bold">Boyut</label>
          <select onChange={(e) => {
            const ratio = e.target.value;
            if (ratio === '1:1') setCanvasSize({ width: 1080, height: 1080 });
            if (ratio === '3:4') setCanvasSize({ width: 1080, height: 1440 });
            if (ratio === '4:3') setCanvasSize({ width: 1440, height: 1080 });
            if (ratio === '9:16') setCanvasSize({ width: 1080, height: 1920 });
          }} className="border px-2 rounded">
            <option value="1:1">Kare (1:1)</option>
            <option value="3:4">3:4</option>
            <option value="4:3">4:3</option>
            <option value="9:16">Hikaye (9:16)</option>
          </select>
        </div>

        <div className="flex gap-2">
          <label className="font-bold">Arka Plan</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          <input type="file" onChange={handleImageUpload} />
          <button onClick={() => setBgType('color')}>Renk</button>
          <button onClick={() => setBgType('gradient')}>Gradyan</button>
          <button onClick={() => setBgType('image')}>Görsel</button>
        </div>

        <div className="flex flex-col gap-2">
          <input type="text" placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} className="border px-2 py-1 rounded" />
          <input type="range" min="20" max="100" value={titleStyle.fontSize} onChange={(e) => setTitleStyle({ ...titleStyle, fontSize: parseInt(e.target.value) })} />
          <input type="color" value={titleStyle.color} onChange={(e) => setTitleStyle({ ...titleStyle, color: e.target.value })} />
          <div className="flex gap-1">
            <button onClick={() => setTitleStyle({ ...titleStyle, bold: !titleStyle.bold })} className="px-2 border">B</button>
            <button onClick={() => setTitleStyle({ ...titleStyle, italic: !titleStyle.italic })} className="px-2 border italic">I</button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <input type="text" placeholder="Gövde" value={body} onChange={(e) => setBody(e.target.value)} className="border px-2 py-1 rounded" />
          <input type="range" min="16" max="80" value={bodyStyle.fontSize} onChange={(e) => setBodyStyle({ ...bodyStyle, fontSize: parseInt(e.target.value) })} />
          <input type="color" value={bodyStyle.color} onChange={(e) => setBodyStyle({ ...bodyStyle, color: e.target.value })} />
          <div className="flex gap-1">
            <button onClick={() => setBodyStyle({ ...bodyStyle, bold: !bodyStyle.bold })} className="px-2 border">B</button>
            <button onClick={() => setBodyStyle({ ...bodyStyle, italic: !bodyStyle.italic })} className="px-2 border italic">I</button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <input type="file" onChange={handleLogoUpload} />
          <input type="range" min="20" max="300" value={logoSize} onChange={(e) => setLogoSize(parseInt(e.target.value))} />
        </div>

        <div className="flex flex-col gap-2">
          <input type="text" placeholder="İsim Logosu" value={nameLogo} onChange={(e) => setNameLogo(e.target.value)} className="border px-2 py-1 rounded" />
          <input type="range" min="12" max="80" value={nameLogoStyle.fontSize} onChange={(e) => setNameLogoStyle({ ...nameLogoStyle, fontSize: parseInt(e.target.value) })} />
          <input type="color" value={nameLogoStyle.color} onChange={(e) => setNameLogoStyle({ ...nameLogoStyle, color: e.target.value })} />
          <div className="flex gap-1">
            <button onClick={() => setNameLogoStyle({ ...nameLogoStyle, bold: !nameLogoStyle.bold })} className="px-2 border">B</button>
            <button onClick={() => setNameLogoStyle({ ...nameLogoStyle, italic: !nameLogoStyle.italic })} className="px-2 border italic">I</button>
          </div>
        </div>

        <button onClick={downloadImage} className="bg-[#3ecf00] text-white px-4 py-2 rounded shadow">Tasarımı İndir</button>
      </div>

      <div
        ref={canvasRef}
        className="canvas-area mx-auto relative shadow-xl bg-white"
        style={{ ...getBackgroundStyle(), width: canvasSize.width, height: canvasSize.height }}
      >
        {/* [draggable title, body, logo, nameLogo kodları aynı kalacak] */}
      </div>
    </div>
  );
};

export default App;
