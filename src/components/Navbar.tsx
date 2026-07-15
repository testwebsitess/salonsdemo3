import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { openingHours } from '../data';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Bridal & Party' },
    { id: 'tour', label: 'Virtual Tour' },
    { id: 'team', label: 'Meet Team' },
    { id: 'booking', label: 'Book' },
    { id: 'contact', label: 'Location' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#111827]/90 backdrop-blur-md py-3 shadow-lg border-b border-[#d4af37]/10'
          : 'bg-gradient-to-b from-[#111827]/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-start cursor-pointer group text-left"
        >
          <span className="font-serif text-2xl md:text-3xl text-[#dfb48c] tracking-widest font-bold uppercase transition-colors group-hover:text-[#d4af37]">
            ZARIA
          </span>
          <span className="font-sans text-[9px] text-[#d4af37] tracking-[0.3em] uppercase leading-none">
            Premium Beauty Salon
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 text-xs font-sans font-medium tracking-widest uppercase transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'text-[#d4af37]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#d4af37] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${openingHours.phone}`}
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-[#d4af37] transition-colors font-mono tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Call Us</span>
          </a>
          
          <button
            onClick={() => handleNavClick('booking')}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#dfb48c] text-[#111827] text-xs font-sans font-bold tracking-widest uppercase px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-300 hover:text-[#d4af37] transition-colors p-2 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#111827]/98 backdrop-blur-xl border-b border-[#d4af37]/15 py-6 px-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-xl text-left text-xs font-sans font-medium tracking-widest uppercase transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-[1px] bg-gray-800 my-2" />

          <div className="flex items-center justify-between gap-4 mt-2">
            <a
              href={`tel:${openingHours.phone}`}
              className="flex items-center gap-2 text-xs text-gray-300 hover:text-[#d4af37] transition-colors font-mono py-2"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>{openingHours.phone}</span>
            </a>

            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center gap-2 bg-[#d4af37] text-[#111827] text-xs font-sans font-bold tracking-widest uppercase px-5 py-3 rounded-xl hover:bg-white transition-all cursor-pointer flex-1 justify-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
