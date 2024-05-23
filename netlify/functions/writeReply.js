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
    const { post_num, contents, writer } = JSON.parse(event.body);

    console.log('Received data:', { post_num, contents, writer });

    if (!post_num || !contents || !writer) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '모든 필드를 입력해주세요.' }),
      };
    }

    const database = await connectToDatabase();
    const repliesCollection = database.collection(
      process.env.REPLIES_COLLECTION,
    );

    const postNumInt64 = Number(post_num);

    const generateRandomString = (length) => {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };

    const newReply = {
      post_num: postNumInt64,
      contents,
      writer,
      created_at: new Date(),
      replyID: generateRandomString(10),
      type: '자유',
    };

    const result = await repliesCollection.insertOne(newReply);

    console.log('New reply inserted:', result);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: '댓글 작성 성공!, 새로고침을 해주세요' }),
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
