import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/UserContext";

import Home from './routes/Home';

import Signup from "./realm/Signup";
import Login from "./realm/Login";
import PrivateRoute from "./realm/Private";
import Security from "./realm/Security";
import Reset from "./realm/Reset";
import Profile from './realm/Profile';
import Contact from './realm/Contact';

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import UserList from "./components/userList";
import StarRating from "./components/starRating";
import Footer from './components/footer';

import Data from './routes/Data'; 
import Discover from './routes/Discover';
import Favorites from "./routes/Favorite";
import Feature from './routes/Feature';
import Invitation from "./routes/Invitation";  
import Safety from './routes/Safety';
import Search from './routes/Search';
import TripFinder from './routes/Trip';
import SpecialEvent from './routes/Special';

function App() {
 return (
   <BrowserRouter>
     <UserProvider>
     <Navbar />
       <Routes>
       <Route exact path="/" element={<Home />} />
            <Route path='/discover' element={<Discover />} />
            <Route path="/data/:id" element={<Data />} />
            <Route path='/specialevent' element={<SpecialEvent/>} />
            <Route path='/feature' element={<Feature/>} />
            <Route path='/search' element={<Search />} />
            <Route path='/tripfinder' element={<TripFinder />} /> 
            <Route path='/login' element={<Login />} />
            <Route path='/safety' element={<Safety />} />
            <Route path='/recordlist' element={<RecordList />} />
            <Route path="/edit/:id" element={<Edit />} />         
            <Route path='/favorites' element={<Favorites/>} />
            <Route path="/create" element={<Create />} />
            <Route path='/invitation' element={<Invitation />} />
            <Route path='/rating/:id' element={<StarRating />} />  

            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path='/profile/' element={<Profile />} />
                <Route path='/contact/' element={<Contact />} />
                <Route path='/userList' element={<UserList />} />
            </Route>
            <Route path='/security' element={<Security />} />
            <Route path='/reset' element={<Reset />} />
       </Routes>
      <Footer />
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;