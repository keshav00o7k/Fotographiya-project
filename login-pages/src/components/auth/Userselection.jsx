import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userselection.css";

function UserSelection() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (input === "user") {
      navigate("/selfie", { state: { userInput: "user" } });
    } else if (input === "photographer") {
      navigate("/selfie", { state: { userInput: "photographer" } });
    } else {
      alert("Please select a role to continue");
    }
  };

  return (
    <div className="Selection-page">
      <div className="Selection-container">
        <div className="a12">
          <div className="form-img">
            <img src="/images/select-user-banner.jpg" alt="banner" />
            <div className="logo-wrapper">
              <a
                href="https://Fotographiya.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/logo_colored_white.png"
                  alt="logo"
                  width="157"
                />
              </a>
            </div>
            <div className="overlaytext">
              <div className="overlaytext-content">
                “Pictures are like little boxes of memories.
                <br /> Come, open, revisit”
              </div>
            </div>
          </div>
        </div>

        <div className="b12">
          <div className="Selection-form">
            <div className="headerSelection"></div>
            <div className="Selectionfrom-top">
              <div>
                <h2>Sign in to Fotographiya</h2>
                <span>
                  Welcome! You are new here. Set up your account as
                  <br></br> a user or a photographer
                </span>
              </div>
              <form onSubmit={handleContinue}>
                <div className="radio-option-group">
                  <label
                    className={`radio-option ${
                      input === "user" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="user"
                      checked={input === "user"}
                      onChange={() => setInput("user")}
                    />
                    <div className="radio-label">
                      <img src="/images/user.png" alt="User" />
                      <span>
                        I'm a User, viewing & uploading photos for<br></br> my
                        events
                      </span>
                    </div>
                  </label>

                  <label
                    className={`radio-option ${
                      input === "photographer" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value="photographer"
                      checked={input === "photographer"}
                      onChange={() => setInput("photographer")}
                    />
                    <div className="radio-label">
                      <img src="/images/face.png" alt="Photographer" />
                      <span>
                        I'm a Photographer, delivering photos <br />
                        professionally
                        <br />
                        <div className="business-badge">Business Account</div>
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  className="Selection-btn"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </form>
            </div>
            <div className="footerSelection"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
