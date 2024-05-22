const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  await mongoClient.connect();
  cachedDb = mongoClient.db(process.env.MONGODB_DATABASE);
  return cachedDb;
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

const handler = async (event) => {
  try {
    const { userEmail, userPW } = JSON.parse(event.body);

    if (!userEmail || !userPW) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '이메일과 비밀번호를 입력해주세요.' }),
      };
    }

    const database = await connectToDatabase();
    const usersCollection = database.collection(process.env.USERS_COLLECTION);

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '사용자가 존재하지 않습니다.' }),
      };
    }

    const isPasswordCorrect = await hashCompare(userPW, user.pw);

    if (!isPasswordCorrect) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '비밀번호가 일치하지 않습니다.' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: '로그인 성공!',
        userEmail: user.email,
        nickname: user.nickname,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { handler };
