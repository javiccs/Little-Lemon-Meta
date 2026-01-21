import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Nav from '../Nav';

const renderNav = () => {
  return render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
};

describe('Nav Component', () => {
  describe('Rendering', () => {
    test('renders navigation links', () => {
      renderNav();

      // On desktop, links should be visible
      expect(screen.getByText(/home/i)).toBeInTheDocument();
      expect(screen.getByText(/about/i)).toBeInTheDocument();
      expect(screen.getByText(/menu/i)).toBeInTheDocument();
      expect(screen.getByText(/reservations/i)).toBeInTheDocument();
    });

    test('renders hamburger menu button', () => {
      renderNav();

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('toggles menu when hamburger is clicked', () => {
      renderNav();

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      const navLinks = document.querySelector('#navigation-menu');

      // Initially menu should not have 'visible' class
      expect(navLinks).not.toHaveClass('visible');

      // Click to open
      fireEvent.click(menuButton);
      expect(navLinks).toHaveClass('visible');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Click to close
      fireEvent.click(menuButton);
      expect(navLinks).not.toHaveClass('visible');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('closes menu when Escape key is pressed', () => {
      renderNav();

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      const navLinks = document.querySelector('#navigation-menu');

      // Open menu
      fireEvent.click(menuButton);
      expect(navLinks).toHaveClass('visible');

      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(navLinks).not.toHaveClass('visible');
    });

    test('closes menu when a link is clicked', () => {
      renderNav();

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      const navLinks = document.querySelector('#navigation-menu');

      // Open menu
      fireEvent.click(menuButton);
      expect(navLinks).toHaveClass('visible');

      // Click a link
      const homeLink = screen.getByText(/home/i);
      fireEvent.click(homeLink);
      
      // Menu should close
      expect(navLinks).not.toHaveClass('visible');
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      renderNav();

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');

      const menuButton = screen.getByRole('button', { name: /navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls', 'navigation-menu');
    });

    test('navigation list has proper id', () => {
      renderNav();

      const navLinks = document.querySelector('#navigation-menu');
      expect(navLinks).toBeInTheDocument();
    });
  });
});
