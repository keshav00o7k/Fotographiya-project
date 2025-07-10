import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); 
const handleJoinClick = () => {
    navigate('/group-join');
  };
  const handleLoginClick = () => {
    navigate('/login'); 
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/image/logo.png" alt="Fotographiya" className="logo" />
        <span className="brand-name"></span>
      </div>

      <ul className="nav-links">
        <li className="dropdown">
  Solutions & Use-cases <span className="dropdown-arrow">▴</span>
  <ul className="dropdown-menu">
    <li>For Photographers</li>
    <li>For Weddings</li>
    <li>For Parties & Celebrations</li>
    <li>For Corporates</li>
    <li>For Colleges</li>
    <li>For Events</li>
  </ul>
</li>


        <li>About Us</li>
        <li>Contact Us</li>
        <li>Blog</li>
        <li>Pricing</li>
      </ul>

      <div className="btnn">
        <button className="join-link" onClick={handleJoinClick}>Join a Group</button>
        <button className="login-btn" onClick={handleLoginClick}>Sign Up / Login</button> 
      </div>
    </nav>
  );
};

export default Navbar;