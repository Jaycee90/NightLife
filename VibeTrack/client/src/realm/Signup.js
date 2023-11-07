import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import '../css/login.css';
 
const Signup = () => {
 const navigate = useNavigate(); // Hook for navigating between routes
 const location = useLocation(); // Hook for getting the current location
 
 const { emailPasswordSignup } = useContext(UserContext); // Get acess to the signup function from the context
 const [form, setForm] = useState({  // State to manage form input
   email: "",
   password: "",
   name: "", 
   lastName: ""  
 });

 // Handle changes in form input fields
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value }); 
 };
 
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/login"); 
 }

 const onSubmit = async () => { // Handle form submission for login
   try {
     const user = await emailPasswordSignup(form.email, form.password); // Call the signup function
     if (user) {
        // alert(`Your user ID is: ${user.id}. Keep this with you.`);
        redirectNow();
     }
   } catch (error) {
     alert(error); 
   }
 };
 
 return (
  <div class="login-component"  style={{marginTop:"20px", marginBottom:'30px'}}>
  <div class="container-fluid">
    <div class="card card-login">
      <div class="card-body">
        <div class="row justify-content-center"  style={{color:'#000'}}>
          <div class="col-lg-6 col-md-12">
            <div class="padding">
              <h2>Signup</h2>
              <p class="lead">Before you get started, you must login or register if you don't already have an account.</p>
              <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", borderColor:'#747474', color:'#000', backgroundColor:"#fff"}}>
                <div class="form-group">
                  <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      name="email"
                      value={form.email}
                      onChange={onFormInputChange}
                      tabindex="1"
                  />
                </div>
                <div class="form-group">
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={form.password}
                    onChange={onFormInputChange}
                    style={{ marginBottom: "1rem", backgroundColor:"#fff" }}
                    inputProps={{ style: { backgroundColor: "#fff" } }}
                    tabindex="2"
                />
                <div class="float-left"><a href="/login">Already have an acocunt? Login</a></div>
                </div>
                <Button variant="contained" color="primary" onClick={onSubmit}  tabindex="3" style={{ backgroundColor: "#e24e99 ", borderRadius:'5px' }}>Signup</Button>
              </form>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="padding bg-primary text-center align-items-center d-flex" style={{  background:  'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 53%, rgba(226,100,172,1) 100%)'}}>
              <div class="w-100">
                <div class="logo mb-4">
                  <img src="https://i.imgur.com/vyOLo4O.png" alt="kodinger logo" class="img-fluid"/>
                </div>
                <h4 class="text-light mb-2">Don't waste your time</h4>
                <p class="lead text-light">Create an account quickly with a single click.</p>
                <button class="btn btn-block btn-icon btn-icon-google mb-3" style={{color:'#000'}}>Sign-up with Google</button>
                <p class="lead text-light">- or -</p>
                <button class="btn btn-block btn-icon btn-icon-facebook mb-3" style={{color:'#000'}}>Sign-up with Facebook</button>
              </div>

              <div class="help-links" >
                <ul>
                  <li><a href="/test">Terms of Service &nbsp; </a></li>
                  <li><a href="/test">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
 );
}
 
export default Signup;
