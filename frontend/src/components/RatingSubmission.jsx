import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const RatingSubmission = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/stores');
        setStores(res.data);
      } catch (err) {
        console.error('Failed to load stores:', err);
        setError('Failed to load stores');
      }
    };
    fetchStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/ratings', {
        store_id: selectedStore,
        rating,
        comment,
      });
      setSuccess('Rating submitted successfully');
      setSelectedStore('');
      setRating(1);
      setComment('');
    } catch (err) {
      console.error('Failed to submit rating:', err);
      setError('Failed to submit rating');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Submit Rating</h2>

        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          required
        >
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-5)"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          required
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded text-sm transition duration-200"
        >
          Submit
        </button>

        {success && <p className="text-green-600 text-center mt-3 text-sm">{success}</p>}
        {error && <p className="text-red-500 text-center mt-3 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default RatingSubmission;
