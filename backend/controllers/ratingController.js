const { addRating, updateRating } = require('../models/rating');

const submitRating = async (req, res) => {
  const { store_id, rating, comment } = req.body;
  console.log('Rating submission:', { store_id, rating, comment });
  const userId = req.user.userId;
  console.log('User ID:', userId);
  try {
    const id = await addRating(userId, store_id, rating, comment);
    res.status(201).json({ message: 'Rating submitted', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit rating' });
  }
};

const modifyRating = async (req, res) => {
  const { rating, comment } = req.body;
  const ratingId = req.params.id;
  const userId = req.user.userId;
  try {
    await updateRating(ratingId, userId, rating, comment);
    res.status(200).json({ message: 'Rating updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rating' });
  }
};

module.exports = { submitRating, modifyRating };
