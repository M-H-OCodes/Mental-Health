import React, { useState } from 'react';
import { Menu, X, ChevronDown, BookOpen, Video, PenSquare, Info, LogIn, LogOut, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, blogId?: string) => void;
  currentUser: { email: string; name?: string } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onLogout,
  onOpenAuth,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-[#A4D7C9] text-[#333333] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNav('home')}
          >
            <img
              src="ECOMIND-removebg-preview.png"
              alt="ECOMIND Logo"
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wider text-[#1e4d4a]">ECOMIND</span>
              <span className="text-xs text-[#2a6252] font-medium hidden sm:inline">Mental Well-being for Youth</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNav('home')}
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-[#1e4d4a] font-bold bg-[#8ecdbd]/40'
                  : 'text-[#333333] hover:text-[#1e4d4a]'
              }`}
            >
              Home
            </button>

            {/* Explore Dropdown & Hub */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 250)}
                className={`flex items-center gap-1 font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'explore' || currentView === 'blogs' || currentView === 'videos'
                    ? 'text-[#1e4d4a] font-bold bg-[#8ecdbd]/40'
                    : 'text-[#333333] hover:text-[#1e4d4a]'
                }`}
              >
                <span>Explore</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-[#5AA59E] rounded-xl shadow-xl overflow-hidden py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-[#488b85]">
                  <button
                    onClick={() => handleNav('explore')}
                    className="w-full text-left px-4 py-2.5 text-white hover:bg-[#488b85] flex items-center gap-2 text-sm transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">Explore Hub</span>
                  </button>
                  <button
                    onClick={() => handleNav('blogs')}
                    className="w-full text-left px-4 py-2.5 text-white hover:bg-[#488b85] flex items-center gap-2 text-sm transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>All Blogs</span>
                  </button>
                  <button
                    onClick={() => handleNav('videos')}
                    className="w-full text-left px-4 py-2.5 text-white hover:bg-[#488b85] flex items-center gap-2 text-sm transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Videos</span>
                  </button>
                  <button
                    onClick={() => handleNav('guide')}
                    className="w-full text-left px-4 py-2.5 text-white hover:bg-[#488b85] flex items-center gap-2 text-sm transition-colors border-t border-[#488b85] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Well-being Guide</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('write-blog')}
              className={`font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'write-blog'
                  ? 'text-[#1e4d4a] font-bold bg-[#8ecdbd]/40'
                  : 'text-[#333333] hover:text-[#1e4d4a]'
              }`}
            >
              <PenSquare className="w-4 h-4" />
              <span>Write a Blog</span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                currentView === 'about'
                  ? 'text-[#1e4d4a] font-bold bg-[#8ecdbd]/40'
                  : 'text-[#333333] hover:text-[#1e4d4a]'
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Right Action / Auth */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1e4d4a] bg-[#d2f8eb] px-3 py-1 rounded-full">
                  👤 {currentUser.name || currentUser.email.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#333333] hover:text-[#1e4d4a] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#A4D7C9] border-t border-[#8ecdbd] px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'home' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNav('blogs')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'blogs' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            📖 All Blogs
          </button>
          <button
            onClick={() => handleNav('videos')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'videos' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            🎥 Videos
          </button>
          <button
            onClick={() => handleNav('guide')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'guide' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            ✨ Well-being Guide
          </button>
          <button
            onClick={() => handleNav('write-blog')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'write-blog' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            ✍️ Write a Blog
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentView === 'about' ? 'bg-[#8ecdbd]/60 font-bold' : ''
            }`}
          >
            ℹ️ About Us
          </button>

          <div className="pt-4 border-t border-[#8ecdbd]">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1e4d4a]">
                  Logged in as {currentUser.name || currentUser.email}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-[#5AA59E] text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full bg-[#5AA59E] text-white py-2.5 rounded-lg text-sm font-medium"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
