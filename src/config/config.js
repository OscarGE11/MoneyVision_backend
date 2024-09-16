import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  accessToken: process.env.AUTH_TOKEN_NAME,
  frontendURL: process.env.FRONTEND_URL
}
