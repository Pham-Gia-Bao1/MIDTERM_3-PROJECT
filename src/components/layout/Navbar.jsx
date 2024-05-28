// Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme === 'light' ? 'bg-success' : 'bg-dark'}`}>
      <h1>
        <i className="fab fa-github" /> GitHub Finder
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </button>
    </nav>
  );
};

export default Navbar;
