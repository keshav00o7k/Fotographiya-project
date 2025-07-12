import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page2 from "./components/Dashboard/Page2";
import Fotographiya_Main from "./components/Fotographiyamain.jsx";
import Navbar from "./components/Navbar.jsx";
import Creategroups from "./components/Dashboard/join-group/Creategroups";

function App() {
  const [profileImage, setProfileImage] = useState("./images/pte.jpg");

  return (
    <>
      <Navbar profileImage={profileImage} />
      <Routes>
        <Route path="/" element={<Page2 />} />
        <Route
          path="/profile-setting"
          element={
            <Fotographiya_Main
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          }
        />
        <Route path="/group/:id" element={<Creategroups />} />
      </Routes>
    </>
  );
}

export default App;
