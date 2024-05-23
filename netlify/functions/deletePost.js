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

const deletePost = async (postNum, postWriter) => {
  try {
    const database = await connectToDatabase();
    const postsCollection = database.collection(process.env.POSTS_COLLECTION);
    const tagsCollection = database.collection(
      process.env.POST_TAGS_COLLECTION,
    );

    const result = await postsCollection.deleteOne({
      num: postNum,
      writer: postWriter,
    });

    const Tagresult = await tagsCollection.deleteOne({
      post_num: postNum,
      type: '자유',
    });

    if (result.deletedCount === 1 && Tagresult.deletedCount === 1) {
      // 수정된 부분
      return { success: true, message: 'Post, Tag deleted successfully' };
    } else {
      return {
        success: false,
        message: 'Post, Tag not found or already deleted',
      };
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

const handler = async (event) => {
  try {
    const { num, writer } = JSON.parse(event.body);

    if (!num || !writer) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Reply ID is required' }),
      };
    }

    const result = await deletePost(num, writer);

    if (result.success) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: result.message }),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: result.message }),
      };
    }
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
