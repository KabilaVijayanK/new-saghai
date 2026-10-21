import React from 'react';
import { ActivePage } from '../../types';
import { COMPANY_INFO } from '../../data/companyData';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFQ }) => {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      {/* Top Engineering Summary Strip */}
      <div className="border-b border-neutral-800/80 bg-neutral-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Facility Scale
              </span>
              <p className="text-lg font-semibold text-white tracking-tight">
                30,000+ Sq. Ft. Covered Area
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                3 Dedicated Heavy Fabrication Bays
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Pressing & Forming
              </span>
              <p className="text-lg font-semibold text-white tracking-tight">
                Up to 600 Tonnes Press
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                3–50 mm Plate Bending Capability
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Precision CNC Cutting
              </span>
              <p className="text-lg font-semibold text-white tracking-tight">
                0.7–20 mm Fiber Laser
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Up to 150 mm CNC Oxyfuel Cutting
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Quality Verification
              </span>
              <p className="text-lg font-semibold text-white tracking-tight">
                Full NDT & Hydrostatic
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                UT · LPT · Radiography · Pressure Tests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Location */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand & Legacy (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col items-start">
              <img src="/images/logo-display.png" alt="Saghai" className="h-auto w-36" />
              <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Engineering · Coimbatore
              </span>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed">
              Custom engineered products and heavy metal fabrication built around customer drawings, technical specifications and application requirements since 1978.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenRFQ}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <span>Discuss Your Requirement</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-white transition-colors"
                >
                  Manufacturing Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Laser Cutting & Bending
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors"
                >
                  Fabricated Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white transition-colors"
                >
                  Project Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors"
                >
                  Industries Served
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Saghai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & RFQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Manufactured Products (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Pressure Vessels</li>
              <li>Industrial Storage Tanks</li>
              <li>Process Heat Exchangers</li>
              <li>Earthmoving Equipment Components</li>
              <li>Industrial Structures & Frames</li>
              <li>Process Plant Components</li>
              <li>Sheet Metal Components</li>
              <li>Compression Dish Ends</li>
            </ul>
          </div>

          {/* Column 4: Works & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
              Manufacturing Works
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="text-xs">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© 1978 – {new Date().getFullYear()} Saghai Engineering. All rights reserved.</span>
            <span>·</span>
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-neutral-400">
            <span>MS · SS · FABRICATION</span>
            <span>·</span>
            <span>ASME / IS DRAWING COMPLIANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
