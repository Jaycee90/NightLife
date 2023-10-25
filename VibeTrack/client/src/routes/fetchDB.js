const cs = "mongodb+srv://anh00:p5EwNCEkcOzqRiV8@venues.qwb5ogw.mongodb.net/?retryWrites=true&w=majority"
const { MongoClient } = require('mongodb');

// Function to fetch all venues from MongoDB
async function fetchVenues() {
  const client = new MongoClient(cs);
  //const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    console.log("Starting connection");
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Venues');
    const collection = database.collection('Venues.Venues'); 

    // Fetch all venues without any filter
    const name = await collection.find({}).toArray();

    return name;
  } finally {
    client.close();
  }
}

module.exports = fetchVenues;
