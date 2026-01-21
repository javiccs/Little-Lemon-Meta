import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants/navigation';

/**
 * Nav component - Accessible navigation with mobile hamburger menu
 */
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle keyboard navigation (ESC to close menu)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar" aria-label="Main navigation">
      {/* Mobile Nav hamburger */}
      <button
        ref={hamburgerRef}
        className="menu-icon"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="navigation-menu"
      >
        <div className="hamburger-bar" />
        <div className="hamburger-bar" />
        <div className="hamburger-bar" />
      </button>

      {/* Nav items */}
      <ul
        ref={menuRef}
        id="navigation-menu"
        className={`nav-links ${menuOpen ? 'visible' : ''}`}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              onClick={() => setMenuOpen(false)}
              aria-current={window.location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
