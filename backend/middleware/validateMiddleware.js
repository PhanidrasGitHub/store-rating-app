const findUserByUsername = require('../models/Store').findUserByUsername;
const validateUser = async (req, res, next) => {
  const { username, email, password,address,role } = req.body;
  console.log('Validation attempt:', { username, email, password,address, role });
  
  if (username !== undefined) {
    const data = await findUserByUsername(username); 
    console.log('Data from DB:', data);
    if (data !== undefined) {
      return res.status(400).json({ error: 'Username already exists' });
    }else{
  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Invalid username' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password too short' });
  }
  
  next();
}
    
  }

  
};

module.exports = { validateUser }; 
