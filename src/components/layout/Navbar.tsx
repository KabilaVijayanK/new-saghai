import React, { useState } from 'react';
import { ActivePage } from '../../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenRFQ }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Products', page: 'products' },
    { label: 'Services', page: 'services' },
    { label: 'Capabilities', page: 'capabilities' },
    { label: 'Projects', page: 'projects' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleLinkClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-sm"
            aria-label="Saghai Engineering home"
          >
            <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
              <img src="/images/logo-display.png" alt="Saghai" className="h-auto w-28 sm:w-32" />
              <span className="text-[14px] font-mono tracking-widest text-black uppercase">
                Engineering 
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[13px] xl:text-sm font-medium text-neutral-700">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-red-600 font-semibold'
                      : 'text-neutral-700 hover:text-red-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenRFQ}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 whitespace-nowrap shrink-0"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenRFQ}
              className="px-3 py-1.5 text-xs font-semibold uppercase text-white bg-red-600"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`text-left py-2 px-3 text-sm font-medium rounded ${
                  activePage === link.page ? 'bg-red-50 text-red-600 font-semibold' : 'text-neutral-700'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 shadow-sm"
              >
                Request a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
