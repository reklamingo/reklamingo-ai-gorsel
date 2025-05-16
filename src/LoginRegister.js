import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function LoginRegister({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user.emailVerified) {
          onLogin(userCredential.user);
        } else {
          alert("Lütfen e-posta adresinizi doğrulayın.");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#003e92] text-white font-quicksand">
      <h1 className="text-2xl mb-4">{isRegister ? "Kayıt Ol" : "Giriş Yap"}</h1>
      <input
        type="email"
        placeholder="E-posta"
        className="p-2 rounded text-black mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        className="p-2 rounded text-black mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="bg-[#3ecf00] px-4 py-2 rounded">
        {isRegister ? "Kayıt Ol" : "Giriş Yap"}
      </button>
      <p className="mt-4 text-sm underline cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Zaten hesabınız var mı?" : "Hesabınız yok mu? Kayıt olun"}
      </p>
    </div>
  );
}
