import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import record from "./routes/record.mjs";
import user from "./routes/user.mjs";
import { scrapeData } from "./routes/scrape.mjs"; // Import the scrapeData function

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/record", record);
app.use("/user", user);

app.get('/scrape', async (req, res) => {
  try {
    const eventInfo = await scrapeData(); // Use the scrapeData function
    res.json(eventInfo); // Send structured data as JSON response
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
