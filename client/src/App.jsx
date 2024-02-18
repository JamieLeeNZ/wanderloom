import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import Select from "./pages/Select";
import Itinerary from "./pages/Itinerary";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Landmarks', 'Cultural', 'Nature', 'Recreational']); 

  return (
    <Routes>
      <Route path="/" element={<Select selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />} />
      <Route path="/itinerary" element={<Itinerary selectedCategories={selectedCategories} />} />
    </Routes>
  );
}

export default App;
