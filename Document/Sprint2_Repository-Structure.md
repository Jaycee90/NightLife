## VibeTrack - Strucutre and Functionality

### Directory Structure:
* server
    * db
        * [conn.mjs](#conn-mjs)
    * routes
        * [record.mjs](#record-mjs)
        * [user.mjs](#user-mjs)
    * [config.env](#config-env)
    * [loadEnvironment.mjs](#load-environment-mjs)
    * [server.mjs](#server-mjs)
    * [package.json](#package-json)
    * [package-lock.json](#package-lock-json)
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

<a name="conn-mjs"></a>
### /db/conn.mjs 
* Establishes a connection to a MongoDB database using the provided ATLAS_URI environment variable. 

* Uses the MongoClient from the mongodb package to connect to a MongoDB Atlas cluster, and upon successful connection, it selects "Venues" database and exports it for use in the project application.
```javascript
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
```

<a name="record-mjs"></a>
### /routes/record.mjs & /routes/user.mjs (& etc.) 
* Defines an Express.js router that handles various HTTP  for the "Venues" database. 
* Uses MongoDB operations for data manipulation and includes routes for:
    * retrieving all records
    * retrieving a single record by its ID
    * creating a new record
    * updating an existing record by ID
    * deleting a record by ID.

```javascript

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
    
```

Note: This function helps retrieve a single record by searching for the corresponding _id (ObjectID) in the "Venues" (Venues.Venues) collection.

```javascript
    router.get("/:id", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

Similarly, you can query another record that contain the matching keyname by changing the query statement: ```let query = {key: req.params.key};```

```javascript
    router.get("/:key", async (req, res) => {
    let collection = await db.collection("Venues");
    let query = {key: req.params.key};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });
```

<a name="user-mjs"></a>
```user.mjs``` also works in a similar fashion. However, instead of parsing by ```"/:id"```, it uses ```"/:code"``` to find and fetch user records. 
```
    let query = {code: req.params.code};
```
In this case, ```"/:id"``` and ```"/:code"``` act as placeholders that can be filled with actual values when certain route paths are accessed. For example, in ```App.js``` (/client/src/App.js), we have:

```javascript
    <Route path="/data/:id" element={<Data />} />
``` 
which specified that it wants to access a record in the "Venues" collection using ```:id``` as parameter. While:

```javascript
    <Route path="/profile/:user" element={<Profile />} />
```
indicates that it will parse the ```:code``` to find the corresponding user record in "User" collection.

This way, you can use these parameters to identify which specific record you want to retrieve from the respective collections ("User" or "Venues" or etc.). 

It's a common pattern in routing to use dynamic segments like ```:id``` or ```:user``` to handle different resources or entities in a RESTful API.

<a name="config-env"></a>
### /config.env
* Declares ATLAS_URI as an environment variable storing the connection string for a MongoDB Atlas cluster.
* Allows the application to securely connect to the database without exposing sensitive credentials directly in the code, therefore enhancing security.
```
    ATLAS_URI=mongodb+srv://<username>:<password>@venues.qwb5ogw.mongodb.net/?retryWrites=true&w=majority
```

<a name="load-environment-mjs"></a>
### /loadEnvironment.mjs
* Uses the dotenv package to load environment variables from ```config.env```
* Allows application to securely access sensitive information, keeping passwords, API keys, and other sensitive data out of the code. 
```javascript
    import dotenv from "dotenv";

    dotenv.config({ path: "./config.env" });
```

<a name="package-json"></a>
### /package.json
* Used in Node.js to define various aspects of the project, including:
    * packages and applications it depends on
    * information about its unique source control
    * specific metadata like the project's name, description, and author.
* Crucial for managing project dependencies and providing information for package installation and execution.
* ```npm install``` when you change the dependencies on the project.

<a name="package-lock-json"></a>
### /package-lock.json
* Ensures that the same dependencies are installed consistently across different environments, such as development and production environments.
* Also helps preventing issues with installing different package versions, which can lead to conflicts and errors.

<a name="server-mjs"></a>
### /server.mjs
* Sets up an Express server on port 5050, applies middleware for handling CORS (Cross-Origin Resource Sharing) and parsing JSON requests
* Routes requests (for example) to   ```'/record' ``` endpoint to a module located at ```./routes/record.mjs```
```javascript
    import express from "express";
    import cors from "cors";
    import "./loadEnvironment.mjs";
    import records from "./routes/record.mjs";
    import users from "./routes/user.mjs";

    const PORT = 5050;
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/record", records);
    app.use("/user", users);


    // start the Express server
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });
```
* How to run: Start Client server (on another seperate terminal):
```powershell
    cd VibeTrack/client
    npm install
    npm start
```
* If you run the application at this point, you will get the following message in your terminal as the connection establishes.
![Output](https://i.imgur.com/Uznj5Rz.png)