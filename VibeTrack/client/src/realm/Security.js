import { Button, TextField } from "@mui/material";
import { useState } from "react";
import '../css/login.css';
import { app } from "./UserContext"; // Import the app instance

const Security = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const changePassword = async () => {
    try {
      if (!form.currentPassword || !form.newPassword) {
        alert("Please provide both current and new passwords.");
        return;
      }

      await app.currentUser.changePassword(form.currentPassword, form.newPassword);

      alert("Password changed successfully!");
      setForm({ currentPassword: "", newPassword: "" });
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
      <h1 style={{ marginBottom: "10px" }}>Change Password</h1>
      <TextField
        label="Current Password"
        type="password"
        variant="outlined"
        name="currentPassword"
        value={form.currentPassword}
        onInput={onFormInputChange}
        style={{ marginBottom: "1rem", backgroundColor: "#fff", color: '#000' }}
        inputProps={{ style: { backgroundColor: "#fff", color: '#000' } }}
      />
      <TextField
        label="New Password"
        type="password"
        variant="outlined"
        name="newPassword"
        value={form.newPassword}
        onInput={onFormInputChange}
        style={{ marginBottom: "1rem", backgroundColor: "#fff", color: '#000' }}
        inputProps={{ style: { backgroundColor: "#fff", color: '#000' } }}
      />
      <Button variant="contained" color="primary" onClick={changePassword}>
        Change Password
      </Button>
    </form>
  );
};

export default Security;
