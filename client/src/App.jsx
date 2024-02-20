import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar"; 
import Select from "./pages/Select";
import Itinerary from "./pages/Itinerary";
import Home from "./pages/Home";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Landmarks', 'Cultural', 'Nature', 'Recreational']); 
  const [selectedPreferences, setSelectedPreferences] = useState({
    Landmarks: 3,
    Cultural: 3,
    Nature: 3,
    Recreational: 3
  });
  

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Select 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories}
          selectedPreferences={selectedPreferences} 
          setSelectedPreferences={setSelectedPreferences} 
        />} />
        <Route path="/itinerary" element={<Itinerary selectedCategories={selectedCategories} selectedPreferences={selectedPreferences}/>} />
      </Routes>
    </div>
  );
}

export default App;
