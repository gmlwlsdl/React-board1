const { MongoClient } = require('mongodb');

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

const handler = async (event) => {
  try {
    // num 값을 가져옴
    const { num } = event.queryStringParameters;

    // num이 제대로 전달되었는지 확인
    if (!num) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'num parameter is required' }),
      };
    }

    const database = await connectToDatabase();
    const collection = database.collection(process.env.REPLIES_COLLECTION);

    // 특정 post_num 값에 해당하는 댓글들을 가져옴
    const replies = await collection
      .find({ post_num: parseInt(num), type: '자유' })
      .toArray();

    // 댓글이 존재하지 않는 경우
    if (!replies || replies.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Replies not found' }),
      };
    }

    // 댓글을 반환
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ replies }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
