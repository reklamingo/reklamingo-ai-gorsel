import React from 'react';

function FrameSettings({ frame, setFrame }) {
  return (
    <div>
      <h4>Çerçeve Ayarları</h4>
      <label>Renk:</label>
      <input type="color" value={frame.color} onChange={e => setFrame({ ...frame, color: e.target.value })} />
      <label>Kalınlık (px):</label>
      <input
        type="range"
        min={0}
        max={100}
        value={frame.thickness}
        onChange={e => setFrame({ ...frame, thickness: parseInt(e.target.value) })}
      />
      <label>Kenardan Mesafe (px):</label>
      <input
        type="range"
        min={0}
        max={100}
        value={frame.padding}
        onChange={e => setFrame({ ...frame, padding: parseInt(e.target.value) })}
      />
    </div>
  );
}

export default FrameSettings;
