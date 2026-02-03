import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Call Firebase Login
      const { token } = await api.login(email, password);
      
      // 2. Save the token locally so the app knows you are logged in
      localStorage.setItem('token', token);
      
      // 3. Redirect to Admin Dashboard
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-600 mt-2">Sign in to manage your blog</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bookish.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? 'Verifying...' : 'Sign In Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import { api } from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await api.login(email, password);
//       // Store token in browser
//       localStorage.setItem("token", data.token);
//       navigate("/admin");
//     } catch (err) {
//       alert("Invalid login details");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center text-emerald-900">Admin Login</h1>
//         <input 
//           className="w-full border p-3 rounded mb-4" 
//           placeholder="Email" 
//           value={email} onChange={e => setEmail(e.target.value)} 
//         />
//         <input 
//           className="w-full border p-3 rounded mb-6" 
//           type="password" placeholder="Password" 
//           value={password} onChange={e => setPassword(e.target.value)} 
//         />
//         <button className="w-full bg-emerald-600 text-white py-3 rounded font-bold hover:bg-emerald-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Login;