import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupjoinPage.css";

function GroupjoinPage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // optionally validate here
      navigate("", { state: { userInput: input } });
    } else {
      alert("Please enter Email or Phone Number");
    }
  };

  return ( 
  <div className="Join-page">
    <div className="Join-container">
      <div className="a12">
        <div className="form-img">
          <img src="/images/join-banner.jpg" alt="banner" />
          <div className="logo-wrapper">
            <a
              href="https://kwikpic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/logo_colored_white.png" alt="logo" width="157" />
            </a>
          </div>
          <div className="overlaytext" style={{ width: "520px" }}>
            <div>
              Photo sharing has never been easier! Kwikpic shares your individual albums with you by emailing them to the address you register with. Zero hassle.
              
            </div>
          </div>
        </div>
      </div>

      <div className="b12">
        <div className="Join-form">
          <div className="headerJoin"></div>
          <div className="Join-form-top">
            <div>
              <h2>Join a Group</h2>
              <span>Enter the 6-digit Unique Code of the Group</span>
            </div>
            <form onSubmit={handleSubmit}>
              <label style={{ width: "100%" }}>
              <input className="input-control"
                  type="text"
                  placeholder="UCode"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <p className="error-message"></p>
              </label>
              <button className="Join-btn" type="submit">
                continue
              </button>
            </form>
          </div>
          <div className="footerJoin"></div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GroupjoinPage;
