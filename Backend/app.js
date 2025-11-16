// index.js
const express = require('express');
const connectDB = require('./db');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
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