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
    const collection = database.collection(process.env.POST_TAGS_COLLECTION);

    // 특정 num 값에 해당하는 게시물 정보를 가져옴
    const result = await collection.findOne({
      post_num: parseInt(num),
      type: '질문',
    });

    // 게시물이 존재하지 않는 경우
    if (!result) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Post not found' }),
      };
    }

    // 게시물의 태그를 추출하여 반환
    const tags = result.tag;
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ tags }),
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
