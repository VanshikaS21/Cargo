import React from "react";
import Homepage from "./components/Homepage";
import PNF from "./components/PNF";
import RegisterBox from "./components/RegisterBox";
import LoginBox from "./components/LoginBox";
import SuperUser from "./components/superuser";
import Profile from "./components/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
          <div className="App bg-yellow-100 w-full h-screen" >
            <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterBox />} />
          <Route path="/login" element={<LoginBox />} />
          <Route path="/superuser" element={<SuperUser />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<PNF />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
