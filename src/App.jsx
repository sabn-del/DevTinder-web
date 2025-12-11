

import Body from "./components/Body";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import "./App.css"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat  from "./components/Chat";
import Premium from "./components/Premium";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {
  
  return (
    <>


   <Provider store={appStore}>
  <Router basename="/">
    <Routes>

      {/* Redirect "/" → "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected pages inside Body layout */}
      <Route path="/" element={<Body />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
        <Route path="/premium" element={<Premium />} />
      </Route>
    </Routes>
  </Router>
</Provider>

    </>
  )
}

export default App
