import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Random from "./pages/Random";
import Select from "./pages/Select";
import Itinerary from "./pages/Itinerary";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Select />} />
      <Route path="/itinerary" element={<Itinerary />} />
    </Routes>
  )
}

export default App;