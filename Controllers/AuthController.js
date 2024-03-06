const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log(process.env.JWT_SECRET_KEY)
        const token = await jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_IN });
        const refresh = await jwt.sign({ user: user }, process.env.JWT_REFRESH_SECRET_KEY);
        console.log(token)
        res.cookie('token', token, { httpOnly: true });
        res.cookie('refresh', refresh, { httpOnly: true });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
}
exports.logout = async (req, res) => {
    console.log("logout")
}