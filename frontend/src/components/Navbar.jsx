import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // optional icon package

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">StoreRater</h1>

        <button
          onClick={toggleMenu}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden sm:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/stores" className="hover:text-blue-600">Stores</Link>
              <Link to="/rate" className="hover:text-blue-600">Rate</Link>
              <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/signup" className="hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden mt-4 space-y-3 text-center text-sm font-medium">
          <Link to="/" onClick={closeMenu} className="block hover:text-blue-600">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="block hover:text-blue-600">Dashboard</Link>
              <Link to="/stores" onClick={closeMenu} className="block hover:text-blue-600">Stores</Link>
              <Link to="/rate" onClick={closeMenu} className="block hover:text-blue-600">Rate</Link>
              <button onClick={() => { logout(); closeMenu(); }} className="block text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="block hover:text-blue-600">Login</Link>
              <Link to="/signup" onClick={closeMenu} className="block hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
