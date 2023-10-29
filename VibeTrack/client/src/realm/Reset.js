import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Reset = () => {
    const [form, setForm] = useState({ // State to manage the form input
    password: "",
    });
    
    const { passwordReset } = useContext(UserContext); // Destructuring and accessing the signup function from the context

    // Handle changes in the form input fields
    const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    };
};

export default Reset;