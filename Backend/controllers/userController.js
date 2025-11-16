const { use } = require('bcrypt/promises');
const auth = require('../middelware/auth');
const User = require('../models/user');

const verifiyUser = async (username) => {
    const user = await User.findOne({ "username": username });
    console.log(user);
    if (user != null) {
        return false;
    }
    return true;
}

const getAllUsers = async (req, res) => {
    // antes de mostrar los usuarios, debemos verificar si el token es valido
    const users = await User.find();
    res.json(users);
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

const singup = async (req, res) => {
    const { username, password } = req.body;
    if (await verifiyUser(username) == false) {
        res.status(401).json({ message: 'Bad Request' });
        return;
    }
    const hashedPassword = await auth.generateHash(password);
    console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword, role: 1 });
    await user.save();
    res.json({ message: 'User registered' });
}
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (user == {}) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    const isPasswordValid = await auth.compareHash(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    res.json(user)
}

const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
}

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
}
const deleteUser = async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
}

module.exports = {
    getAllUsers,
    singup,
    login,
    createUser,
    deleteUser,
    getUserById,
    updateUser
}