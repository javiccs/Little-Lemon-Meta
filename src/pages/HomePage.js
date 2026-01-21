import { Link } from 'react-router-dom';
import React from 'react';
import bannerImg from '../images/restaurantfood.jpg';

/**
 * HomePage component - Landing page with hero banner
 */
const HomePage = () => {
  return (
    <section className="Banner">
      <div className="banner-container">
        <div className="banner-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <img 
            src={bannerImg} 
            alt="Chef preparing Mediterranean food at Little Lemon restaurant" 
            className="banner-img-mobile" 
          />
          <p>
            We are a family owned Mediterranean restaurant, 
            <br className="mobile-hidden" />
            focused on traditional recipes served with a modern twist.
          </p>
          <Link to="/booking">
            <button aria-label="Reserve a table at Little Lemon">
              Reserve a table
            </button>
          </Link>
        </div>
        <img 
          src={bannerImg} 
          alt="Chef preparing Mediterranean food at Little Lemon restaurant" 
          className="banner-img" 
        />
      </div>
    </section>
  );
};

export default HomePage;
