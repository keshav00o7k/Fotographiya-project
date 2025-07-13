import { useState } from "react";

const CreateGroupModal = ({ showModal, onClose, onGroupCreated }) => {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [selectedPrivacy, setSelectedPrivacy] = useState("personal");

  const handleCloseModal = () => {
    onClose();
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
      onGroupCreated(data);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Error creating group.");
    }
  };

  if (!showModal) return null;

  return (
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
                <p>⚠️ Admin can choose members who have all photos access</p>
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
  );
};

export default CreateGroupModal;
