import React from 'react';

const gradients = [
  "linear-gradient(45deg, #003e92, #3ecf00)",
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(to bottom, #8360c3, #2ebf91)",
  "linear-gradient(to right, #00c6ff, #0072ff)"
];

function GradientSelector({ setGradient }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {gradients.map((g, i) => (
        <div key={i}
          onClick={() => setGradient(g)}
          style={{
            width: 60,
            height: 30,
            borderRadius: 6,
            cursor: 'pointer',
            border: '2px solid #fff',
            background: g
          }}
        />
      ))}
    </div>
  );
}

export default GradientSelector;
