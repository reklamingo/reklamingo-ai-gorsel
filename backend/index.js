const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { verifyToken } = require('./auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

let users = [];
let verifiedEmails = [];

// E-posta doğrulayıcı
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✔ Kayıt ol
app.post('/register', (req, res) => {
  const { email, username, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Bu e-posta zaten kayıtlı.' });
  }

  users.push({ email, username, password, verified: false });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const link = `https://your-frontend-url.com/verify?token=${token}`;

  transporter.sendMail({
    from: `"Tasarım Uygulaması" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'E-posta Doğrulama',
    html: `<p>Hesabınızı doğrulamak için <a href="${link}">buraya tıklayın</a>.</p>`,
  });

  res.json({ message: 'Kayıt başarılı, e-posta gönderildi.' });
});

// ✔ Doğrulama linki
app.get('/verify', (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    verifiedEmails.push(decoded.email);
    return res.redirect('https://your-frontend-url.com/giris?onay=ok');
  } catch (err) {
    return res.status(400).send('Doğrulama linki geçersiz.');
  }
});

// ✔ Giriş yap
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: 'Bilgiler yanlış.' });

  if (!verifiedEmails.includes(email)) {
    return res.status(401).json({ error: 'Lütfen e-postanızı doğrulayın.' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// ✔ Kod kontrolü
app.post('/check-code', (req, res) => {
  const { code } = req.body;
  const codes = JSON.parse(fs.readFileSync('./codes.json', 'utf8'));

  if (codes.includes(code)) {
    // Kullanıldı olarak işaretle
    const updated = codes.filter(c => c !== code);
    fs.writeFileSync('./codes.json', JSON.stringify(updated, null, 2));
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: 'Kod geçersiz veya kullanılmış.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu ${PORT} portunda çalışıyor`);
});
