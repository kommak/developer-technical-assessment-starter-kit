import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // <-- import RootState

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Use typed selector
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="header" role="banner">
      <div
        className="logo"
        aria-label="Akan logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        OHB
      </div>

      <nav>
        <div
          className={`nav-links${menuOpen ? " open" : ""}`}
          role="navigation"
          aria-label="Primary Navigation"
        >
          <a href="#search">Search</a>
          <a href="#srocceses">Procceses</a>
          <a href="#help">Help</a>
          <a href="#properties">Properties</a>
        </div>
      </nav>

      {!isLoggedIn && (
        <button
          className="contact-button"
          aria-label="Login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
      {isLoggedIn && (
        <button
          className="contact-button"
          aria-label="Welcome"
        >
          Welcome
        </button>
      )}

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }
        }}
      >
        <div
          style={{
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }}
        />
        <div
          style={{
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
        <div
          style={{
            transform: menuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
