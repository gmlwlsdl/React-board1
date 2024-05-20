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

exports.getPostTagsById = (num) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT t.name FROM post_tags pt JOIN tags t ON pt.tag_id = t.id WHERE pt.post_num = ?;',
      [num],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};
