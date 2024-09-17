import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json({ message: 'Access denied' })

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' })

    req.user = decoded
    next()
  })
}
