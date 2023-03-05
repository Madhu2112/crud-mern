import Login from "./components/Login";
import "./App.css";
import Register from "./components/Register";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import UserInfo from "./components/Users";
import Update from "./components/Udpate";
import Delete from "./components/Delete";
function App() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <Router>
      <Routes>
        <Route path="/" element={(<><Homepage /></>)} />

        <Route path="/register" element={<><Register /></>} />
        <Route path="/allUsers" element={<><UserInfo /></>} />
        <Route path="/update/:id" element={<><Update /></>} />

      </Routes>
    </Router>
  );
}

export default App;
//<Route path="/login" element={<><Login setLoginUser={setLoginUser} /></>} />
//<Route path="/delete/:id" element={<><Delete /></>} />