import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Reset = () => {
    const [form, setForm] = useState({ 
        password: "",
        token: "", // New input field for token
        tokenId: "" // New input field for tokenId
    });

    const { passwordReset } = useContext(UserContext);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const resetPasswordWithToken = async () => {
        //const urlParams = new URLSearchParams(window.location.search);
        //const token = urlParams.get('token');
        //const tokenId = urlParams.get('tokenId');

        try {
            const { password, token, tokenId } = form; // Destructure form values

            // Validate that password, token, and tokenId are provided
            if (!password || !token || !tokenId) {
                alert("Please provide all required information.");
                return;
            }

            await passwordReset(form.password, form.token, form.tokenId);

            alert("Password reset successfully!");
        } catch (error) {
            alert(`Error resetting password:\n\nPassword: ${form.password}\nToken: ${form.token}\nToken ID: ${form.tokenId}\n\n${error.message}`);
        }
    };

    return (
        <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
            <h1 style={{marginBottom:"10px"}}>Reset Password</h1>
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
            <TextField
                label="Token"
                variant="outlined"
                name="token"
                value={form.token}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
                inputProps={{ style: { backgroundColor: "#fff", color: "#000"} }}
            />
            <TextField
                label="Token ID"
                variant="outlined"
                name="tokenId"
                value={form.tokenId}
                onChange={onFormInputChange}
                style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
                inputProps={{ style: { backgroundColor: "#fff", color: "#000" } }}
            />
            <Button variant="contained" color="primary" onClick={resetPasswordWithToken}>
                Reset Password
            </Button>
        </form>
    );
};

export default Reset;
