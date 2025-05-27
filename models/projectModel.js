const db = require('../config/db');

exports.createProject = (data, callback) => {
  db.run(`INSERT INTO Projects (name, description, user_id) VALUES (?, ?, ?)`,
    [data.name, data.description, data.user_id], callback);
};

exports.getUserProjects = (userId, callback) => {
 db.all(`SELECT * FROM Projects WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      console.error('DB Error in getUserProjects:', err);
      return callback(err);
    }
    callback(null, rows);
  });
};


