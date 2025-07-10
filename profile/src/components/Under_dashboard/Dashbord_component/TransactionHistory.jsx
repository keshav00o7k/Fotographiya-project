import React, { useState } from "react";
import "./TransactionHistory.css";

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState("Main");

  return (
    <div className="transaction-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        <button className="export-button">Export</button>
      </div>

      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "Main" ? "active" : ""}`}
          onClick={() => setActiveTab("Main")}
        >
          Main
        </button>
        <button
          className={`tab-btn ${activeTab === "Wallet" ? "active" : ""}`}
          onClick={() => setActiveTab("Wallet")}
        >
          Wallet
        </button>
      </div>

      <div className="transaction-content">
        <p>No transactions found</p>
      </div>
    </div>
  );
};

export default TransactionHistory;
