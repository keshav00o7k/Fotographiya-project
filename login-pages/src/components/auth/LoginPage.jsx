import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

function LoginPage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (emailRegex.test(trimmedInput) || phoneRegex.test(trimmedInput)) {
      navigate("/otp", { state: { userInput: trimmedInput } });
    } else {
      alert("Please enter a valid Email or Phone Number");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="a12">
          <div className="form-img">
            <img src="/images/login-banner.jpg" alt="banner" />
            <div className="logo-wrapper">
              <a
                href="https://Fotographiya.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/logo_colored_white.png"
                  alt="Fotographiya"
                  width="157"
                />
              </a>
            </div>
            <div className="overlaytext" style={{ width: "520px" }}>
              <div>
                <p>
                  “ We launched Fotographiya last year, but we've achieved a lot
                  in just eight short months. My aim is to successfully make it
                  bootstrap, relying on sheer passion and a commitment to making
                  a real difference in the photography industry. In that time,
                  we've generated over 150 leads, participated in more than 20
                  promotional events, and garnered awards and recognition for
                  our innovative approach. But this is just the beginning.“
                </p>
                <h4 style={{ marginBottom: "5px" }}>Dabboo Ratnani</h4>
                <p style={{ fontSize: "12px", marginBottom: "0px" }}>
                  Celebrity Photographer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="b12">
          <div className="login-form">
            <div className="headerlogin"></div>
            <div className="loginfrom-top">
              <div>
                <h2>Sign in to Fotographiya</h2>
                <span>Enter your Email ID or Phone Number to continue</span>
              </div>
              <form onSubmit={handleSubmit}>
                <label style={{ width: "100%" }}>
                  <input
                    className="input-control"
                    type="text"
                    placeholder="Email ID or Phone Number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <p className="error-message"></p>
                </label>
                <button className="login-btn" type="submit">
                  continue
                </button>
              </form>
            </div>
            <div className="footerlogin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
