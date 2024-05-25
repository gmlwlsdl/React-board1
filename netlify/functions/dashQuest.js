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
    const database = await connectToDatabase();
    const collection = database.collection(process.env.QUESTS_COLLECTION);

    // 모든 문서에서 created_at 필드만 추출
    const results = await collection
      .find({}, { projection: { created_at: 1, _id: 0 } })
      .toArray();

    // created_at 필드 값만 배열로 추출
    const createdAtArray = results.map((doc) => doc.created_at);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(createdAtArray),
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
