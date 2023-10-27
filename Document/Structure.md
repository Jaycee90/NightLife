## VibeTrack - Strucutre and Functionality

### Directory Structure:
* server
    * db
        * conn.mjs
    * routes
        * record.mjs
        * user.mjs
    * config.env
    * loadEnvironment.mjs
    * server.mjs
    * package.json
    * package-lock.json
* client
    * public
    * src
        * css
            * ...
        * components
            * create.js
            * edit.js
            * navbar.js
            * recordList.js
            * userList.js
            * specialEventScraper.js
            * geocoding.py
        * realm
            * constant.js
            * Login.js
            * Private.js
            * Signup.js
            * UserContext.js
        * routes
            * Contact.js
            * Data.js
            * Discover.js
            * Home.js
            * Profile.js
            * Safety.js
            * Search.js
            * Special.js
            * Template.js
            * Test.js
    * App.js
    * index.js
* package-kock.json
* package.json

## Server
### /db/conn.mjs
* Establishes a connection to a MongoDB database using the provided ATLAS_URI environment variable. 

* Uses the MongoClient from the mongodb package to connect to a MongoDB Atlas cluster, and upon successful connection, it selects "Venues" database and exports it for use in the project application.

<details>
        

    import { MongoClient } from "mongodb";

    const connectionString = process.env.ATLAS_URI || "";

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


</details>

### /db/routes.mjs & /db/user.mjs (& etc.)
* Defines an Express.js router that handles various HTTP  for the "Venues" database. 
* Uses MongoDB operations for data manipulation and includes routes for:
    * retrieving all records
    * retrieving a single record by its ID
    * creating a new record
    * updating an existing record by ID
    * deleting a record by ID.

<details>


    import express from "express";

    import db from "../db/conn.mjs";

    import { ObjectId } from "mongodb";

    const router = express.Router();

    // This section will help you get a list of all the records.

    router.get("/", async (req, res) => {

    let collection = await db.collection("Venues");

    let results = await collection.find({}).toArray();

    res.send(results).status(200);

    });

    // This section will help you get a single record by id

    router.get("/:id", async (req, res) => {

    let collection = await db.collection("Venues");
    
    let query = {_id: new ObjectId(req.params.id)};

    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);

    else res.send(result).status(200);

    });

    // This section will help you create a new record.

    router.post("/", async (req, res) => {

    let newDocument = {

        name: req.body.name,

        address: req.body.address,

        phone: req.body.phone,

        website: req.body.website,

        // etc...
    };

    let collection = await db.collection("Venues");

    let result = await collection.insertOne(newDocument);

    res.send(result).status(204);

    });


    // This section will help you update a record by id.

    router.patch("/:id", async (req, res) => {

    const query = { _id: new ObjectId(req.params.id) };

    const updates =  {

        $set: {

        name: req.body.name,

        address: req.body.address,

        phone: req.body.phone,

        website: req.body.website,

        // etc...

        }

    };


    let collection = await db.collection("Venues");

    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);

    });


    // This section will help you delete a record

    router.delete("/:id", async (req, res) => {

    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("Venues");

    let result = await collection.deleteOne(query);

    res.send(result).status(200);

    });
    

    export default router;
    
</details>

* Note: This function helps retrieve a single record by searching for the corresponding _id (ObjectID) in the "Venues" (Venues.Venues) collection.

```
router.get("/:id", async (req, res) => {
let collection = await db.collection("Venues");
let query = {_id: new ObjectId(req.params.id)};
let result = await collection.findOne(query);

if (!result) res.send("Not found").status(404);
else res.send(result).status(200);
});
```

Similarly, you can query another record that contain the matching keyname by changing the query statement: ```let query = {key: req.params.key};```

```
router.get("/:key", async (req, res) => {
let collection = await db.collection("Venues");
let query = {key: req.params.key};
let result = await collection.findOne(query);

if (!result) res.send("Not found").status(404);
else res.send(result).status(200);
});
```