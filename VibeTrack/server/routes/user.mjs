import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("User");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:user", async (req, res) => {
  let collection = await db.collection("User");
  let query = {_id: new ObjectId(req.params.user)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    code: req.body.code,
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    emergency1: req.body.emergency1,
    emergency2: req.body.emergency2,
  };
  let collection = await db.collection("User");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:user", async (req, res) => {
  const query = { _id: new ObjectId(req.params.user) };
  const updates =  {
    $set: {
      code: req.body.code,
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      emergency1: req.body.emergency1,
      emergency2: req.body.emergency2,
    }
  };

  let collection = await db.collection("User");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:user", async (req, res) => {
  const query = { _id: new ObjectId(req.params.user) };

  const collection = db.collection("User");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get("/findUserByEmail", async (req, res) => {
  const emailToFind = "rnb90@txstate.edu"; // Change this to the desired email

  try {
    const user = await db.collection("User").findOne({ email: emailToFind });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ name: user.name }); // Return the name of the user
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;