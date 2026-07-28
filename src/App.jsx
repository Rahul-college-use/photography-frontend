import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Image Manager Page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}