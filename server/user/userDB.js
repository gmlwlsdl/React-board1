const db = require('../db');

exports.getUser = (userEmail) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email = ?',
      userEmail,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

exports.signIn = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (email, pw, nickname) VALUES (?, ?, ?) `,
      [data[0], data[1], data[2]],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};
