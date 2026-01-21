import { CONTACT_INFO, FOOTER_LINKS } from '../constants/navigation';

import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../images/Logo .svg';

/**
 * Footer component - Site footer with links and contact information
 */
const Footer = () => {
  return (
    <footer role="contentinfo">
      <section>
        <div className="company-info">
          <img src={logo} alt="Little Lemon restaurant logo" />
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional 
            recipes served with a modern twist.
          </p>
        </div>
        
        <div className="company-details">
          {/* Important Links */}
          <div>
            <h3>Important Links</h3>
            <ul>
              {FOOTER_LINKS.important.map((link) => (
                <li key={link.id}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <address style={{ fontStyle: 'normal' }}>
                  Address: <br />
                  {CONTACT_INFO.address}
                </address>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  Phone: <br />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  Email: <br />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3>Social Media Links</h3>
            <ul>
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.label} page (opens in new window)`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="copyright">
        <p>
          Little Lemon © 2026. All rights reserved. | Author: Javiccs
        </p>
      </div>
    </footer>
  );
};

export default Footer;
