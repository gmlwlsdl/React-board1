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

const handler = async (event) => {
  try {
    const { title, contents, writer, tag } = JSON.parse(event.body);

    if (!title || !contents || !writer || !tag) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '모든 필드를 입력해주세요.' }),
      };
    }

    const database = await connectToDatabase();
    const postsCollection = database.collection(process.env.POSTS_COLLECTION);
    const tagsCollection = database.collection(
      process.env.POST_TAGS_COLLECTION,
    );

    // 게시글 번호를 결정하기 위해 현재 컬렉션의 데이터 개수를 검색
    const postCount = await postsCollection.countDocuments();

    const newPost = {
      num: postCount + 1, // 새로운 게시글 번호
      title,
      contents,
      writer,
      created_at: new Date(),
      views: 0,
    };

    await postsCollection.insertOne(newPost);

    // 태그를 저장
    const newTags = {
      post_num: postCount + 1,
      tag: tag,
    };

    await tagsCollection.insertOne(newTags);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: '게시글 및 태그 작성 성공!' }),
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
