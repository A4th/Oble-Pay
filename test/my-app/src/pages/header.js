import React from 'react';
import logo from './Logo.png';



const Header = () => {
  return (
    <header className='flex justify-center'>
      <div>
        
          <img src={logo} alt="Logo" className='w-16' /> 
        
        
      </div>
    
    </header>
  );
};

export default Header;