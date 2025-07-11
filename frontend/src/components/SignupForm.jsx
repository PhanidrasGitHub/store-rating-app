import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    address: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/signup',
        formData
      );
      console.log('Success:', res.data);
      navigate('/login');
    } catch (err) {
      console.log('Signup failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Signup
        </h2>

        <input
          name="username"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store-owner">Store Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded text-sm transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
