import React from 'react';
import { Link } from 'react-router-dom';
import AdminUpload from '../components/AdminUpload';

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#080B10] p-6 md:p-12">
      <nav className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <Link to="/" className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest hover:underline">
          ← Back to Live Showcase
        </Link>
        <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-mono">
          Sonu Films Admin
        </span>
      </nav>
      
      <AdminUpload />
    </div>
  );
}