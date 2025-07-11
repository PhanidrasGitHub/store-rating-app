const { createStore, fetchStores } = require('../models/User');
const {  insertStore, countAll, getUsersByRole, getStores, getUserWithRatings } = require('../models/Store');


const addStore = async (req, res) => {
    console.log(req.body)
  try {
    const { name, address, owner_id } = req.body;
    
    const store = await insertStore(name, address, owner_id);
    res.status(201).json({ message: 'Store added', store });
  } catch (e) {
    res.status(500).json({ error: 'Failed to add store' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const stats = await countAll();
    res.status(200).json(stats);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

const listUsers = async (req, res) => {
  const users = await getUsersByRole('user');
  res.status(200).json(users);
};

const listAdmins = async (req, res) => {
  const admins = await getUsersByRole('admin');
  res.status(200).json(admins);
};

const listStores = async (req, res) => {
  const stores = await getStores();
  res.status(200).json(stores);
};

const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  const user = await getUserWithRatings(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
};
const getAllStores = async (req, res) => {
  try {
    const stores = await fetchStores();
    res.status(200).json(stores);
  } catch (err) {
    console.error('Get Stores Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

module.exports = { addStore, 
                   getDashboardStats, 
                   listUsers, 
                   listAdmins, 
                   listStores, 
                   getUserDetails, 
             };
