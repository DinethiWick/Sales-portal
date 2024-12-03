import React, { useState } from 'react';
import '../styles/CategoryEntry.css'

const CategoryEntry = ({ category,callback }) => {
  const [selected,setSelected] = useState(false);
  return (
    <div className={selected?"button green":"button"} onClick={()=>{callback();setSelected(!selected)}}>
      <div className="category-text">{category}</div>
    </div>
  );
};

export default CategoryEntry;
