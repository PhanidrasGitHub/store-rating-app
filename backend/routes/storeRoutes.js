const express = require('express');
const {
  addStore,
  getDashboardStats,
  listUsers,
  listAdmins,
  listStores,
  getUserDetails
} = require('../controllers/storeController');

const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-store', authenticate, addStore); 

router.get('/dashboard-stats', authenticate, getDashboardStats); 

router.get('/users', authenticate, listUsers);
router.get('/admins', authenticate, listAdmins);
router.get('/stores', authenticate, listStores);

router.get('/user/:id', authenticate, getUserDetails);

module.exports = router;
