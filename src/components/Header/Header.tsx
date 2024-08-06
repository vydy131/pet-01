import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <section className="welcome-line">Welcome to my website!</section>
      <nav className="nav-bar">
        <Link to="/NewsScreen" className="nav-tab">
          News
        </Link>
        <Link to="/AboutScreen" className="nav-tab">
          About
        </Link>
      </nav>
    </div>
  );
}

export default Header;
