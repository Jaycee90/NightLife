import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Security = () => {
  const [form, setForm] = useState({ // State to manage the form input
    email: "",
  });

  // Retrieve the emailPasswordReset function from the UserContext
  const { emailPasswordReset } = useContext(UserContext);

  // Handle changes in the form input fields
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Handle the submission of the reset email form
  const sendResetEmail = async () => {
    try {
      // Call the emailPasswordReset function with the provided email
      const user = await emailPasswordReset(form.email);

      // If no user is returned, display an alert and do not proceed
      if (!user) {
        alert("Please provide an email address.");
        return;
      }

      // Display a success message and reset the form
      alert("Password reset email sent successfully!");
      setForm({ email: "" });
    } catch (error) {
      // Handle any errors that may occur during the process
      alert(error.message);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
        color: "#000",
        backgroundColor: "#fff"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Reset Password</h1>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        name="email"
        value={form.email}
        onInput={onFormInputChange}
        style={{ marginBottom: "1rem", backgroundColor: "#fff", color: '#000' }}
        inputProps={{ style: { backgroundColor: "#fff", color: '#000' } }}
      />
      <Button variant="contained" color="primary" onClick={sendResetEmail}>
        Send Reset Email
      </Button>
    </form>
  );
};

export default Security;
