import React, { useState } from 'react';

const FilterBoard = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const allCategories = ['Landmarks', 'Cultural', 'Nature', 'Recreational'];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;
    
    console.log('Category:', category, 'Checked:', isChecked);

    setSelectedCategories(prevCategories => {
      if (isChecked) {
        return [...prevCategories, category];
      } else {
        return prevCategories.filter(cat => cat !== category);
      }
    });
  };

  // Call the onFilterChange function with the updated selectedCategories
  React.useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories, onFilterChange]);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="mr-4">
        <label>Filter by Category:</label>
        {allCategories.map((category, index) => (
          <label key={index} className="ml-2">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
              className="mr-1"
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterBoard;
