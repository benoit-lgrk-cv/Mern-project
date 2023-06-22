import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/user/Register";
import SignIn from "./pages/user/SignIn";
import Home from "./pages/Home";
import Profil from "./pages/user/Profil";
import Logout from "./pages/user/Logout";
import CreateAlert from "./pages/alert/Create.Alert";
import UpdateProfil from "./pages/user/Update.Profil";
import MyAlerts from "./pages/alert/MyAlerts";
import UpdateAlert from "./pages/alert/UpdateAlert";
import Comment from "./pages/alert/Comment";
import "./style/app.css";

const App = () => {
  return (
    
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts/:id" element={<MyAlerts />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile/:_id" element={<Profil />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create/:_id" element={<CreateAlert />} />
        <Route path="/updateprofile/:_id" element={<UpdateProfil />} />
        <Route path="/update/:id" element={<UpdateAlert/>} />
        <Route path="/comment/:id" element={<Comment/>} />

      </Routes>
    </div>
  );
};

export default App;
