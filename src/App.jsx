

import Body from "./components/Body";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat  from "./components/Chat";
import Premium from "./components/Premium"
function App() {
  
  return (
    <>


   
    <Router>
      <Routes>
        <Route path="/" element={<Body />}>
         <Route path="/" element={<Feed />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
           <Route path="/connections" element={<Connections />} />
             <Route path="/requests" element={<Requests />} />
               <Route path="/chat/:targetUserId" element={<Chat />} />
                 <Route path="/premium" element={<Premium />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
