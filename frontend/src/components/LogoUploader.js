import React from 'react';

function LogoUploader({ logo, setLogo, nameLogo, setNameLogo }) {
  return (
    <div>
      <h4>Logo / Marka Adı</h4>
      <label>Logo Yükle:</label>
      <input type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} />
      <p style={{ margin: '8px 0' }}>veya</p>
      <label>Marka Adı Yaz:</label>
      <input
        type="text"
        value={nameLogo}
        placeholder="Örn: Reklamingo"
        onChange={e => setNameLogo(e.target.value)}
        style={{ width: '100%', padding: '6px' }}
      />
    </div>
  );
}

export default LogoUploader;
