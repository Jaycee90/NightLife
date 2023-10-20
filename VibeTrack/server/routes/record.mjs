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
    about: req.body.about,
    phone: req.body.phone,
    website: req.body.website,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    yelp: req.body.yelp,
    amenities: req.body.amenities,
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
      about: req.body.about,
      phone: req.body.phone,
      website: req.body.website,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      yelp: req.body.yelp,
      amenities: req.body.amenities,
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

// For Users
router.get("/user", async (req, res) => {
  let collection = await db.collection("Users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single USER record by id
router.get("/user/:user", async (req, res) => {
  let collection = await db.collection("User");
  let query = {_id: new ObjectId(req.params.user)};
  let result = await collection.findOne(query);

  if (!result) res.send("User not found").status(404);
  else res.send(result).status(200);
});

// This section will help you update a USER record by id.
router.patch("/user/:user", async (req, res) => {
  const query = { _id: new ObjectId(req.params.user) };
  const updates =  {
    $set: {
      nameF: req.body.nameF,
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
router.delete("/user/:user", async (req, res) => {
  const query = { _id: new ObjectId(req.params.user) };

  const collection = db.collection("User");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;