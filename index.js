import express from 'express'
import connectDB from './src/utils/database.js'
import config from './src/config/config.js'
import transactionRouter from './src/routes/transaction.routes.js'
import morgan from 'morgan'
import userRouter from './src/routes/user.routes.js'
import categoryRouter from './src/routes/category.routes.js'
import cookieParser from 'cookie-parser'
import { register, login, logout } from './src/controllers/userController.js'
import { authMiddleware } from './src/middlewares/authMiddleware.js'
import cors from 'cors'

const app = express()
const PORT = config.port

// Middlewares
app.use(cookieParser())
app.use(
  cors({
    origin: config.frontendURL,
    credentials: true
  })
)
app.use(express.json()) // Parsear JSON
app.use(morgan('dev')) // Rastrear las peticiones HTTP

// Conectar a la base de datos
connectDB()

// Routes
app.post('/register', register) // Create new user
app.post('/login', login) // Log in
app.post('/logout', logout) // Log out
app.use('/api/users', authMiddleware, userRouter)
app.use('/api/transactions', authMiddleware, transactionRouter)
app.use('/api/categories', authMiddleware, categoryRouter)

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
})
