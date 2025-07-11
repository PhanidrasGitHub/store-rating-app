const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findUserByUsername } = require('../models/Store')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log('Login attempt:', { username, password })
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }
  const user = await findUserByUsername(username)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.json({ token })
}

module.exports = { login }