import React from 'react';
import TextControls from './TextControls';
import FrameSettings from './FrameSettings';
import LogoUploader from './LogoUploader';

function ControlsPanel({
  setSize,
  bgColor,
  setBgColor,
  bgImage,
  setBgImage,
  setTitle,
  setBody,
  logo,
  setLogo,
  nameLogo,
  setNameLogo,
  frame,
  setFrame,
  handleDownload
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ color: '#003e92' }}>Tasarım Ayarları</h2>

      <div>
        <label>Boyut Seç:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['1:1', '9:16', '3:4', '4:3'].map(ratio => (
            <button key={ratio} onClick={() => setSize(ratio)} style={{ padding: '4px 8px' }}>
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Arka Plan Rengi:</label>
        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
      </div>

      <div>
        <label>Arka Plan Görseli:</label>
        <input type="file" accept="image/*" onChange={e => setBgImage(e.target.files[0])} />
      </div>

      <TextControls setTitle={setTitle} setBody={setBody} />

      <LogoUploader logo={logo} setLogo={setLogo} nameLogo={nameLogo} setNameLogo={setNameLogo} />

      <FrameSettings frame={frame} setFrame={setFrame} />

      <button
        onClick={handleDownload}
        style={{ backgroundColor: '#3ecf00', color: '#fff', padding: '10px', border: 'none', borderRadius: '8px' }}
      >
        Tasarımı İndir
      </button>
    </div>
  );
}

export default ControlsPanel;
