import React, { useState } from "react";
import "./Fotographiya_Profile.css";

// Components
import ProfileHeader from "./ProfileHeader";
import ProfileImageEditor from "./ProfileImageEditor";
import BasicInfoForm from "./BasicInfoForm";
import HighResToggle from "./HighResToggle";
import DownloadOriginalToggle from "./DownloadOriginalToggle";
import StorageBox from "./StorageBox";
import SubscriptionBox from "./SubscriptionBox";
import PopupHighRes from "./PopupHighRes";
import PopupDownloadOriginal from "./PopupDownloadOriginal";
import PopupAdditionalInfo from "./PopupAdditionalInfo";

const Fotographiya_Profile = ({ profileImage, setProfileImage }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showHighResPopup, setShowHighResPopup] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showAdditionalInfoPopup, setShowAdditionalInfoPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Keshav",
    lastName: "Goyal",
    email: "goyalkeshav316@gmail.com",
    phone: "",
    password: "********",
    highResUpload: false,
    downloadOriginal: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "highResUpload" && checked) {
      setShowHighResPopup(true);
      return;
    }

    if (name === "downloadOriginal" && checked) {
      setShowDownloadPopup(true);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Profile Saved ✅");
  };

  return (
    <>
      <div className="Profile-main" style={{ display: "flex" }}>
        <div className="Prof-ont">
          <ProfileHeader onSave={handleSubmit} />

          <form className="profile-form-row" onSubmit={handleSubmit}>
            <div className="form-left">
              <ProfileImageEditor
                profileImage={profileImage}
                setProfileImage={setProfileImage}
              />
              <div className="dropdown-divider mt-4 mb-0"></div>
              <BasicInfoForm formData={formData} handleChange={handleChange} />
            </div>

            <div className="form-right">
              <HighResToggle
                isChecked={formData.highResUpload}
                handleChange={handleChange}
              />

              <DownloadOriginalToggle
                isExpanded={showMoreOptions}
                toggleExpanded={() => setShowMoreOptions(!showMoreOptions)}
                isChecked={formData.downloadOriginal}
                handleChange={handleChange}
              />

              <div className="dropdown-divider mt-4 mb-0"></div>

              <StorageBox
                onAdditionalInfoClick={() => setShowAdditionalInfoPopup(true)}
              />
              <SubscriptionBox />
            </div>
          </form>
        </div>
      </div>

      {showHighResPopup && (
        <PopupHighRes
          onConfirm={() => {
            setFormData((prev) => ({ ...prev, highResUpload: true }));
            setShowHighResPopup(false);
          }}
          onCancel={() => setShowHighResPopup(false)}
        />
      )}

      {showDownloadPopup && (
        <PopupDownloadOriginal
          onConfirm={() => {
            setFormData((prev) => ({ ...prev, downloadOriginal: true }));
            setShowDownloadPopup(false);
          }}
          onCancel={() => setShowDownloadPopup(false)}
        />
      )}

      {showAdditionalInfoPopup && (
        <PopupAdditionalInfo
          onClose={() => setShowAdditionalInfoPopup(false)}
        />
      )}
    </>
  );
};

export default Fotographiya_Profile;
