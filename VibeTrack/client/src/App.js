import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/UserContext";
import Home from "./realm/Homepage";
import Login from "./realm/Login";
import PrivateRoute from "./realm/Private";
import Signup from "./realm/Signup";

function App() {
 return (
   <BrowserRouter>
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;