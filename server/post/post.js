const userDB = require('./postDB');

exports.getPost = async (req, res) => {
  try {
    const posts = await userDB.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러', error: err });
  }
};

exports.getPostById = async (req, res) => {
  const { num } = req.params;
  try {
    const post = await userDB.getPostById(num);
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러', error: err });
  }
};
