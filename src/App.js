import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";
import Projects from "./projects"; // Fixed typo
import ContactForm from "./Contactform"; // Ensure this file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactForm />} /> {/* Add this route if needed */}
      </Routes>
    </Router>
  );
}

export default App;
