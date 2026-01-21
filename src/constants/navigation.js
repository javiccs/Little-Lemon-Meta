/**
 * Navigation links configuration
 */

export const NAV_LINKS = [
  { id: 1, path: '/', label: 'Home' },
  { id: 2, path: '/about', label: 'About' },
  { id: 3, path: '/services', label: 'Services' },
  { id: 4, path: '/menu', label: 'Menu' },
  { id: 5, path: '/booking', label: 'Reservations' },
  { id: 6, path: '/order', label: 'Order Online' },
  { id: 7, path: '/login', label: 'Login' }
];

export const FOOTER_LINKS = {
  important: [
    { id: 1, path: '/', label: 'Home' },
    { id: 2, path: '/about', label: 'About' },
    { id: 3, path: '/menu', label: 'Menu' },
    { id: 4, path: '/booking', label: 'Reservations' },
    { id: 5, path: '/order', label: 'Order Online' },
    { id: 6, path: '/login', label: 'Login' }
  ],
  social: [
    { id: 1, path: 'https://facebook.com', label: 'Facebook', external: true },
    { id: 2, path: 'https://instagram.com', label: 'Instagram', external: true },
    { id: 3, path: 'https://twitter.com', label: 'Twitter', external: true }
  ]
};

export const CONTACT_INFO = {
  address: 'Bogotá, Colombia',
  phone: '+ 57 123 456 7890',
  email: 'little@lemon.com'
};
