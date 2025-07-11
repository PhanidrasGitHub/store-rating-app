import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [statsRes, usersRes, adminsRes] = await Promise.all([
          axios.get('/dashboard-stats'),
          axios.get('/users'),
          axios.get('/admins'),
        ]);

        setStats(statsRes.data);
        setUsers(usersRes.data);
        setAdmins(adminsRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.total_users}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-lg font-semibold">Total Stores</h2>
          <p className="text-3xl font-bold mt-2">{stats.total_stores}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-lg font-semibold">Total Ratings</h2>
          <p className="text-3xl font-bold mt-2">{stats.total_ratings}</p>
        </div>
      </div>

      {/* Users & Admins Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3 text-center sm:text-left">Users</h2>
          <ul className="bg-white rounded-xl shadow divide-y">
            {users.map(user => (
              <li key={user.id} className="p-4 text-sm sm:text-base">
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 text-center sm:text-left">Admins</h2>
          <ul className="bg-white rounded-xl shadow divide-y">
            {admins.map(admin => (
              <li key={admin.id} className="p-4 text-sm sm:text-base">
                {admin.username} ({admin.email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
