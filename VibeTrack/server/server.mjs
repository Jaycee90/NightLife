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
