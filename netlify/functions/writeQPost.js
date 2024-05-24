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

const searchAndUpdateTagsInCollection = async (tag) => {
  // 배열이 아니라 문자열로 전달됩니다.
  try {
    const database = await connectToDatabase();
    const tagsCollectionName = process.env.TAGS_COLLECTION || 'tags';
    const tagsCollection = database.collection(tagsCollectionName);

    // 태그의 count 증가
    await tagsCollection.updateOne(
      { name: tag },
      { $inc: { count: 1 } },
      { upsert: true },
    );

    // 증가된 태그를 검색하여 결과 반환
    const searchResults = await tagsCollection.find({ name: tag }).toArray();

    return searchResults;
  } catch (error) {
    console.error('Error searching and updating tags:', error);
    throw error;
  }
};

const handler = async (event) => {
  try {
    const { title, contents, writer, file } = JSON.parse(event.body);

    if (!title || !contents || !writer || !file) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: '모든 필드를 입력해주세요.' }),
      };
    }

    const database = await connectToDatabase();
    const qpostsCollection = database.collection(process.env.QUESTS_COLLECTION);
    const tagsCollection = database.collection(
      process.env.POST_TAGS_COLLECTION,
    );

    // 게시글 번호를 결정하기 위해 현재 컬렉션의 데이터 개수를 검색
    const postCount = await qpostsCollection.countDocuments();

    const newPost = {
      num: postCount + 1, // 새로운 게시글 번호
      title,
      contents,
      writer,
      created_at: new Date(),
      views: 0,
      file,
      type: '질문',
    };

    await qpostsCollection.insertOne(newPost);

    const tag = '#질문';

    // 태그를 저장
    const newTags = {
      post_num: postCount + 1,
      tag: tag, // 단일 태그 문자열을 그대로 사용합니다.
      type: '질문',
    };

    await tagsCollection.insertOne(newTags);
    const searchResults = await searchAndUpdateTagsInCollection(tag); // 태그를 문자열로 전달합니다.

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: '게시글 및 태그 작성 성공!',
        tag: searchResults,
      }),
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
