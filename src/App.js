import "./App.css";
import Navbar from "./component/Navbar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exect path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  ); 
}

export default App;
