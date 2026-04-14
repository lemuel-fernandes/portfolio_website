import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Standardizing native component code-splitting via React.lazy
const Portfolio = lazy(() => import("./Portfolio"));
const Projects = lazy(() => import("./projects"));
const ContactForm = lazy(() => import("./Contactform"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ height: '100vh', width: '100vw', background: 'var(--bg-deep)' }} />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
