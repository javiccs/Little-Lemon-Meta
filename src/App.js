import './App.css';

import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Menu from './components/Menu';

/**
 * Main App component
 */
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
      <Menu />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
