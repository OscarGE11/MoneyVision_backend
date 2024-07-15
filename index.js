import express from 'express';
import connectDB from './database.js';
import config from './src/config/config.js';
import movementRouter from './src/routes/movement.routes.js';
import morgan from 'morgan';
import userRouter from './src/routes/user.routes.js';

const app = express();
const PORT = config.port;

// Middlewares
app.use(express.json()); // Parsear JSON
app.use(morgan('dev')); // Rastrear las peticiones HTTP

// Conectar a la base de datos
connectDB();

// Routes
app.use('/api/users', userRouter);
app.use('/api/movements', movementRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
