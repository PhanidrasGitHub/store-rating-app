const initDB = require('../utils/db');

const addRating = async (userId, storeId, rating, comment) => {
    const db = await initDB();
  const [res] = await db.execute(
    'INSERT INTO ratings (user_id, store_id, rating, comment) VALUES (?, ?, ?, ?)',
    [userId, storeId, rating, comment]
  );
  return res.insertId;
};

const updateRating = async (ratingId, userId, rating, comment) => {
    const db = await initDB();
    await db.execute(
    'UPDATE ratings SET rating = ?, comment = ? WHERE id = ? AND user_id = ?',
    [rating, comment, ratingId, userId]
  );
};

const getStoreRatings = async (storeId) => {
    const db = await initDB();
  const [rows] = await db.execute(
    'SELECT * FROM ratings WHERE store_id = ?',
    [storeId]
  );
  return rows;
};

module.exports = {
  addRating,updateRating,
  getStoreRatings}