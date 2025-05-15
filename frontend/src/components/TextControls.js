import React from 'react';

function TextControls({ setTitle, setBody }) {
  return (
    <div>
      <label>Başlık:</label>
      <input
        type="text"
        placeholder="Başlık metni"
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '6px', marginBottom: '6px' }}
      />
      <label>Gövde:</label>
      <textarea
        placeholder="Gövde metni"
        onChange={e => setBody(e.target.value)}
        style={{ width: '100%', padding: '6px' }}
        rows={3}
      />
    </div>
  );
}

export default TextControls;
