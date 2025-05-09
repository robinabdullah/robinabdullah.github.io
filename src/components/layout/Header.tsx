'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Array of section IDs to track
const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events to update header background and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update header background - more responsive threshold
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const currentPosition = window.scrollY + 100; // Offset to trigger section earlier
      
      // Find the current section by checking section positions
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i]);
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#030014]/85 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-[5%]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              Abdullah Robin
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              <NavLink href="#home" label="Home" isActive={activeSection === 'home'} />
              <NavLink href="#about" label="About" isActive={activeSection === 'about'} />
              <NavLink href="#skills" label="Skills" isActive={activeSection === 'skills'} />
              <NavLink href="#projects" label="Projects" isActive={activeSection === 'projects'} />
              <NavLink href="#contact" label="Contact" isActive={activeSection === 'contact'} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#030014]/95 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <MobileNavLink href="#home" label="Home" onClick={toggleMenu} isActive={activeSection === 'home'} />
            <MobileNavLink href="#about" label="About" onClick={toggleMenu} isActive={activeSection === 'about'} />
            <MobileNavLink href="#skills" label="Skills" onClick={toggleMenu} isActive={activeSection === 'skills'} />
            <MobileNavLink href="#projects" label="Projects" onClick={toggleMenu} isActive={activeSection === 'projects'} />
            <MobileNavLink href="#contact" label="Contact" onClick={toggleMenu} isActive={activeSection === 'contact'} />
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Navigation Link with hover effect and active state
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link 
      href={href} 
      className={`group relative px-1 py-2 text-sm font-medium ${
        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
      } transition-colors duration-300`}
    >
      {label}
      <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#6366f1] transform ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      } origin-left transition-transform duration-300 ease-out`}></span>
    </Link>
  );
}

// Mobile Navigation Link with active state
function MobileNavLink({ 
  href, 
  label, 
  onClick, 
  isActive 
}: { 
  href: string; 
  label: string; 
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <Link 
      href={href} 
      className={`block py-2 px-3 rounded transition-colors duration-300 ${
        isActive 
        ? 'text-white bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 border-l-2 border-[#a855f7]' 
        : 'text-gray-300 hover:text-white hover:bg-[#ffffff10]'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}