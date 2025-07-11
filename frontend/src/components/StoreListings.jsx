import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const StoreListings = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch store listings');
      }
    };

    fetchStores();
  }, []);

  if (error)
    return (
      <div className="text-red-500 text-center mt-20 px-4">{error}</div>
    );

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-700">
        Store Listings
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <li
            key={store.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              {store.name}
            </h3>
            <p className="text-sm text-gray-600">📍 {store.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreListings;
