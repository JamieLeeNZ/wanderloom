import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Random from "./pages/Random";
import Select from "./pages/Select";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Select />} />

    </Routes>
  )
}

export default App;