const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://rnb90:iNKkqcIJu2kPGI57@venues.qwb5ogw.mongodb.net/';

// Function to fetch all venues from MongoDB
async function fetchVenues() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Venues.Venues');
    const collection = database.collection('Venues'); 

    // Fetch all venues without any filter
    const venues = await collection.find({}).toArray();
    return venues;
  } finally {
    client.close();
  }
}

module.exports = fetchVenues;
