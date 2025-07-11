import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import OtpVerification from "./components/auth/Otp_verification";
import SelfieCapture from "./components/auth/SelfieCapture";
import UserSelection from "./components/auth/Userselection";
import './App.css';
import Dashboard from './components/Dashboard';
import GroupjoinPage from "./components/group_joing/GroupjoinPage";


function App() {

  return (<>

    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/group-join" element={<GroupjoinPage />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/user-selection" element={<UserSelection />} />
      <Route path="/selfie" element={<SelfieCapture />} />
    </Routes>
    </>
  );
}

export default App;
