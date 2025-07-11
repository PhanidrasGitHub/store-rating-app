const bcrypt = require('bcryptjs');
const { createUser } = require('../models/Store.js');


const signup = async (req, res) => {
  
  console.log('Signup attempt:', req.body);
  try {
    const { username, email, password, role, address } = req.body;
    
    if (!username || !email || !password || !role || !address) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const hashed = await bcrypt.hash(password.toString(), 10);
    const user = await createUser(username, email, hashed, role, address);
    console.log('User created:', user);
   
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address
      }
    })  ;
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
};

module.exports = { signup };

