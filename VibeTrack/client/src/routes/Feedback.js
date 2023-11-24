import React, { useState } from 'react';
import { Chip } from "@material-ui/core";
import '../css/Feedback.css';

function Feedback() {
  const [emailData, setEmailData] = useState({
    to: 'vibetracktxt@gmail.com',
    subject: 'This is feedback for the website',
    text: '',
  });

  const [values, setValues] = useState(["vibetracktxt@gmail.com"]);
  const [currentValue, setCurrentValue] = useState("");

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      const newToValue = [...emailData.to.split(','), e.target.value].join(',');
      setEmailData({
        ...emailData,
        to: newToValue,
      });
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrentValue("");
    }
  };

  const handleEmailChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleEmailDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  }

  const handleFeedbackChange = (e) => {
    setEmailData({
      ...emailData,
      text: e.target.value,
    });
  };

  const sendEmail = () => {
    // Removed the part related to selected venues
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
      <div className="intro-container" style={{ marginTop: "20px" }}>
        <h1 className="intro-title">Feedback for the Website</h1>
        <p className="intro-description">Clubs! Dancing! Drinks! It's all fun, but we want to hear your thoughts on the website.</p>
        <p className="intro-description">We appreciate your feedback! Enter your email address and share your thoughts with us.</p>
      </div>
      <div>
        <div style={{ paddingLeft: '20px', marginTop: '20px' }}>
          {values.map((item, index) => (
            <Chip size="small" onDelete={() => handleEmailDelete(item, index)} label={item} style={{ backgroundColor: '#747474', color: '#fff', marginRight: '10px' }} />
          ))}
        </div>
        <div className="grid-safety" style={{ padding: '20px' }}>
          <div className="item">
            <textarea
              value={emailData.text}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback"
              className="feedback-textbox"
              style={{ borderRadius: "10px", minHeight: "80px", width: "100%", resize: "vertical", marginTop: '10px', padding: '10px', background: '#fff', color: '#747474', borderColor: '#747474' }}
            />
          </div>
          <div className="item">
            <input
              value={currentValue}
              onChange={handleEmailChange}
              onKeyDown={handleKeyUp}
              placeholder="Enter email"
              type="email"
              name="to"
              className="email-input"
              style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474', borderColor: '#747474' }}
              inputProps={{ style: { backgroundColor: "#fff", color: '#747474', borderColor: '#747474' } }}
            />
          </div>
          <div className="item">
            <button onClick={sendEmail} className="send-email-button" style={{ borderRadius: "10px", height: "40px", marginTop: '10px' }}>
              Send feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
