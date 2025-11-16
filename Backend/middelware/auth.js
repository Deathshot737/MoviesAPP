const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
}

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.verify(token, secret);
}

const generateHash = (password) => {
    return bcrypt.hash(password, 10);
}

const compareHash = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = {
    generateToken,
    verifyToken,
    generateHash,
    compareHash
}