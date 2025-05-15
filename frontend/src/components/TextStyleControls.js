import React from 'react';

function TextStyleControls({ titleStyle, setTitleStyle, bodyStyle, setBodyStyle }) {
  const fonts = ['Quicksand', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Roboto', 'Lato', 'Open Sans'];

  const applyStyle = (type, prop, value) => {
    const styleSetter = type === 'title' ? setTitleStyle : setBodyStyle;
    const current = type === 'title' ? titleStyle : bodyStyle;
    styleSetter({ ...current, [prop]: value });
  };

  return (
    <div className="control-group">
      <label>Başlık Stili:</label>
      <select onChange={e => applyStyle('title', 'fontFamily', e.target.value)}>
        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <input type="number" placeholder="Boyut px" onChange={e => applyStyle('title', 'fontSize', `${e.target.value}px`)} />
      <button onClick={() => applyStyle('title', 'fontWeight', 'bold')}>B</button>
      <button onClick={() => applyStyle('title', 'fontStyle', 'italic')}>I</button>

      <label>Gövde Stili:</label>
      <select onChange={e => applyStyle('body', 'fontFamily', e.target.value)}>
        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <input type="number" placeholder="Boyut px" onChange={e => applyStyle('body', 'fontSize', `${e.target.value}px`)} />
      <button onClick={() => applyStyle('body', 'fontWeight', 'bold')}>B</button>
      <button onClick={() => applyStyle('body', 'fontStyle', 'italic')}>I</button>
    </div>
  );
}

export default TextStyleControls;
