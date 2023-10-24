import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import '../css/login.css';
 
const Signup = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 const { emailPasswordSignup } = useContext(UserContext);
 const [form, setForm] = useState({
   email: "",
   password: "",
   name: "", // New field for first name
   lastName: ""   // New field for last name
 });
 
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(form.email, form.password, form.name, form.lastName);
     if (user) {
       redirectNow();
     }
   } catch (error) {
     alert(error);
   }
 };
 
 return (
   <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
     <h1 style={{marginBottom:"10px"}}>Signup</h1>
     <TextField
       label="First Name"
       variant="outlined"
       name="name"
       value={form.name}
       onInput={onFormInputChange}
       style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
       inputProps={{ style: { backgroundColor: "#fff", color:'#000'} }}
     />
     <TextField
       label="Last Name"
       variant="outlined"
       name="lastName"
       value={form.lastName}
       onInput={onFormInputChange}
       style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
       inputProps={{ style: { backgroundColor: "#fff", color:'#000'} }}
     />
     <TextField
       label="Email"
       type="email"
       variant="outlined"
       name="email"
       value={form.email}
       onInput={onFormInputChange}
       style={{ marginBottom: "1rem", backgroundColor:"#fff", color:'#000'}}
       inputProps={{ style: { backgroundColor: "#fff", color:'#000'} }}
     />
     <TextField
       label="Password"
       type="password"
       variant="outlined"
       name="password"
       value={form.password}
       onInput={onFormInputChange}
       style={{ marginBottom: "1rem", backgroundColor:"#fff"}}
       inputProps={{ style: { backgroundColor: "#fff" } }}
     />
     <Button variant="contained" color="primary" onClick={onSubmit}>
       Signup
     </Button>
     <p style={{color:"#000", marginTop:"10px", display: "flex", alignItems: "center"}}>
       Have an account already? <Link to="/login" style={{ marginLeft: "5px" }}>Login</Link>
     </p>
   </form>
 );
}
 
export default Signup;
