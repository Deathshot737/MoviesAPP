// index.js
const express = require('express');
const connectDB = require('./db');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
// CORS básico para permitir peticiones desde el frontend (vite en 5173)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});
// Tus rutas aquí
app.use('/api/v1', movieRouter);
app.use('/api/v1', userRouter);


const startServer = async () => {
    await connectDB(); // espera conexión antes de continuar

    app.listen(3000, () => {
        console.log('🚀 Servidor iniciado en el puerto 3000');
    });
};

startServer();