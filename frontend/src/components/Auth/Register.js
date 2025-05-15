import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url.com/register', { email, username, password });
      alert('Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın.');
      navigate('/giris');
    } catch (err) {
      alert('Kayıt başarısız. Bu e-posta zaten kullanılıyor olabilir.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Quicksand' }}>
      <h2 style={{ color: '#003e92' }}>Kayıt Ol</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{ backgroundColor: '#3ecf00', color: 'white', padding: '10px' }}>Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
