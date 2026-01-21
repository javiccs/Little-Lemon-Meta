# 🍋 Little Lemon Restaurant - Booking System

A modern, accessible restaurant booking application built with React as part of the Meta Front-End Developer Professional Certificate capstone project.

## 👤 Author

**Javier Perez**

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About the Project

Little Lemon is a family-owned Mediterranean restaurant located in Chicago. This web application provides customers with an intuitive interface to make table reservations online. The project demonstrates modern React development practices, comprehensive testing, and accessibility standards.

### Key Highlights

- ✅ Complete form validation with user-friendly error messages
- ♿ WCAG 2.1 AA accessibility compliance
- 🧪 Comprehensive unit testing with Jest & React Testing Library
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Clean, semantic HTML structure
- 🔧 Modular, maintainable code architecture

## ✨ Features

- **Table Reservations**: Easy-to-use booking form with real-time validation
- **Dynamic Time Slots**: Available times update based on selected date
- **Form Validation**: 
  - Future date validation
  - Guest count limits (1-10)
  - Required field validation
  - Clear, helpful error messages
- **Accessibility**: 
  - Keyboard navigation support
  - Screen reader compatible
  - ARIA labels and live regions
  - Skip to content link
- **Responsive Design**: Optimized for all device sizes
- **Error Handling**: Graceful error boundaries and loading states

## 🛠 Tech Stack

- **React** 18.2.0 - UI library
- **React Router** 6.21.0 - Client-side routing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **CSS3** - Styling with responsive design
- **PropTypes** - Runtime type checking

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── __tests__/      # Component unit tests
│   │   ├── BookingForm.test.js
│   │   ├── BookingPage.test.js
│   │   ├── Main.test.js
│   │   └── Nav.test.js
│   ├── BookingForm.js
│   ├── BookingPage.js
│   ├── ConfirmedBooking.js
│   ├── ErrorBoundary.js
│   ├── ErrorBoundary.css
│   ├── Footer.js
│   ├── Header.js
│   ├── Main.js
│   ├── Menu.js
│   └── Nav.js
├── pages/              # Page-level components
│   ├── __tests__/      # Page unit tests
│   └── HomePage.js
├── hooks/              # Custom React hooks
│   └── useBookingForm.js
├── services/           # API and external services
│   ├── __tests__/      # Service unit tests
│   │   └── bookingAPI.test.js
│   └── bookingAPI.js
├── utils/              # Utility functions
│   ├── __tests__/      # Utility unit tests
│   │   └── validators.test.js
│   ├── validators.js
│   └── formatters.js
├── constants/          # Shared constants
│   ├── booking.js
│   └── navigation.js
├── data/               # Static data
│   └── recipes.js
├── images/             # Static assets
├── App.js              # Root component
├── App.test.js         # App unit tests
├── App.css             # Global styles
└── index.js            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/javiccs/little-lemon-booking.git
cd little-lemon-booking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see lint errors in the console.

### Available Scripts

#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`

Launches the test runner in interactive watch mode.  
See [running tests](#running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## 🧪 Running Tests

This project includes comprehensive unit tests for all critical components and utilities.

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Tests in CI Mode

```bash
npm test -- --ci --watchAll=false
```

### Test Coverage

The project maintains high test coverage including:

- **BookingForm**: Rendering, validation, submission, error states, accessibility
- **Main Component**: Routing, state management, time slot updates
- **Nav Component**: Menu toggling, keyboard navigation, accessibility
- **Validators**: All form validation logic and edge cases
- **Booking API**: Time slot generation and submission

## ♿ Accessibility

This application follows WCAG 2.1 Level AA guidelines:

- ✅ Semantic HTML elements (`<main>`, `<nav>`, `<section>`, `<article>`)
- ✅ ARIA labels, descriptions, and live regions
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus management and visible focus indicators
- ✅ Screen reader compatible
- ✅ Skip to content link
- ✅ Color contrast ratios meet AA standards
- ✅ Form error messages announced to screen readers

### Testing Accessibility

You can test accessibility using:
- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
- Keyboard-only navigation
- Screen readers (NVDA, JAWS, VoiceOver)

## 📝 Contributing

### Git Workflow

This project follows a feature-branch workflow. Suggested commit structure:

```bash
# Initial setup
git commit -m "chore: initial project setup"

# Feature development
git commit -m "feat: add booking form validation"
git commit -m "feat: implement time slot API"
git commit -m "feat: add error boundary"

# Testing
git commit -m "test: add BookingForm unit tests"
git commit -m "test: add API service tests"

# Styling and accessibility
git commit -m "style: improve responsive design"
git commit -m "a11y: add ARIA labels to form inputs"

# Bug fixes
git commit -m "fix: correct date validation logic"
git commit -m "fix: resolve mobile menu close issue"

# Documentation
git commit -m "docs: update README with setup instructions"

# Refactoring
git commit -m "refactor: extract custom hooks"
git commit -m "refactor: organize folder structure"
```

### Commit Message Convention

- `feat`: New feature
- `fix`: Bug fix
- `test`: Adding or updating tests
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Build process or auxiliary tool changes
- `a11y`: Accessibility improvements

## 📄 License

This project was created as part of the Meta Front-End Developer Professional Certificate program.

## 🙏 Acknowledgments

- Meta Front-End Developer Professional Certificate
- React documentation and community
- Testing Library documentation
- Web Content Accessibility Guidelines (WCAG)

---

Made with ❤️ by Javier Perez