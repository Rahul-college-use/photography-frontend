import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Video,
  Heart,
  Smile,
  Star,
  MapPin,
  Clock,
  Send,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Loader2,
  Lock,
  ZoomIn
} from 'lucide-react';

const FALLBACK_PORTFOLIO = [
  {
    id: 1,
    title: "Sonu Photography & Videography #9X2K",
    category: "wedding",
    location: "Patna, Bihar",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    description: "Capturing grand traditional rituals and royal ambiance in full high-definition detail."
  },
  {
    id: 2,
    title: "Sonu Photography & Videography #3K9P",
    category: "prewedding",
    location: "Gaya, Bihar",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=80",
    description: "Outdoor sunset shoot featuring dramatic lighting, natural poses, and warm golden tones."
  },
  {
    id: 3,
    title: "Sonu Photography & Videography #7B9X",
    category: "kids",
    location: "Newborn Photography",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1600&q=80",
    description: "Soft, cozy studio lighting setups tailored for safe and cute newborn photography."
  }
];

const STATS = [
  { label: "Weddings Filmed", value: "350+" },
  { label: "Google Rating", value: "5.0 ★" },
  { label: "Cinematic Reels", value: "1,200+" },
  { label: "Happy Couples", value: "500+" }
];

const SERVICES = [
  {
    icon: <Heart className="w-7 h-7 text-[#D4AF37]" />,
    title: "Wedding Films",
    description: "Comprehensive traditional & candid photography capturing every emotional moment."
  },
  {
    icon: <Video className="w-7 h-7 text-[#D4AF37]" />,
    title: "Pre-Wedding Shoots",
    description: "Concept-driven outdoor shoots with cinematic framing, direction, and color grading."
  },
  {
    icon: <Smile className="w-7 h-7 text-[#D4AF37]" />,
    title: "Newborn & Baby",
    description: "Cozy, safe, and creative portrait sessions tailored specifically for toddlers and newborns."
  },
  {
    icon: <Camera className="w-7 h-7 text-[#D4AF37]" />,
    title: "Reels & Teasers",
    description: "Modern 4K video editing, high-energy Instagram reels, and event highlight trailers."
  }
];

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    date: '',
    message: ''
  });

  // Fetch live photos from backend API
  // client/src/pages/Home.jsx

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // 🔴 Professional Way: VITE_API_BASE_URL Environment Variable Use
        const API_BASE = 'https://photography-backend-c5oi.onrender.com';
        const response = await fetch(`${API_BASE}/api/photos`);
        console.log(API_BASE)

        if (!response.ok) throw new Error('Failed to fetch photos');
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          const formattedPhotos = result.data.map(item => ({
            id: item._id,
            title: item.title,
            category: item.category,
            location: item.location || 'Patna, Bihar',
            image: item.imageUrl,
            description: item.description || ''
          }));
          setPortfolio(formattedPhotos);
        } else {
          setPortfolio(FALLBACK_PORTFOLIO);
        }
      } catch (err) {
        console.warn('API connection offline, displaying fallback images:', err);
        setPortfolio(FALLBACK_PORTFOLIO);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);
  
  const filteredPortfolio = activeCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === activeCategory);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPortfolio.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "918102138301";
    const text = `Hello Sonu Photography! I would like to inquire about a booking.%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Service:* ${encodeURIComponent(formData.service)}%0A` +
      `*Event Date:* ${encodeURIComponent(formData.date)}%0A` +
      `*Details:* ${encodeURIComponent(formData.message)}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#080B10] text-[#E2E8F0] font-sans relative overflow-x-hidden">

      {/* Background Lighting Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-[#B38728]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0C1017]/90 backdrop-blur-md border-b border-[#1E2638]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <a href="#" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-serif font-bold tracking-wider bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] bg-clip-text text-transparent">
              SONU FILMS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-8 text-[#CBD5E1] font-medium text-xs uppercase tracking-widest">
            <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Showcase</a></li>
            <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Experience</a></li>
            <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Studio</a></li>
            <li>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2638] text-[#94A3B8] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all text-[11px]"
              >
                <Lock className="w-3 h-3" />
                Admin
              </Link>
            </li>
            <li>
              <a
                href="#booking"
                className="px-6 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:bg-gradient-to-r hover:from-[#F3E092] hover:to-[#D4AF37] hover:text-[#080B10] transition-all shadow-sm"
              >
                Reserve Date
              </a>
            </li>
          </ul>

          <button
            className="md:hidden text-[#E2E8F0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1E2638] bg-[#0C1017] px-6 py-5 flex flex-col gap-4 text-[#E2E8F0] font-medium text-xs uppercase tracking-widest">
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Showcase</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Studio</a>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8]">Admin Dashboard</Link>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="text-[#D4AF37] font-bold">Reserve Date →</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 py-20 bg-[#080B10]">
        <div className="max-w-4xl z-10 space-y-8">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#131B29] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            5.0 Rated Studio in Patna
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
              Transforming Moments Into <br />
              <span className="bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] bg-clip-text text-transparent italic font-normal">
                Timeless Art
              </span>
            </h1>
          </div>

          <p className="text-[#94A3B8] text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Specializing in Luxury Candid Weddings, Cinematic Pre-Wedding Tales, & Fine-Art Baby Portraits in Patna.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] text-[#080B10] px-8 py-4 rounded-full font-bold shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all"
            >
              Reserve Your Date
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-[#131B29] border border-[#1E2638] text-[#E2E8F0] px-8 py-4 rounded-full font-semibold hover:border-[#D4AF37]/50 transition-all"
            >
              Explore Showcase
            </a>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-[#1E2638]">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37]">{stat.value}</div>
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-32">

        {/* Portfolio Showcase */}
        <section id="portfolio" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Curated Showcase</h2>
            <p className="text-[#94A3B8] text-sm md:text-base">Click on any photo to inspect high quality in full screen</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'All Works', value: 'all' },
              { label: 'Weddings', value: 'wedding' },
              { label: 'Pre-Wedding', value: 'prewedding' },
              { label: 'Baby & Kids', value: 'kids' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${activeCategory === tab.value
                    ? 'bg-gradient-to-r from-[#F3E092] to-[#D4AF37] text-[#080B10] font-bold shadow-md'
                    : 'bg-[#131B29] border border-[#1E2638] text-[#94A3B8] hover:border-[#D4AF37]/40 hover:text-[#E2E8F0]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#D4AF37]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm text-[#94A3B8]">Loading portfolio from database...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group bg-[#0F1522] border border-[#1E2638] rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Image Container with No Cropping */}
                  <div className="w-full aspect-[4/5] overflow-hidden relative bg-[#080B10]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#080B10]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider">
                      {item.category}
                    </div>

                    {/* Lightbox Maximize Overlay */}
                    <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#080B10]/80 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080B10] transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Info Box */}
                  <div className="p-6 space-y-2 border-t border-[#1E2638]/50 bg-[#0F1522]">
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{item.location}</span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-[#64748B] line-clamp-2 pt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Services Section */}
        <section id="services" className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Signature Experience</h2>
            <p className="text-[#94A3B8] text-sm md:text-base">Tailored coverage designed for your most celebrated occasions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#0F1522] border border-[#1E2638] p-8 rounded-2xl space-y-4 hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="p-3 bg-[#D4AF37]/10 w-fit rounded-xl border border-[#D4AF37]/20">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#D4AF37]">{service.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Studio Section */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0F1522] border border-[#1E2638] p-8 md:p-12 rounded-3xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              About Sonu Photography
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Crafting Memories That Live For Generations
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed font-light">
              Based in North Sri Krishna Puri, Patna, Sonu Photography & Films is dedicated to documenting love, family heritage, and grand celebrations. We blend traditional ceremonial reverence with modern cinematic aesthetics.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#080B10] border border-[#1E2638]">
                <Award className="w-5 h-5 text-[#D4AF37] mb-2" />
                <h4 className="text-sm font-semibold text-white">5.0 Star Rated</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">Top-reviewed Google Profile</p>
              </div>
              <div className="p-4 rounded-xl bg-[#080B10] border border-[#1E2638]">
                <Users className="w-5 h-5 text-[#D4AF37] mb-2" />
                <h4 className="text-sm font-semibold text-white">Dedicated Crew</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">Professional Cinematographers</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#1E2638] h-[380px]">
            <img
              // src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" 
              src='\logo.png'
              alt="Studio Setup"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#080B10]/90 border border-[#1E2638]">
              <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">Patna Studio Headquarters</p>
              <p className="text-sm text-[#E2E8F0] mt-1">Sai Photo Framing Store, North Sri Krishna Puri, Patna, Bihar 800013</p>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking" className="bg-[#0F1522] border border-[#D4AF37]/30 rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 flex flex-col justify-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Begin Your Experience</h2>
                <p className="text-[#CBD5E1] leading-relaxed mt-3 font-light">
                  Reserve your date in advance to guarantee dedicated studio coverage for your wedding or special event.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Studio Location</h4>
                    <p className="text-sm text-[#94A3B8] mt-0.5">Sai Photo Framing Store, North Sri Krishna Puri, Patna, Bihar 800013</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Availability</h4>
                    <p className="text-sm text-[#94A3B8] mt-0.5">Open 24 Hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                    <Star className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Client Rating</h4>
                    <p className="text-sm text-[#94A3B8] mt-0.5">5.0 Star Rating on Google Profile</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5 bg-[#080B10] p-8 rounded-2xl border border-[#1E2638]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#0F1522] border border-[#1E2638] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Event Type</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0F1522] border border-[#1E2638] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="" disabled>Select Event Category</option>
                  <option value="Wedding Photography">Wedding Photography</option>
                  <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                  <option value="Baby / Kids Shoot">Baby / Kids Shoot</option>
                  <option value="Event Photography">Event Photography</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Event Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0F1522] border border-[#1E2638] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">Event Details</label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Venue details or custom requirements..."
                  className="w-full bg-[#0F1522] border border-[#1E2638] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F3E092] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold py-4 rounded-xl shadow-md hover:brightness-110 transition-all"
              >
                Inquire via WhatsApp (+91 8102138301)
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Lightbox Modal with Smooth Hover-Zoom */}
      {selectedPhotoIndex !== null && filteredPortfolio[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#080B10]/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#0F1522] text-white hover:text-[#D4AF37] border border-[#1E2638] transition-all shadow-xl"
          >
            <X size={24} />
          </button>

          {/* Previous Photo Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 z-50 p-3 rounded-full bg-[#0F1522]/80 text-white hover:text-[#D4AF37] border border-[#1E2638] transition-all shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 z-50 p-3 rounded-full bg-[#0F1522]/80 text-white hover:text-[#D4AF37] border border-[#1E2638] transition-all shadow-xl"
          >
            <ChevronRight size={28} />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-5xl w-full flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo Container with Smooth Hover-Zoom */}
            <div className="overflow-hidden max-h-[75vh] max-w-full rounded-2xl border border-[#1E2638] bg-[#000000] shadow-2xl group cursor-zoom-in">
              <img
                src={filteredPortfolio[selectedPhotoIndex].image}
                alt={filteredPortfolio[selectedPhotoIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-150 transform-gpu origin-center"
              />
            </div>

            {/* Photo Details */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#D4AF37]">
                {filteredPortfolio[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-[#94A3B8] flex items-center justify-center gap-1.5 font-mono">
                <ZoomIn size={14} className="text-[#D4AF37]" /> Hover over photo to zoom & inspect sharp details
              </p>
              {filteredPortfolio[selectedPhotoIndex].description && (
                <p className="text-xs text-[#64748B] max-w-xl mx-auto pt-1 font-light">
                  {filteredPortfolio[selectedPhotoIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#1E2638] py-10 text-center text-xs text-[#94A3B8] uppercase tracking-widest">
        <p>&copy; 2026 Sonu Photography & Films. All rights reserved.</p>
      </footer>

    </div>
  );
}