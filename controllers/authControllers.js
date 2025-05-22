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
  findByEmail(email, async function (err, user) {
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.user_id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports={
    login,register
}