const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://rnb90:iNKkqcIJu2kPGI57@venues.qwb5ogw.mongodb.net/';

// Function to fetch venues from MongoDB
async function fetchVenues() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Venues.Venues');
    const collection = database.collection('Venues'); 

    // Fetch venues (you can add query conditions if needed)
    const venues = await collection.find({}).toArray();
    return venues;
  } finally {
    client.close();
  }
}

// Example usage
fetchVenues()
  .then((venues) => {
    console.log('Venues:', venues);
  })
  .catch((err) => {
    console.error('Error fetching venues:', err);
  });


