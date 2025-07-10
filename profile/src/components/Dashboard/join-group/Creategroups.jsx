import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Creategroup.css";

const Creategroups = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({});
  const [media, setMedia] = useState([]);
  const [myPhotos, setMyPhotos] = useState([]);
  const [currentTab, setCurrentTab] = useState("my"); // "my" or "all"

  useEffect(() => {
    const storedGroups =
      JSON.parse(localStorage.getItem("createdGroups")) || [];
    const group = storedGroups.find((g) => g.id === Number(id));
    setGroupData(group || { name: "Group", photos: [] });
    setMedia(group?.photos || []);
  }, [id]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    // Convert files to base64 for preview and persistence
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((base64Files) => {
      const updatedPhotos = [...media, ...base64Files];
      const myNewPhotos = [...myPhotos, ...base64Files];

      setMedia(updatedPhotos);
      setMyPhotos(myNewPhotos);
      setGroupData((prev) => ({ ...prev, photos: updatedPhotos }));

      // Save to localStorage
      const storedGroups =
        JSON.parse(localStorage.getItem("createdGroups")) || [];
      const updatedGroups = storedGroups.map((g) =>
        g.id === Number(id) ? { ...g, photos: updatedPhotos } : g
      );
      localStorage.setItem("createdGroups", JSON.stringify(updatedGroups));
    });
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
            <img src="\images\dsd.jpg" alt="Photo1" />
            <img src="\images\dsd.jpg" alt="Photo2" />
          </div>
          <p className="no-photo-text">No Photos to show yet</p>
          <button className="see-photos-btn">See all photos</button>
        </div>
      ) : (
        <div className="uploaded-photos">
          {getDisplayedPhotos().map((base64, i) => (
            <img
              key={i}
              src={base64}
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
