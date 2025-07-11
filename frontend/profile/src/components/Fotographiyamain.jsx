import React, { useState } from "react";
import Profile1page from "./ProfileArea/ProfileLeftSide";
import Fotographiya_Profile from "./ProfileArea/Fotographiya_Profile";
import Fotographiya_Wallet from "./ProfileArea/Fotographiya_wallet";
import Navbar from "./Navbar";
import "./Fotographiyamain.css";
// import TransactionHistory from "./Dashbord_component/TransactionHistory";

const Fotographiya_Main = ({ profileImage, setProfileImage }) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <div className="maindiv" style={{ display: "flex" }}>
        <Profile1page
          activeIndex={activeSection}
          onSectionChange={(index) => setActiveSection(index)}
        />

        {activeSection === 0 && (
          <Fotographiya_Profile
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        )}
        {activeSection === 1 && <Fotographiya_Wallet />}
        {activeSection === 2 && <TransactionHistory />}
      </div>
    </>
  );
};

export default Fotographiya_Main;
