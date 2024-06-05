import React from 'react';
import logo from './Logo.png';



const Header = () => {
  return (
    <header>
      <div className="logo">
    
        <img src={logo} alt="Blog Logo" />
        
      </div>
      <nav>
        <ul>
          <li>
            Home
          </li>
          <li>
            Technology
          </li>
          <li>
            Travel
          </li>
          <li>
           Lifestyle
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;