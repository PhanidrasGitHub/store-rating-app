const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');

router.post('/signup', validateUser, signup);

module.exports = router;
