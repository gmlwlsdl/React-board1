const db = require('../db');

exports.getPosts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts', (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getPostById = (num) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts WHERE num = ?', [num], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};
