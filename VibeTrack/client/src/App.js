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
import Favorite from "./realm/Favorite";

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import UserList from "./components/userList";
import StarRating from "./components/starRating";
import Footer from './components/footer';

import Data from './routes/Data'; 
import Discover from './routes/Discover';
import Feature from './routes/Feature';
import Invitation from "./routes/Invitation";  
import Safety from './routes/Safety';
import Search from './routes/Search';
import TripFinder from './routes/Trip';
import SpecialEvent from './routes/Special';
import NotFound from './routes/NotFound';
import NetworkError from "./routes/NetworkError";
// eslint-disable-next-line
import Test from './routes/Test';
import Feedback from './routes/Feedback';
function App() {
  
 return (
   <BrowserRouter>
     <UserProvider>
     <Navbar />
       <Routes>
       <Route exact path="/" element={<Home />} />
            <Route exact path='/discover' element={<Discover />} />
            <Route exact path="/data/:id" element={<Data />} />
            <Route exact path='/specialevent' element={<SpecialEvent/>} />
            <Route exact path='/feature' element={<Feature/>} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/tripfinder' element={<TripFinder />} /> 
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/safety' element={<Safety />} />
            <Route exact path='/recordlist' element={<RecordList />} />
            <Route exact path="/edit/:id" element={<Edit />} />         
            <Route exact path="/create" element={<Create />} />
            <Route exact path='/invitation' element={<Invitation />} />
            <Route exact path='/rating/:id' element={<StarRating />} />  
            <Route exact path='*' element={<NotFound />} />    
            <Route exact path='/error' element={<NetworkError />} />  
            <Route exact path='/feedback' element={<Feedback />} />
            {/*<Route exact path='/test' element={<Test />} /> */}

            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route exact path='/profile/' element={<Profile />} />
                <Route exact path='/contact/' element={<Contact />} />
                <Route exact path='/userList' element={<UserList />} />
                <Route exact path='/favorite' element={<Favorite />} />
            </Route>
            <Route exact path='/security' element={<Security />} />
            <Route exact path='/reset' element={<Reset />} />
       </Routes>
      <Footer />
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;