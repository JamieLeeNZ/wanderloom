import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Random from "./pages/Random";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Random />} />

    </Routes>
  )
}

export default App;