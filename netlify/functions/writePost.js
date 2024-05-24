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

const extractTags = (tag) => {
  if (tag) {
    return tag.split(',').map((tag) => tag.trim());
  }
  return [];
};

const searchAndUpdateTagsInCollection = async (tags) => {
  try {
    const database = await connectToDatabase();
    const tagsCollectionName = process.env.TAGS_COLLECTION || 'tags';
    const tagsCollection = database.collection(tagsCollectionName);

    // 태그의 count 증가
    await Promise.all(
      tags.map(async (tag) => {
        await tagsCollection.updateOne(
          { name: tag },
          { $inc: { count: 1 } },
          { upsert: true },
        );
      }),
    );

    // 증가된 태그를 검색하여 결과 반환
    const searchResults = await tagsCollection
      .find({ name: { $in: tags } })
      .toArray();

    return searchResults;
  } catch (error) {
    console.error('Error searching and updating tags:', error);
    throw error;
  }
};

const handler = async (event) => {
  try {
    const { title, contents, writer, file, tag } = JSON.parse(event.body);

    if (!title || !contents || !writer || !file || !tag) {
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
    const posttagsCollection = database.collection(
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
      file,
      type: '자유',
    };

    await postsCollection.insertOne(newPost);

    // 태그를 저장
    const newTags = {
      post_num: postCount + 1,
      tag: tag,
      type: '자유',
    };

    await posttagsCollection.insertOne(newTags);

    console.log(tag);
    const tags = extractTags(tag);
    console.log(tags);
    const searchResults = await searchAndUpdateTagsInCollection(tags);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: '게시글 및 태그 작성 성공!',
        tags: searchResults,
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
