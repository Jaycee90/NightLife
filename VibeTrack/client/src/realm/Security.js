import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import '../css/login.css';

const Security = () => {
  const [emailForm, setEmailForm] = useState({ // State to manage the emailForm input
    email: "",
  });

  // Retrieve the emailPasswordReset function from the UserContext
  const { emailPasswordReset } = useContext(UserContext);

  // Handle changes in the emailForm input fields
  const onEmailFormInputChange = (event) => {
    const { name, value } = event.target;
    setEmailForm({ ...emailForm, [name]: value });
  };

  // Handle the submission of the reset email emailForm
  const sendResetEmail = async () => {
    try {
      // Call the emailPasswordReset function with the provided email
      const user = await emailPasswordReset(emailForm.email);

      // If no user is returned, display an alert and do not proceed
      if (!user) {
        alert("Please provide an email address.");
        return;
      }

      // Display a success message and reset the emailForm
      alert("Password reset email sent successfully!");
      setEmailForm({ email: "" });
    } catch (error) {
      // Handle any errors that may occur during the process
      alert(error.message);
    }
  };
     // State to manage the passwordForm input (password, token, tokenId)
     const [passwordForm, setPasswordForm] = useState({ 
      password: "",
      token: "",
      tokenId: "" 
  });

  const { passwordReset } = useContext(UserContext);

  // Handler for passwordForm input changes
  const onPasswordFormInputChange = (event) => {
      const { name, value } = event.target;
      setPasswordForm({ ...passwordForm, [name]: value });
  };

  const resetPasswordWithToken = async () => {
      try {
          // URLSearchParams does not work as intended (returned null for token and tokenID). Will look into this again in the future.
          //const urlParams = new URLSearchParams(window.location.search);
          //const token = urlParams.get('token');
          //const tokenId = urlParams.get('tokenId');

          // Destructure passwordForm values (password, token, tokenId)
          const { token, tokenId, password } = passwordForm;

          // Validate that password, token, and tokenId are provided
          if (!password || !token || !tokenId) {
              alert("Please provide all required inpasswordFormation.");
              return;
          }

          // Call the passwordReset function with the provided values
          await passwordReset(token, tokenId, password);

          alert("Password reset successfully!");
      } catch (error) {
          // Modify the error message to include the password, token, and tokenId
          alert(`Error resetting password:\n\nPassword: ${passwordForm.password}\nToken: ${passwordForm.token}\nToken ID: ${passwordForm.tokenId}\n\n${error.message}`);
      }
  };

  return (
    <div class="login-component">
    <div class="container-fluid">
      <div class="card card-login">
        <div class="card-body">
          <div class="row justify-content-center"  style={{color:'#000'}}>
            <div class="col-lg-6 col-md-12">
              <div class="padding bg-primary text-center align-items-center d-flex" style={{  background:  'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 53%, rgba(226,100,172,1) 100%)'}}>
                <div class="w-100">
                  <div class="logo mb-4"><img src="https://i.imgur.com/1BNQ0NY.png" alt="kodinger logo" class="img-fluid"/> </div>
                  <h2 style={{color:'#fff'}} >Forgot your password?</h2>
                  <p class="lead text-light">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                  <form style={{display: "flex",flexDirection: "column",maxWidth: "300px",margin: "auto",color: "#000", borderColor:'#fff',}}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={emailForm.email}
                    onInput={onEmailFormInputChange}
                    inputProps={{
                      style: { background: '#fff', color: '#747474' },
                    }}
                    InputLabelProps={{ style: { borderColor: '#fff', color: '#747474'  } }}
                  />
                    <Button variant="contained"  style={{ backgroundColor: "#e24e99 ", borderRadius:'5px' }} onClick={sendResetEmail}>Send Reset Email</Button>
                  </form>
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
                <h2 >Reset password</h2>
                <p class="lead">Enter your new password along with the secret Token and TokenID!</p>
                <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", color:'#000', backgroundColor:"#fff"}}>
                    {/* Input field for the new password */}
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={passwordForm.password}
                        onChange={onPasswordFormInputChange}
                        inputProps={{style: { marginBottom: "1rem",background: '#fff', color: '#747474' },}}
                        InputLabelProps={{ style: { borderColor: '#fff', color: '#747474'} }}
                    />
                    {/* Input field for the token */}
                    <TextField
                        label="Token"
                        variant="outlined"
                        name="token"
                        value={passwordForm.token}
                        onChange={onPasswordFormInputChange}
                        inputProps={{ style: {marginBottom: "1rem", background: '#fff', color: '#747474' },}}
                        InputLabelProps={{ style: { borderColor: '#fff', color: '#747474'  } }}
                    />
                    {/* Input field for the token ID */}
                    <TextField
                        label="Token ID"
                        variant="outlined"
                        name="tokenId"
                        value={passwordForm.tokenId}
                        onChange={onPasswordFormInputChange}
                        inputProps={{style: {marginBottom: "1rem", background: '#fff', color: '#747474' },}}
                        InputLabelProps={{ style: { borderColor: '#fff', color: '#747474'  } }}
                    />
                    {/* Button to trigger the password reset */}
                    <Button variant="contained" color="primary" onClick={resetPasswordWithToken}  style={{ backgroundColor: "#e24e99 ", borderRadius:'5px' }}>
                        Reset Password
                    </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
