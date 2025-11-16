const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
    return //jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const verifyToken = (token) => {
    return j//wt.verify(token, process.env.JWT_SECRET);
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