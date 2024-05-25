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
    const collection = database.collection(process.env.TAGS_COLLECTION);

    // 모든 문서에서 name 필드와 count 필드 추출
    const results = await collection
      .find({}, { projection: { name: 1, count: 1, _id: 0 } })
      .toArray();

    // name 필드와 count 필드를 대응시켜서 배열로 추출
    const nameCountArray = results.map((doc) => ({ [doc.name]: doc.count }));
    console.log(nameCountArray);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(nameCountArray),
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
