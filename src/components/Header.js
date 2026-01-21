import { Link } from 'react-router-dom';
import Nav from './Nav';
import React from 'react';
import logo from '../images/Logo .svg';

/**
 * Header component - Main site header with logo and navigation
 */
const Header = () => {
  return (
    <header role="banner">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="header-wrapper">
        <Link to="/" aria-label="Little Lemon Home">
          <img src={logo} alt="Little Lemon restaurant logo" />
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
