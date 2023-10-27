import express from "express";
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-email', (req, res) => {
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

  
export default router;