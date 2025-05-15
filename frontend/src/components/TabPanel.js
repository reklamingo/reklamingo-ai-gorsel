import React, { useState } from 'react';
import FontControl from './FontControl';
import GradientPalette from './GradientPalette';

function TabPanel({
  bgType, setBgType,
  bgColor, setBgColor,
  bgGradient, setBgGradient,
  bgImage, setBgImage,
  size, setSize,
  titleStyle, setTitleStyle,
  bodyStyle, setBodyStyle,
  frame, setFrame,
  logoFile, setLogoFile,
  logoText, setLogoText
}) {
  const [activeTab, setActiveTab] = useState('background');

  return (
    <div className="tab-panel">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('background')}>🎨 Arka Plan</button>
        <button onClick={() => setActiveTab('text')}>🖋 Metin</button>
        <button onClick={() => setActiveTab('frame')}>📏 Çerçeve</button>
        <button onClick={() => setActiveTab('logo')}>🏷 Logo</button>
      </div>

      {activeTab === 'background' && (
        <div className="tab-content">
          <label>Arka Plan Türü:</label>
          <select value={bgType} onChange={e => setBgType(e.target.value)}>
            <option value="color">Düz Renk</option>
            <option value="gradient">Gradyan</option>
            <option value="image">Görsel</option>
          </select>

          {bgType === 'color' && (
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          )}

          {bgType === 'gradient' && (
            <GradientPalette setGradient={setBgGradient} />
          )}

          {bgType === 'image' && (
            <input type="file" accept="image/*" onChange={e => setBgImage(e.target.files[0])} />
          )}
        </div>
      )}

      {activeTab === 'text' && (
        <div className="tab-content">
          <FontControl label="Başlık Stili" style={titleStyle} setStyle={setTitleStyle} />
          <FontControl label="Gövde Stili" style={bodyStyle} setStyle={setBodyStyle} />
        </div>
      )}

      {activeTab === 'frame' && (
        <div className="tab-content">
          <label>Çerçeve Rengi:</label>
          <input type="color" value={frame.color} onChange={e => setFrame({ ...frame, color: e.target.value })} />
          <label>Kalınlık:</label>
          <input type="range" min={0} max={50} value={frame.thickness} onChange={e => setFrame({ ...frame, thickness: parseInt(e.target.value) })} />
          <label>Kenardan Mesafe:</label>
          <input type="range" min={0} max={100} value={frame.padding} onChange={e => setFrame({ ...frame, padding: parseInt(e.target.value) })} />
        </div>
      )}

      {activeTab === 'logo' && (
        <div className="tab-content">
          <label>Logo Yükle:</label>
          <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} />
          <label>veya Marka Adı:</label>
          <input type="text" value={logoText} onChange={e => setLogoText(e.target.value)} />
        </div>
      )}
    </div>
  );
}

export default TabPanel;
