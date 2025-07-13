import { useState } from "react";

const JoinGroupModal = ({ showModal, onClose }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

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
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
    setCode(["", "", "", "", "", ""]);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content join-code-modal">
        <span className="close-btn" onClick={handleCloseModal}>
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
  );
};

export default JoinGroupModal;
