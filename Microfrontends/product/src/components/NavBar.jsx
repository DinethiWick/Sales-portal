import React from 'react';
import '../styles/NavBar.css';

import user from './assets/user.jpg';
import cart from './assets/cart.png';
import SearchBar from './SearchBar';

const NavBar = ({callback, search}) => {

  const searchHandler = ()=>{
    let searchQuery = document.getElementById('search').value;
    callback(searchQuery)
  }

  if(search){
    return (
      <div className="background">
          <div className='page-name'>Product Catalogue</div>
          <SearchBar
            searchHandler={searchHandler}
          />
          <div className='toolbar'>
              <img className='item' src={cart} />
              <img className='item' src={user} />
          </div>
      </div>
    );
  }
  else{
    return (
      <div className="background">
          <div className='page-name'>Product Catalogue</div>
          <div className='toolbar'>
              <img className='item' src={cart} />
              <img className='item' src={user} />
          </div>
      </div>
    );
  }
};

export default NavBar;
