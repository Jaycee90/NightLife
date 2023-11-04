import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; //Link Link' is defined but never used
import { UserContext } from "./UserContext"; // Import the app instance
import '../css/login.css';
 
const Login = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 // Retrieve user, fetchUser, and emailPasswordLogin functions from UserContext
 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
 
 // State to manage form input
 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // Handle changes in form input fields
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 // Redirect user to a specified location (default to home)
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // Load user data if user is not already logged in
 const loadUser = async () => {
   if (!user) {
     const fetchedUser = await fetchUser();
     if (fetchedUser) {
       redirectNow();
     }
   }
 }
 
 // Load user data on component mount
 useEffect(() => {
   loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 
 // Handle form submission for login
 const onSubmit = async (event) => {
   try {
     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
   }
 };
 
 return (
  <div class="login-component">
    <div class="card card-login">
      <div class="card-body">
        <div class="row justify-content-center"  style={{color:'#000'}}>
          <div class="col-lg-6 col-md-12">
            <div class="padding bg-primary text-center align-items-center d-flex">
              <div class="w-100">
                <div class="logo mb-4">
                  <img src="https://i.imgur.com/1BNQ0NY.png" alt="kodinger logo" class="img-fluid"/>
                </div>
                <h4 class="text-light mb-2">Don't waste your time</h4>
                <p class="lead text-light">Login quickly with Google one-tap sign-in.</p>
                <button class="btn btn-block btn-icon btn-icon-google mb-3" style={{color:'#000'}}>
                  Login with Google
                </button>
              </div>

              <div class="help-links" >
                <ul>
                  <li><a href="/test">Terms of Service &nbsp; </a></li>
                  <li><a href="/test">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="padding">
              <h2>Login</h2>
              <p class="lead">Before you get started, you must login or register if you don't already have an account.</p>
              <form style={{ display: "flex", flexDirection: "column", margin: "auto",  color:'#000', backgroundColor:"#fff"}}>
                <div class="form-group">
                      <TextField
                          label="Email"
                          type="email"
                          variant="outlined"
                          name="email"
                          value={form.email}
                          onChange={onFormInputChange}
                          tabindex="1"
                          style={{ marginBottom: "1rem", backgroundColor:"#fff" }}
                          inputProps={{ style: { backgroundColor: "#fff" } }}
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
                    <div class="float-left"><a href="/signup">Create an account?</a></div>
                    <div class="float-right"><a href="/security">Forgot Password?</a>
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={onSubmit}  tabindex="3">Login</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
 );
}

export default Login;
