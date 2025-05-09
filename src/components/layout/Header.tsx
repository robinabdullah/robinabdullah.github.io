'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to add background to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    } transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold">
              <span className="gradient-text">Robin Abdullah</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="#home" className="hover:text-primary-light">Home</Link></li>
              <li><Link href="#about" className="hover:text-primary-light">About</Link></li>
              <li><Link href="#skills" className="hover:text-primary-light">Skills</Link></li>
              <li><Link href="#projects" className="hover:text-primary-light">Projects</Link></li>
              <li><Link href="#contact" className="hover:text-primary-light">Contact</Link></li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
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
        <div className="md:hidden bg-white shadow-md">
          <ul className="px-4 pt-2 pb-4 space-y-2">
            <li><Link href="#home" className="block py-2 hover:text-primary-light" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="#about" className="block py-2 hover:text-primary-light" onClick={toggleMenu}>About</Link></li>
            <li><Link href="#skills" className="block py-2 hover:text-primary-light" onClick={toggleMenu}>Skills</Link></li>
            <li><Link href="#projects" className="block py-2 hover:text-primary-light" onClick={toggleMenu}>Projects</Link></li>
            <li><Link href="#contact" className="block py-2 hover:text-primary-light" onClick={toggleMenu}>Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}