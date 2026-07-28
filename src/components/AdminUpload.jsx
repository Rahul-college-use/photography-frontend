import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Send,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Wand2
} from 'lucide-react';

export default function AdminUpload() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Upload Form States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [metadata, setMetadata] = useState({
    title: '',
    category: 'wedding',
    location: '',
    description: ''
  });

  // 🔑 Admin Password
  const ADMIN_PASSWORD = 'Sonu8301@#'; 

  // 🎲 4-character Unique Alphanumeric Generator (e.g. 7X9K)
  const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  // 🪄 Title Auto-Generator (Strictly Branding Name + Unique Code)
  const generateAutoTitle = () => {
    const uniqueCode = generateUniqueCode();
    return `Sonu Photography & Videography #${uniqueCode}`;
  };

  // 🪄 Description Auto-Generator (No File Name Included)
  const generateAutoDescription = (category, location) => {
    const locText = location ? `in ${location}` : 'in Patna, Bihar';

    switch (category) {
      case 'wedding':
        return `Capturing royal wedding rituals, candid emotions, and traditional grandeur ${locText}. Preserved with high-definition cinematic clarity by Sonu Photography & Videography.`;
      case 'prewedding':
        return `A cinematic pre-wedding shoot ${locText}. Styled with warm golden hour lighting, natural poses, and professional color grading.`;
      case 'kids':
        return `Adorable fine-art baby portraits ${locText}. Safe, cozy studio setups designed for safe and timeless newborn photography.`;
      case 'events':
        return `Exclusive event coverage ${locText}. Highlighting vibrant celebrations, key moments, and unforgettable memories.`;
      default:
        return `Exclusive portraiture and cinematic moments captured ${locText} by Sonu Photography & Videography.`;
    }
  };

  // Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Galat Password! Sahi password dalein.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearFile();
  };

  // File Select Handler
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadStatus(null);

      // Auto Title (Logo Name + Unique Code) & Clean Description
      const autoTitle = generateAutoTitle();
      const autoDesc = generateAutoDescription(metadata.category, metadata.location);

      setMetadata(prev => ({
        ...prev,
        title: autoTitle,
        description: autoDesc
      }));
    } else {
      setUploadStatus({
        type: 'error',
        message: 'Please select a valid image file (PNG, JPG, WEBP).'
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setMetadata(prev => {
      const updated = { ...prev, [name]: value };

      if (name === 'category' || name === 'location') {
        updated.description = generateAutoDescription(updated.category, updated.location);
      }
      
      return updated;
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select an image to upload.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    const finalTitle = metadata.title || generateAutoTitle();
    const finalDescription = metadata.description || generateAutoDescription(metadata.category, metadata.location);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', finalTitle);
    formData.append('category', metadata.category);
    formData.append('location', metadata.location || 'Patna, Bihar');
    formData.append('description', finalDescription);

    try {
      // 🔴 Environment Variable for Base URL
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://photography-backend-c5oi.onrender.com' || 'https://photography-backend-c5oi.onrender.com';

      const response = await fetch(`${API_BASE}/api/photos/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      setUploadStatus({
        type: 'success',
        message: 'Photo uploaded successfully to portfolio!'
      });

      clearFile();
      setMetadata({
        title: '',
        category: 'wedding',
        location: '',
        description: ''
      });

    } catch (error) {
      console.error('API Error:', error);
      setUploadStatus({
        type: 'error',
        message: error.message || 'Failed to connect to API endpoint.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // 🔒 Login Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-[#0F1522] border border-[#D4AF37]/30 rounded-3xl shadow-2xl text-[#E2E8F0]">
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl">
            <Lock className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Admin Authentication</h2>
          <p className="text-xs text-[#94A3B8]">Sonu Films Admin Panel me enter karne ke liye password dalein</p>
        </div>

        {authError && (
          <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-xs text-rose-300 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Admin Password"
              required
              className="w-full bg-[#080B10] border border-[#1E2638] rounded-xl pl-4 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-[#94A3B8] hover:text-[#D4AF37]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold py-3.5 rounded-xl hover:brightness-110 transition-all shadow-md text-sm uppercase tracking-wider"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  // 🔓 Dashboard View
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-[#0F1522] border border-[#D4AF37]/30 rounded-3xl shadow-2xl text-[#E2E8F0]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-[#1E2638] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Portfolio Image Manager</h2>
            <p className="text-xs text-[#94A3B8]">Auto-branded titles & clean descriptions without file names</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Upload Alert */}
      {uploadStatus && (
        <div className={`p-4 mb-6 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
          uploadStatus.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {uploadStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{uploadStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Drag/Drop Zone */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">Image Upload</label>
          
          {!previewUrl ? (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[#1E2638] hover:border-[#D4AF37]/50 rounded-2xl h-72 flex flex-col items-center justify-center p-6 text-center bg-[#080B10] transition-all cursor-pointer group"
            >
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                className="hidden" 
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <div className="p-4 rounded-full bg-[#0F1522] border border-[#1E2638] group-hover:border-[#D4AF37]/40 transition-all mb-3">
                  <Upload className="w-6 h-6 text-[#94A3B8] group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <p className="text-sm font-medium text-white">Drag and drop photo here</p>
                <p className="text-xs text-[#94A3B8] mt-1">or <span className="text-[#D4AF37] underline">browse file</span> from computer</p>
              </label>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 h-72 group">
              <img src={previewUrl} alt="Upload Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  type="button" 
                  onClick={clearFile}
                  className="p-3 bg-rose-500 hover:bg-rose-600 rounded-full text-white transition-all shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">Photo Title</label>
              <span className="text-[10px] text-[#D4AF37] flex items-center gap-1 font-mono">
                <Wand2 size={12} /> Logo + Unique ID
              </span>
            </div>
            <input 
              type="text" 
              name="title"
              value={metadata.title}
              onChange={handleInputChange}
              required 
              placeholder="Auto-generated title..."
              className="w-full bg-[#080B10] border border-[#1E2638] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Category</label>
            <select 
              name="category"
              value={metadata.category}
              onChange={handleInputChange}
              className="w-full bg-[#080B10] border border-[#1E2638] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value="wedding">Wedding</option>
              <option value="prewedding">Pre-Wedding</option>
              <option value="kids">Baby & Kids</option>
              <option value="events">Event / Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Location / Subtitle</label>
            <input 
              type="text" 
              name="location"
              value={metadata.location}
              onChange={handleInputChange}
              placeholder="e.g. Gaya, Bihar"
              className="w-full bg-[#080B10] border border-[#1E2638] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">Description</label>
              <span className="text-[10px] text-[#D4AF37] flex items-center gap-1 font-mono">
                <Wand2 size={12} /> Auto-Generated
              </span>
            </div>
            <textarea 
              name="description"
              rows="3"
              value={metadata.description}
              onChange={handleInputChange}
              placeholder="Auto-generated description..."
              className="w-full bg-[#080B10] border border-[#1E2638] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading || !selectedFile}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
          >
            {isUploading ? 'Uploading to Server...' : 'Post Image to API'}
            <Send className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}