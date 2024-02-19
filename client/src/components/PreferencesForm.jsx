import React, { useState, useEffect } from 'react';

const Slider = ({ category, preference, onChange }) => {
  return (
    <div>
      <label htmlFor={category}>{category}</label>
      <input
        type="range"
        id={category}
        name={category}
        min="1"
        max="5"
        value={preference}
        onChange={(e) => onChange(category, parseInt(e.target.value))}
      />
      <span>{preference}</span>
    </div>
  );
};

const PreferencesForm = ({ categories, preferences, onPreferencesChange }) => {

  const [selectedPreferences, setSelectedPreferences] = useState(preferences);

  const handlePreferenceChange = (category, value) => {
    console.log(category + " preference changed to " + value);
    setSelectedPreferences(prevPreferences => ({
      ...prevPreferences,
      [category]: value
    }));
  };

  useEffect(() => {
    onPreferencesChange(selectedPreferences);
  }, [selectedPreferences, onPreferencesChange]);

  return (
    <form>
      {categories.map(category => (
        <Slider
          key={category}
          category={category}
          preference={selectedPreferences ? selectedPreferences[category] || 3 : 3} 
          onChange={handlePreferenceChange}
        />
      ))}
    </form>
  );
};

export default PreferencesForm;
