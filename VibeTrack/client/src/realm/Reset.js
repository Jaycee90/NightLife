import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Reset = () => {
    const [form, setForm] = useState({ 
        password: "",
    });

    const { resetPassword } = useContext(UserContext);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const resetPasswordWithToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const tokenId = urlParams.get('tokenId');

        try {
            await resetPassword(form.password, token, tokenId);
            alert("Password reset successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form>
            <h1>Reset Password</h1>
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                name="password"
                value={form.password}
                onChange={onFormInputChange}
            />
            <Button variant="contained" color="primary" onClick={resetPasswordWithToken}>
                Reset Password
            </Button>
        </form>
    );
};

export default Reset;
