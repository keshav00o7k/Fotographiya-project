import React, { useEffect, useRef, useState } from "react";
import "./SelfieCapture.css";

const SelfieCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera access denied or not available");
        console.error(err);
      }
    };

    startWebcam();
  }, []);

  const capture = () => {
    const video = webcamRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg");
    setImageSrc(dataURL);
  };

  const retake = () => {
    setImageSrc(null);
  };

  const continueToNext = () => {
    window.location.href = "/nextpage";
  };

  return (
    <>
      <div className="selfie-page">
        <div>
          <div className="selfie-navbar">
            <div className="logo">
              <img src="\images\logo_colored_white.png" alt="Fotographiya" />
            </div>
          </div>

          <div className="selfie-container">
            <h2 className="title">Click a Selfie</h2>
            <p className="subtitle">
              Please take a clear selfie for best results
            </p>

            <div className="main-section">
              <div className="side-instructions">
                <div className="instruction">
                  <img src="images/face.png" alt="Only 1 face" />
                  <span>Only 1 face</span>
                </div>
                <div className="instruction">
                  <img src="images/blur.png" alt="No blur" />
                  <span>No blur</span>
                </div>
              </div>

              <div className="webcam-box">
                {!imageSrc ? (
                  <video
                    ref={webcamRef}
                    autoPlay
                    playsInline
                    className="webcam"
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="captured-image"
                  />
                )}

                {!imageSrc ? (
                  <button className="click-btn" onClick={capture}>
                    Click
                  </button>
                ) : (
                  <div className="action-buttons">
                    <button onClick={retake}>Retake</button>
                    <button onClick={continueToNext}>Continue</button>
                  </div>
                )}
              </div>

              <div className="side-instructions">
                <div className="instruction">
                  <img src="images/mask.png" alt="No Mask" />
                  <span>No Mask</span>
                </div>
                <div className="instruction">
                  <img src="images/spect.png" alt="No spectacles" />
                  <span>No spectacles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfieCapture;
