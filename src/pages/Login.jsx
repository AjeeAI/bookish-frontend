import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await api.login(email, password);
      // Store token in browser
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      alert("Invalid login details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-900">Admin Login</h1>
        <input 
          className="w-full border p-3 rounded mb-4" 
          placeholder="Email" 
          value={email} onChange={e => setEmail(e.target.value)} 
        />
        <input 
          className="w-full border p-3 rounded mb-6" 
          type="password" placeholder="Password" 
          value={password} onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-emerald-600 text-white py-3 rounded font-bold hover:bg-emerald-700">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;