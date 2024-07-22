
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.register = async (req, res) => {
  const { username, email, password, avatar } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
    });

    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ttt = await bcrypt.hash(password, 10);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({ message: error.message });
  }
};

