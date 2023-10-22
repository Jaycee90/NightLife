import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/UserContext";
import Login from "./realm/Login";
import PrivateRoute from "./realm/Private";
import Signup from "./realm/Signup";

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import UserList from "./components/userList";
import Settings from "./components/settings";

import Discover from './routes/Discover';
import Data from './routes/Data'; 
import SpecialEvent from './routes/Special';
import Search from './routes/Search'; 

import Calendar from './routes/Calendar';
import Template from './routes/Template';
import Safety from './routes/Safety';
import Profile from './routes/Profile';
import Contact from './routes/Contact';

import Home from './routes/Home';
import SearchLink from "./components/link_search"; 

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
            <Route path='/calendar' element={<Calendar/>} />
            <Route path='/template' element={<Template/>} />
            <Route path='/search' element={<Search />} /> {/* Use the Search component here */}
            <Route path='/discover' element={<SearchLink />} />
            <Route path='/login' element={<Login />} />
            <Route path='/safety' element={<Safety />} />
            <Route path='/recordlist' element={<RecordList />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
                <Route path='/profile/:user' element={<Profile />} />
                <Route path='/contact/:user' element={<Contact />} />
                <Route path='/userList' element={<UserList />} />
                <Route path="/settings/:user" element={<Settings />} />
            </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;