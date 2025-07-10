import React, { useState } from "react";
import "./Otp_verification.css";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      // Auto-focus next box
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setError("Please enter all 4 digits");
    } else {
      // Call API or verify here
      console.log("Entered OTP:", enteredOtp);
      navigate("/user-selection");
    }
  };

  return (
    <>
      <div className="otp-page">
        <div className="otp-container">
          <div className="a12">
            <div className="form-img">
              <img src="/images/otp-banner.jpg" alt="banner" />
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
              <div className="overlaytext" style={{ width: "520px" }}>
                “ We value your privacy and security. We do not have manual
                access to any of your photos.“
              </div>
            </div>
          </div>

          <div className="b12">
            <div className="login-form">
              <div className="headerlogin"></div>
              <div className="loginfrom-top">
                <div>
                  <h2>Verification</h2>
                  <span>Enter the OTP sent on your Email ID</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="a15 position-relative">
                    <div style={{ display: "flex", gap: "10px" }}>
                      {otp.map((digit, index) => (
                        <div
                          className="otp-input"
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            id={`otp-${index}`}
                            type="tel"
                            autoComplete="off"
                            aria-label={`Digit ${index + 1}`}
                            maxLength="1"
                            value={digit}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            style={{
                              width: "1em",
                              textAlign: "center",
                              fontSize: "24px",
                            }}
                          />
                          <span className="p12"></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {error && (
                    <span className="text-danger" style={{ color: "red" }}>
                      {error}
                    </span>
                  )}
                  <p className="text error"></p>
                  <div style={{ maxWidth: "275px" }}>
                    <button className="otp-btn nbtn" type="submit">
                      continue
                    </button>
                  </div>
                </form>
                <div
                  className="a_a"
                  style={{
                    maxWidth: "275px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <a href="#">Resend OTP</a>
                </div>
              </div>
              <div className="footerlogin"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
