import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";
import nodemailer from 'nodemailer';

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/scrape', async (req, res) => {
  try {
    const eventInfo = await scrapeData(); // Use the scrapeData function
    res.json(eventInfo); // Send structured data as JSON response
  } catch (error) {
    res.status(500).send(error.message);
  }
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
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
