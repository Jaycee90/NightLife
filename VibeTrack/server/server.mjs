import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import cheerio from "cheerio";
import axios from "axios";
import nodemailer from 'nodemailer';

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/scrape', async (req, res) => {
  try {
      const response = await axios.get('https://www.visitsanmarcos.com/listen-san-marcos/live-this-week/'); // Replace with your target URL
      const $ = cheerio.load(response.data); // Creates HTML response an an object

      const eventInfo = [];
      // Div container holding all events
      const eventContainer = $('.contentRender');
      // For each date and events under that date
      eventContainer.find('h3').each((_, dayElement) => {
        // Date of event
      const day = $(dayElement).text();
      // Grab the list of events under that date
      const eventsElements = $(dayElement).nextUntil('h3', 'div');
      // iterate through each event 
      eventsElements.each((_, eventElement) => {
        // Grab the event
        const divText = $(eventElement).text();
        eventInfo.push({ day, divText });
      });
    });
    res.json(eventInfo); // Send structured data as JSON response
  } catch (error) {
    res.status(500).send('Error scraping data');
  }
});
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: 'isaiah12gage@gmail.com', // Replace with your email
      pass: 'tziq eztk aiwr jcug', // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'isaiah12gage@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Email not sent');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});
app.use("/record", records);
app.use("/user", users);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
