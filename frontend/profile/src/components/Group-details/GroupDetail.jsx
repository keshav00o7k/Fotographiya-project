import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GroupDetail.css";
import GroupHeader from "./GroupHeader";
import GroupTabs from "./GroupTabs";
import PhotosDisplay from "./PhotosDisplay";

const GroupDetail = () => {
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
      <GroupHeader
        groupData={groupData}
        mediaCount={media?.length || 0}
        onUpload={handleUpload}
      />
      <GroupTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <PhotosDisplay
        photos={getDisplayedPhotos()}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default GroupDetail;
