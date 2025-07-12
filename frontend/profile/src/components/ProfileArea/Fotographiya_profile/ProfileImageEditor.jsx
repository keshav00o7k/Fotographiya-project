import React, { useRef } from "react";

const ProfileImageEditor = ({ profileImage, setProfileImage }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileImage(newImageURL);
    }
  };

  return (
    <div className="Sefie-1 d">
      <div className="d a">
        <img src={profileImage} alt="avatar" />
        <p>Selfie</p>
      </div>

      <button type="button" onClick={handleButtonClick}>
        <img src="./images/pencil.png" alt="edit" />
        <span>Edit Photo</span>
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfileImageEditor;
