import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ profileImage }) => {
  const navigate = useNavigate();

  const homepage = () => navigate("/");
  const handleGoBack = () => navigate("/profile-setting");
  const AnalyticsPage = () => navigate("/analytics");

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={homepage}>
        <img src="/images/logo.png" alt="Kwikpic Logo" className="logo" />
        <span className="brand-name"></span>
      </div>

      <div className="navbar-right">
        <img
          src="/images/Bellicon.jpg"
          alt="Notifications"
          className="bell-icon"
        />

        <div className="user-profile">
          <img src={profileImage} alt="Profile" className="profile-img" />

          <ul className="nav-links">
            <li className="dropdown">
              Keshav Goyal <span className="dropdown-arrow">▴</span>
              <ul className="dropdown-menu">
                <li
                  onClick={handleGoBack}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Profile Setting
                </li>
                <li
                  onClick={AnalyticsPage}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Analytics
                </li>
                <li>
                  <a
                    href="https://www.fotographiya.com/aboutUs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Help & Support
                  </a>
                </li>
                <li>Privacy & Security</li>
                <li>Tutorial</li>
                <li>
                  <a
                    href="https://www.fotographiya.com/aboutUs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    About
                  </a>
                </li>
                <li>Logout</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
