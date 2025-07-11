const express = require('express');
const { submitRating, modifyRating } = require('../controllers/ratingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/ratings', authenticate, submitRating);
router.put('/ratings/:id', authenticate, modifyRating);

module.exports = router; 
