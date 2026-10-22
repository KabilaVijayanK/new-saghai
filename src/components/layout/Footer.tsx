import React from 'react';
import { ActivePage } from '../../types';
import { COMPANY_INFO } from '../../data/companyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: () => void;
}

const SPECS = [
  { label: 'Facility Scale', value: '30,000+', unit: 'Sq. Ft.', note: '3 dedicated heavy fabrication bays' },
  { label: 'Pressing & Forming', value: '600', unit: 'Tonnes', note: '3–100 mm plate bending capability' },
  { label: 'Precision CNC Cutting', value: '0.7–20', unit: 'mm Fiber Laser', note: 'Up to 150 mm CNC oxyfuel cutting' },
  { label: 'Quality Verification', value: 'Full NDT', unit: '& Hydro', note: 'UT · LPT · Radiography · Pressure tests' },
];

const NAV_LINKS: { label: string; page: ActivePage }[] = [
  { label: 'Home Overview', page: 'home' },
  { label: 'Manufacturing Capabilities', page: 'capabilities' },
  { label: 'Laser Cutting & Bending', page: 'services' },
  { label: 'Fabricated Products', page: 'products' },
  { label: 'Project Portfolio', page: 'projects' },
  { label: 'Industries Served', page: 'industries' },
  { label: 'About Saghai', page: 'about' },
  { label: 'Contact & RFQ', page: 'contact' },
];

const PRODUCTS = [
  'Pressure Vessels',
  'Industrial Storage Tanks',
  'Process Heat Exchangers',
  'Earthmoving Equipment Components',
  'Industrial Structures & Frames',
  'Process Plant Components',
  'Sheet Metal Components',
  'Compression Dish Ends',
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRFQ }) => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-neutral-950 text-white overflow-hidden">
      {/* CTA band */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-red-100/90 mb-2">
              Request for Quotation
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              Have a drawing or specification? <span className="text-red-100">Let's build it.</span>
            </h3>
          </div>
          <button
            onClick={onOpenRFQ}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors shrink-0"
          >
            Discuss Your Requirement
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Engineering spec strip */}
      <div className="relative border-b border-neutral-800">
        {/* blueprint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-800 border-x border-neutral-800">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="group p-6 lg:p-8 border-b border-neutral-800 lg:border-b-0 hover:bg-neutral-900/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-5 bg-red-500 transition-all group-hover:w-8" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {s.label}
                  </span>
                </div>
                <p className="flex items-baseline gap-1.5">
                  <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                    {s.value}
                  </span>
                  <span className="text-xs font-mono uppercase text-red-400">{s.unit}</span>
                </p>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col items-start">
              <img src="/images/logo-display.png" alt="Saghai" className="h-auto w-36" />
              <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Engineering · Coimbatore
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Custom engineered products and heavy metal fabrication built around customer
              drawings, technical specifications and application requirements since 1978.
            </p>

            <div className="inline-flex items-center gap-3 border border-neutral-800 px-4 py-3">
              <span className="text-2xl font-semibold text-white tracking-tight">1978</span>
              <span className="h-6 w-px bg-neutral-700" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 leading-snug">
                Fabricating<br />since
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-5 pb-3 border-b border-neutral-800">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => onNavigate(l.page)}
                    className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-left"
                  >
                    <ArrowRight className="w-3 h-3 -ml-4 opacity-0 text-red-500 transition-all group-hover:ml-0 group-hover:opacity-100" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-5 pb-3 border-b border-neutral-800">
              Product Categories
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              {PRODUCTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-1 bg-red-500 shrink-0" />
                  <button
                    onClick={() => onNavigate('products')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-5 pb-3 border-b border-neutral-800">
              Manufacturing Works
            </h4>
            <div className="space-y-4 text-sm text-neutral-400">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 border border-neutral-800 shrink-0">
                  <MapPin className="w-4 h-4 text-red-500" />
                </span>
                <span className="leading-relaxed pt-0.5">{COMPANY_INFO.location}</span>
              </div>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 border border-neutral-800 group-hover:border-red-600 group-hover:bg-red-600 transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
                </span>
                {COMPANY_INFO.phone}
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group flex items-center gap-3 hover:text-white transition-colors break-all"
              >
                <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 border border-neutral-800 group-hover:border-red-600 group-hover:bg-red-600 transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
                </span>
                {COMPANY_INFO.email}
              </a>

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 border border-neutral-800 shrink-0">
                  <Clock className="w-4 h-4 text-neutral-500" />
                </span>
                <span className="text-xs">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© 1978 – {new Date().getFullYear()} Saghai Engineering. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="border border-neutral-800 px-2.5 py-1 text-neutral-400">MS · SS · Fabrication</span>
            <span className="border border-neutral-800 px-2.5 py-1 text-neutral-400">ASME / IS Drawing Compliance</span>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};