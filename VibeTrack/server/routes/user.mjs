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
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    nameF: req.body.name,
    nameL: req.body.nameL,
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
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      nameF: req.body.name,
      nameL: req.body.nameL,
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
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("User");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;