// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('bufferCommands', false); // evita operaciones en espera
        await mongoose.connect('mongodb://turntable.proxy.rlwy.net:39140', {
            dbName: 'movies',
            user: 'mongo',
            pass: 'zKrdihrANcROAmWrBwDaYjxUMJSykFBc',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 10000,
        });

        console.log('✅ Conectado a MongoDB');
    } catch (err) {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        process.exit(1); // evita que el servidor arranque sin conexión
    }
};

module.exports = connectDB;