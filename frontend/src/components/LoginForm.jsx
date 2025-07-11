import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosInstance';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputdata = { username, password };

    try {
      const res = await axios.post('/login', inputdata);
      const token = res.data.token;
      login(token);
      setUsername('');
      setPassword('');
      console.log('Login successful:', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-sm transition duration-200"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
