import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <section>Welcome to my website!</section>
      <nav>
        <Link to="/NewsScreen">News</Link>
        <Link to="/AboutScreen">About</Link>
      </nav>
    </div>
  );
}

export default Header;
