import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: 'Access denied' })

  try {
    req.user = jwt.verify(token, config.jwtSecret)
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
}
