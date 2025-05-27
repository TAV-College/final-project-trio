const db = require('../config/db');

const createUser = (user, cb) => {
  const { username, email, password, role } = user;
  db.run(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role], cb);
};

const findByEmail = (email, callback) => {
  db.get(`SELECT * FROM Users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      console.error('DB error:', err);
      return callback(err);
    }
    console.log('findByEmail result:', row);
    callback(null, row);
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

module.exports = {
    createUser,findByEmail,getUserByUsername
}

