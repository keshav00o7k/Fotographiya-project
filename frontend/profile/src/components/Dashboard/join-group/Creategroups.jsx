import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Creategroup.css";

const Creategroups = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({});
  const [media, setMedia] = useState([]);
  const [myPhotos, setMyPhotos] = useState([]);
  const [currentTab, setCurrentTab] = useState("my");

  // Fetch group data from backend
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/groups/${id}`);
        const data = await res.json();
        setGroupData(data);
        setMedia(data.media || []);
      } catch (err) {
        console.error("Failed to fetch group", err);
      }
    };

    fetchGroup();
  }, [id]);

  // Upload image file using FormData
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newUploads = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          `http://localhost:5000/api/groups/${id}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();
        if (result.media) {
          newUploads.push(result.media);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    setMedia((prev) => [...prev, ...newUploads]);
    setMyPhotos((prev) => [...prev, ...newUploads]);
  };

  const getDisplayedPhotos = () => {
    return currentTab === "my" ? myPhotos : media;
  };

  return (
    <div className="group-container">
      <header className="group-header">
        <h1 className="group-name">
          {groupData?.name || "Group"} <span>{media?.length || 0} Photos</span>
        </h1>
        <div className="header-icons">
          <button className="icon-btn">⚙️</button>
          <button className="icon-btn">🔗</button>
          <button className="icon-btn">⬇️</button>
        </div>
      </header>

      <nav className="group-tabs">
        <span
          className={currentTab === "my" ? "active-tab" : ""}
          onClick={() => setCurrentTab("my")}
        >
          My Photos
        </span>
        <span
          className={currentTab === "all" ? "active-tab" : ""}
          onClick={() => setCurrentTab("all")}
        >
          All Photos
        </span>
        <span
          className={currentTab === "Highlights" ? "active-tab" : ""}
          onClick={() => setCurrentTab("Highlights")}
        >
          Highlights
        </span>
      </nav>

      {getDisplayedPhotos().length === 0 ? (
        <div className="empty-group">
          <div className="hanging-photos">
            <img src="/images/dsd.jpg" alt="Photo1" />
            <img src="/images/dsd.jpg" alt="Photo2" />
          </div>
          <p className="no-photo-text">No Photos to show yet</p>
          <button className="see-photos-btn">See all photos</button>
        </div>
      ) : (
        <div className="uploaded-photos">
          {getDisplayedPhotos().map((mediaObj, i) => (
            <img
              key={i}
              src={`http://localhost:5000${mediaObj.fileData}`}
              alt={`uploaded-${i}`}
              className="uploaded-img"
            />
          ))}
        </div>
      )}

      <label className="upload-button">
        <input type="file" multiple hidden onChange={handleUpload} />⬆ Upload
      </label>
    </div>
  );
};

export default Creategroups;
