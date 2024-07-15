import express from 'express';
import connectDB from './database.js';
import config from './src/config/config.js';
import userRouter from './src/routes/user.routes.js';

const app = express();
const PORT = config.port;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Routes
app.use('/api/users', userRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
