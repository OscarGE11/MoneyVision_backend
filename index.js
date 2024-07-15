import express from 'express';
import connectDB from './database.js';
import config from './src/config/config.js';
import movementRouter from './src/routes/movement.routes.js';
import morgan from 'morgan';

const app = express();
const PORT = config.port;

// Middleware para parsear JSON
app.use(express.json());
// Middleware para rastrear las peticiones HTTP
app.use(morgan('dev'));
// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware para gestionar rutas
app.use('/api/movements', movementRouter);
// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
