import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import scrape from "./routes/scrape.mjs";

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/record", records);
app.use("/user", users);
app.use("/scrape", scrape);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
