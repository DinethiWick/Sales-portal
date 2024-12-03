import React, { useEffect } from 'react';
import search from './assets/search.png';

const SearchBar = ({ searchHandler }) => {

  useEffect(() => {
    const searchInput = document.getElementById('search');
    
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        searchHandler();
      }
    };

    if (searchInput) {
      searchInput.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [searchHandler]);

  return (
    <div className='search-bar'>
      <input type='text' id='search' />
      <div className='search-button' onClick={searchHandler}>
        Search Products
        <img src={search} alt='search' />
      </div>
    </div>
  );
};

export default SearchBar;