import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-backend-url.com/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Quicksand' }}>
      <h2 style={{ color: '#003e92' }}>Giriş Yap</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{ backgroundColor: '#003e92', color: 'white', padding: '10px' }}>Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;
