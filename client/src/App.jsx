import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import Select from "./pages/Select";
import Itinerary from "./pages/Itinerary";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Landmarks', 'Cultural', 'Nature', 'Recreational']); 
  const [selectedPreferences, setSelectedPreferences] = useState({
    Landmarks: 3,
    Cultural: 3,
    Nature: 3,
    Recreational: 3
  });
  

  return (
    <Routes>
      <Route path="/" element={<Select 
        selectedCategories={selectedCategories} 
        setSelectedCategories={setSelectedCategories}
        selectedPreferences={selectedPreferences} 
        setSelectedPreferences={setSelectedPreferences} 
      />} />
      <Route path="/itinerary" element={<Itinerary selectedCategories={selectedCategories} selectedPreferences={selectedPreferences}/>} />
    </Routes>
  );
}

export default App;
