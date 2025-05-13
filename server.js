const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/verify', (req, res) => {
  const userCode = req.body.code;
  const codesData = JSON.parse(fs.readFileSync('./codes.json', 'utf-8'));

  if (codesData.codes.includes(userCode)) {
    return res.status(200).json({ valid: true, message: 'Kod geçerli' });
  } else {
    return res.status(401).json({ valid: false, message: 'Kod geçersiz' });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
