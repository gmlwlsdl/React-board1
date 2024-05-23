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

const handler = async (event) => {
  try {
    const { userEmail, userPW, nickname } = JSON.parse(event.body);

    if (!userEmail || !userPW || !nickname) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '모든 필드를 입력해주세요.' }),
      };
    }

    const database = await connectToDatabase();
    const usersCollection = database.collection(process.env.USERS_COLLECTION);

    const user = await usersCollection.findOne({ email: userEmail });

    if (user) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '사용 중인 이메일 입니다.' }),
      };
    }

    const hash = await textToHash(userPW);

    const newUser = {
      email: userEmail,
      pw: hash,
      nickname: nickname,
    };

    await usersCollection.insertOne(newUser);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: '회원가입 완료' }),
    };
  } catch (error) {
    console.error('Error:', error);
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
