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

const deleteReply = async (replyId) => {
  try {
    const database = await connectToDatabase();
    const repliesCollection = database.collection(
      process.env.REPLIES_COLLECTION,
    );

    const result = await repliesCollection.deleteOne({ replyID: replyId });

    if (result.deletedCount === 1) {
      return { success: true, message: 'Reply deleted successfully' };
    } else {
      return { success: false, message: 'Reply not found or already deleted' };
    }
  } catch (error) {
    console.error('Error deleting reply:', error);
    throw error;
  }
};

const handler = async (event) => {
  try {
    const { replyId } = JSON.parse(event.body);

    if (!replyId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Reply ID is required' }),
      };
    }

    const result = await deleteReply(replyId);

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
