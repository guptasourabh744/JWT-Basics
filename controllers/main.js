const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const users = require('../users.json');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomAPIError('Please provide username and password', 400);
    }

    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
        throw new CustomAPIError('Invalid username or password', 401);
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ msg: 'Genuine user hai bro', token });
};

const dashboard = async (req, res) => {
    console.log(req.user);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username} bhai`, 
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
};

module.exports = {
    login,
    dashboard
};
