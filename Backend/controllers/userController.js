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
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
        if (!token) return res.status(401).json({ message: 'Missing token' });
        auth.verifyToken(token);
        const users = await User.find().select('-password');
        return res.json(users);
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

const singup = async (req, res) => {
    const { username, password } = req.body;
    if (await verifiyUser(username) == false) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    const hashedPassword = await auth.generateHash(password);
    const user = new User({ username, password: hashedPassword, role: 1 });
    await user.save();
    return res.status(201).json({ message: 'User registered' });
}
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await auth.compareHash(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = auth.generateToken({ id: user._id });
    return res.json({
        token,
        user: { id: user._id, username: user.username, role: user.role }
    });
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
    await User.findByIdAndDelete(req.params.id);
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