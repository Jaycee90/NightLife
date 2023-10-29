import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Reset = () => {
    // State to manage the form input
    const [form, setForm] = useState({ 
        password: "",
    });

    // Accessing the passwordReset function from the context
    const { passwordReset } = useContext(UserContext);

    // Handler for form input changes
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // Function to reset password with the provided token and tokenId
    const resetPasswordWithToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const tokenId = urlParams.get('tokenId');

        try {
            // Call the passwordReset function with the provided password, token, and tokenId
            await passwordReset(form.password, token, tokenId);

            // Display a success message
            alert("Password reset successfully!");
        } catch (error) {
            // Handle any errors that may occur during the process
            alert(error.message);
        }
    };

    return (
        <form>
            <h1>Reset Password</h1>
            {/* Input field for the new password */}
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                name="password"
                value={form.password}
                onChange={onFormInputChange}
            />
            {/* Button to trigger the password reset */}
            <Button variant="contained" color="primary" onClick={resetPasswordWithToken}>
                Reset Password
            </Button>
        </form>
    );
};

export default Reset;
