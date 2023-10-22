import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/user.context";
import Home from "./realm/Home.page";
import Login from "./realm/Login.page";
import PrivateRoute from "./realm/PrivateRoute.page";
import Signup from "./realm/Signup.page";


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