const { connectToDatabase } = require('./db');

const getTagsData = async () => {
  try {
    const database = await connectToDatabase();
    const tagsCollection = database.collection(process.env.TAGS_COLLECTION);
    return await tagsCollection.find().toArray();
  } catch (error) {
    console.error('Error fetching tags data:', error);
    throw error;
  }
};

module.exports = { getTagsData };
