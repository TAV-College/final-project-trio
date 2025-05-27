const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createUser,findByEmail} = require('../models/userModel');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  createUser({ username, email, password: hash }, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered' });
  });
};


const login = (req, res) => {
  const { email, password } = req.body;

  findByEmail(email, async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

   const token = jwt.sign(
    { id: user.user_id, username: user.username }, 
     process.env.TOKEN_SECRET, 
    { expiresIn: '1h' }
  );


    // Set the token in a cookie
    res.cookie('authCookie', token, {
      httpOnly: true,
      secure: false, 
      maxAge: 3600000 
    });

    res.status(200).json({ message: 'Login successful' });
  });
};


module.exports={
    login,register
}