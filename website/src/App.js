import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useState } from "react";

import './App.css';

import Entry from "./pages/Entry";
import Home from "./pages/Home";

function App() {

  const [login, setLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/entry" element={<Entry />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to={login  ? "/home" : "/entry"} />} />
      </Routes>
    </Router>
  );
}

export default App;
