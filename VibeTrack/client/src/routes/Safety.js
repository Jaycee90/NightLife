import React, { useState } from 'react';

function Safety() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const sendEmail = () => {
    console.log('sendEmail function called');
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Email sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="email"
        name="to"
        placeholder="Recipient"
        value={emailData.to}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleInputChange}
      />
      <textarea
        name="text"
        placeholder="Message"
        value={emailData.text}
        onChange={handleInputChange}
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default Safety;