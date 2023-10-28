import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext"; // Import the app instance
import '../css/login.css';

const Security = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const { emailPasswordReset } = useContext(UserContext);

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const sendResetEmail = async () => {
    try {
      const user = await emailPasswordReset(form.email);
      if (!user) {
        alert("Please provide an email address.");
        return;
      }


      alert("Password reset email sent successfully!");
      setForm({ email: "" });
    } catch (error) {
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
