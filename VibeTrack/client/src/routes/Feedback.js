import React, { useState } from 'react';
import { Chip } from "@material-ui/core";

function Feedback() {
  const [emailData, setEmailData] = useState({
    to: 'vibetracktxt@gmail.com',
    subject: 'Receipt: Feedback for VibeTrack',
    text: '',
  });

  const [values, setValues] = useState(["vibetracktxt@gmail.com"]);
  const [currentValue, setCurrentValue] = useState("");
  const [userName, setUserName] = useState(""); // New state for user's name

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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setEmailData({
      ...emailData,
      text: e.target.value,
    });
  };

  const handleEmailDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  const sendEmail = () => {
    // Concatenate the user's name with emailData.text before sending
    const emailTextWithUserName = `${emailData.text}\n\nName: ${userName}`;

    // Removed the part related to selected venues
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        text: emailTextWithUserName,
      }),
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
        <h1 className="intro-title">Send us your feedback!</h1>
        <p className="intro-description">Here at VibeTrack, we value your feedback!</p>
        <p className="intro-description">Please let us know your thoughts so that we can improve our customer experience here.</p>
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
              placeholder="Tell us how we can improve"
              className="feedback-textbox"
              style={{ borderRadius: "10px", fontSize:'15px', minHeight: "100px", width: "100%", resize: "vertical", marginTop: '10px', padding: '10px', background: '#fff', color: '#747474', borderColor: '#747474' }}
            />
          </div>
          <div className="item">
            <input
              value={currentValue}
              onChange={handleEmailChange}
              onKeyDown={handleKeyUp}
              placeholder="Enter email for receipt"
              type="email"
              name="to"
              className="email-input"
              style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474', borderColor: '#747474' }}
              inputProps={{ style: { backgroundColor: "#fff", color: '#747474', borderColor: '#747474' } }}
            />
            <input
              value={userName}
              onChange={handleUserNameChange}
              placeholder="Enter your name"
              type="text"
              name="name"
              className="email-input"
              style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474', borderColor: '#747474' }}
              inputProps={{ style: { backgroundColor: "#fff", color: '#747474', borderColor: '#747474' } }}
            />
          </div>
          <div className="item">
            <button onClick={sendEmail} className="send-email-button" style={{ borderRadius: "10px", height: "40px", marginTop: '10px', backgroundColor:'#e24e99' }}>
              Submit your feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
