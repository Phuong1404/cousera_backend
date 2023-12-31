
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const register = async (req, res, next) => {
    try {
      const { name, username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10); 
  
      const user = new User();
      user.name=name
      user.username=username
      user.password=hashedPassword
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error registering user' });
    }
  };
  const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = generateJwt(user);
  
      res.json({ message: 'Login successful', token, user: { ...user._doc, password: undefined } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in user' });
    }
  };

const generateJwt = (user) => {
  const secretKey = "CourseraBackend";

  const payload = {
    _id: user._id,
    username: user.username,
  };
  const expiresIn = '1h';

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};
module.exports = {
    register,login
}