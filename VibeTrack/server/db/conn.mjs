import { MongoClient } from "mongodb";

//connecting to mongoDB
const connectionString = "mongodb+srv://anh00:p5EwNCEkcOzqRiV8@venues.qwb5ogw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Venues");

export default db;