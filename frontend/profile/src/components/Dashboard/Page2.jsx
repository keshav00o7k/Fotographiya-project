import "./page2.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("personal");
  const [groups, setGroups] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/groups/all")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setStep(1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGroupName("");
    setStep(1);
  };

  const handleNext = () => {
    if (groupName.trim() === "") return alert("Enter group name");
    setStep(2);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName, privacy: selectedPrivacy }),
      });
      const data = await res.json();
      setGroups((prev) => [...prev, data]);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Error creating group.");
    }
  };

  const handleJoinClick = () => {
    setShowJoinModal(true);
    setCode(["", "", "", "", "", ""]);
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleJoinGroup = () => {
    const joinedCode = code.join("");
    if (joinedCode.length !== 6)
      return alert("Please enter a valid 6-digit code");
    console.log("Joining with code:", joinedCode);
    setShowJoinModal(false);
  };

  return (
    <>
      <div className="page2">
        <div className="back">
          <div className="text">
            <h1>Groups</h1>
            <div className="right-text">
              <img
                src="/images/search.png"
                alt="searchlogo"
                className="sarchlogo"
              />
              <button className="botton1" onClick={handleJoinClick}>
                Join A Group
              </button>
              <button className="botton2" onClick={handleOpenModal}>
                Create a Group
              </button>
            </div>
          </div>

          <div className="group-list">
            {groups.map((group) => (
              <div
                key={group._id}
                className="group-card"
                onClick={() => navigate(`/group/${group._id}`)}
              >
                <div className="group-thumbnail">
                  <img src="/images/group-icon.png" alt="group-icon" />
                </div>
                <div className="group-info">
                  <span className="group-title">
                    {group.name}
                    {group.privacy === "personal" && (
                      <span className="lock-icon">🔒</span>
                    )}
                  </span>
                  <span className="group-photos-count">
                    {group.media?.length || 0} Photos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            {step === 1 ? (
              <>
                <h2>Group Name</h2>
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button className="next-btn" onClick={handleNext}>
                  Next
                </button>
                <p>Step 1 of 2</p>
              </>
            ) : (
              <>
                <h2>Select Privacy Settings</h2>
                <div className="privacy-option-container">
                  <div
                    className={`privacy-option ${
                      selectedPrivacy === "personal" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedPrivacy("personal")}
                  >
                    <h4>Small Personal Group</h4>
                    <p>✅ Face recognition</p>
                    <p>✅ View all other photos and folders</p>
                  </div>
                  <div
                    className={`privacy-option ${
                      selectedPrivacy === "public" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedPrivacy("public")}
                  >
                    <h4>Big Public Group</h4>
                    <p>✅ Face recognition</p>
                    <p>
                      ⚠️ Admin can choose members who have all photos access
                    </p>
                  </div>
                </div>
                <button className="next-btn" onClick={handleCreateGroup}>
                  Create Group
                </button>
                <p>Step 2 of 2</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div className="modal-overlay">
          <div className="modal-content join-code-modal">
            <span className="close-btn" onClick={() => setShowJoinModal(false)}>
              &times;
            </span>
            <h2>Enter Event Code</h2>
            <p>Enter the 6-digit code to join the group</p>
            <div className="code-inputs">
              {code.map((value, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleCodeChange(e, idx)}
                />
              ))}
            </div>
            <button className="next-btn" onClick={handleJoinGroup}>
              Join Group
            </button>
            <p>You can also join via shared link</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page2;
