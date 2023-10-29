import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Reset = () => {
    // State to manage the form input (password, token, tokenId)
    const [form, setForm] = useState({ 
        password: "",
        token: "", // New input field for token
        tokenId: "" // New input field for tokenId
    });

    const { passwordReset } = useContext(UserContext);

    // Handler for form input changes
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const resetPasswordWithToken = async () => {
        try {
            // URLSearchParams does not work as intended (returned null for token and tokenID). Will look into this again in the future.
            //const urlParams = new URLSearchParams(window.location.search);
            //const token = urlParams.get('token');
            //const tokenId = urlParams.get('tokenId');

            // Destructure form values (password, token, tokenId)
            const { token, tokenId, password } = form;

            // Validate that password, token, and tokenId are provided
            if (!password || !token || !tokenId) {
                alert("Please provide all required information.");
                return;
            }

            // Call the passwordReset function with the provided values
            await passwordReset(token, tokenId, password);

            alert("Password reset successfully!");
        } catch (error) {
            // Modify the error message to include the password, token, and tokenId
            alert(`Error resetting password:\n\nPassword: ${form.password}\nToken: ${form.token}\nToken ID: ${form.tokenId}\n\n${error.message}`);
        }
    };

    return (
        <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
            <h1 style={{marginBottom:"10px"}}>Reset Password</h1>
            {/* Input field for the new password */}
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                name="password"
                value={form.password}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
                inputProps={{ style: { backgroundColor: "#fff" } }}
            />
            {/* Input field for the token */}
            <TextField
                label="Token"
                variant="outlined"
                name="token"
                value={form.token}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
                inputProps={{ style: { backgroundColor: "#fff", color: "#000"} }}
            />
            {/* Input field for the token ID */}
            <TextField
                label="Token ID"
                variant="outlined"
                name="tokenId"
                value={form.tokenId}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
                inputProps={{ style: { backgroundColor: "#fff", color: "#000" } }}
            />
            {/* Button to trigger the password reset */}
            <Button variant="contained" color="primary" onClick={resetPasswordWithToken}>
                Reset Password
            </Button>
        </form>
    );
};

export default Reset;
