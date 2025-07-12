import React from "react";

const BasicInfoForm = ({ formData, handleChange }) => {
  return (
    <>
      <label className="ut">First Name</label>
      <input
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
      />

      <label>Last Name</label>
      <input
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
      />

      <label>Email ID</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Phone Number</label>
      <input
        name="phone"
        type="text"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
    </>
  );
};

export default BasicInfoForm;
