import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import StoreListingsPage from './pages/StoreListings';
import RatingSubmissionPage from './pages/RatingSubmission';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <div className="min-h-screen bg-indigo-700">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/stores" element={<PrivateRoute><StoreListingsPage /></PrivateRoute>} />
      <Route path="/rate" element={<PrivateRoute><RatingSubmissionPage /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
