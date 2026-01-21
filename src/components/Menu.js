import React from 'react';
import recipes from '../data/recipes';

/**
 * Menu component - Displays weekly specials
 */
const Menu = () => {
  return (
    <section className="menu-container" aria-labelledby="menu-title">
      <div className="menu-header">
        <h2 id="menu-title">This week's specials!</h2>
        <button aria-label="View full menu">Order Menu</button>
      </div>

      {/* Menu Items */}
      <div className="menus">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="menu-items">
            <img 
              src={recipe.image} 
              alt={`${recipe.title} dish`} 
              loading="lazy"
            />
            <div className="menu-details">
              <div className="menu-header">
                <h3>{recipe.title}</h3>
                <p className="price" aria-label={`Price: $${recipe.price}`}>
                  ${recipe.price}
                </p>
              </div>
              <p className="menu-description">{recipe.description}</p>
              <button 
                className="order-btn"
                aria-label={`Order ${recipe.title}`}
              >
                Order Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;
