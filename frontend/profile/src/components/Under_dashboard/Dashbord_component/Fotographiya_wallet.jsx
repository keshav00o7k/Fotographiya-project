import React, { useState } from "react";
import Profile1page from "./Profile1page";
import "./Fotographiya_Wallet.css";
import Navbar from "../../Navbar";

const Fotographiya_wallet = () => {
  const [amount, setAmount] = useState(100);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };

  const handlePresetClick = (val) => {
    setAmount(val);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="maindiv">
        {/* <Profile1page /> */}
        <div className="wallet-container">
          <div className="wallet-left">
            <h2>Kwikpic Wallet</h2>
            <div className="section-title">Balance</div>

            <div className="balance-box">
              <h1>0 credits</h1>
              <p>
                <i>₹1 = 1 credits</i>
              </p>
            </div>

            <hr />

            <div className="section-title">Add Credit</div>
            <p className="info-text">Add credits in the multiples of ₹5</p>

            <div className="input-box">
              <span className="currency">₹</span>
              <input
                type="number"
                value={amount}
                onChange={handleInputChange}
              />
              <span className="credit-value">= {amount} credits</span>
            </div>

            <p className="tax-info">
              Tax/GST will be added.
              <br />
              Add a minimum of ₹100 for a seamless experience
            </p>

            <div className="amount-options">
              {[100, 300, 500, 1000].map((val) => (
                <button key={val} onClick={() => handlePresetClick(val)}>
                  ₹{val}
                </button>
              ))}
            </div>

            <button className="paymentbutton">ADD</button>
          </div>

          <div className="wallet-right">
            <div className="lefttext">
              <img
                src="\images\info-plain.png"
                alt="info"
                className="infiimg"
              />
              <h1> How to use credits</h1>
            </div>
            <div className="how-to-use">
              <h4>Notify participants every time you upload new photos via:</h4>
              <div className="notification-info">
                <div className="notify-row">
                  <img src="\images\sms.png" alt="" />
                  <span>SMS:</span>
                  <span className="credit">0.5 credit/notification</span>
                </div>
                <div className="notify-row">
                  <img src="\images\whatapp.png" alt="" />
                  <span>WhatsApp:</span>
                  <span className="credit">1 credit/notification</span>
                </div>
                <div className="notify-row">
                  <img src="/images/email.png" alt="Email" />
                  <span>Email:</span>
                  <span className="credit">0.2 credit/notification</span>
                </div>
              </div>
            </div>

            <div className="wallet-subscription-box">
              <p>Get or renew Kwikpic subscriptions using these credits</p>
              <a href="#">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fotographiya_wallet;
