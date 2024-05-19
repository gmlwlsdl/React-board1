const userDB = require('./userDB');
const bcrypt = require('bcrypt');

const textToHash = async (text) => {
  const saltRounds = 3;

  try {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.signIn = async (req, res) => {
  const { userEmail, userPW, nickname } = req.body;

  try {
    const getUser = await userDB.getUser(userEmail);
    if (getUser.length) {
      res.status(401).json({ message: '이미 존재하는 이메일입니다.' });
      return;
    }

    const hash = await textToHash(userPW);
    await userDB.signIn([userEmail, hash, nickname]);
    res.status(200).json({
      message: '가입 완료',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const hashCompare = async (inputValue, hash) => {
  try {
    const isMatch = await bcrypt.compare(inputValue, hash);
    return isMatch;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.loginCheck = async (req, res) => {
  const { userEmail, userPW } = req.body;

  try {
    const getUser = await userDB.getUser(userEmail);
    if (!getUser.length) {
      res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
      return;
    }

    const blobToStr = Buffer.from(getUser[0].pw).toString();
    const isMatch = await hashCompare(userPW, blobToStr);

    if (!isMatch) {
      res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    res.status(200).json({
      message: '로그인 완료',
      userEmail: getUser[0].email,
      userPW: getUser[0].pw,
      nickname: getUser[0].nickname,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러', error: err });
  }
};
