const db = require('../config/db');

const createUser = (user, cb) => {
  const { username, email, password, role } = user;
  db.run(`INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role], cb);
};

const findByEmail = (email, callback) => {
  db.get(`SELECT * FROM Users WHERE email = ?`, [email], callback);
};

module.exports = {
    createUser,findByEmail
}

