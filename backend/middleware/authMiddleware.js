const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)
  const token = authHeader.split(' ')[1]
  try {
    const decoded  = jwt.verify(token, process.env.JWT_SECRET)
     req.user = { userId: decoded.id };
     console.log('Authenticated user:', req.user);  
    next()
  } catch {
    res.sendStatus(403)
  }
}

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.sendStatus(403)
  next()
}

module.exports = { authenticate, authorizeRoles }