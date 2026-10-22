import React from 'react';
import { CAPABILITIES_DATA } from '../../data/companyData';
import { PlateCalculator } from '../common/PlateCalculator';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Factory,
  Gauge,
  Hammer,
  Flame,
  Ruler,
} from 'lucide-react';

/* ---------- Images (served from /public/images) ---------- */
const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';
const LASER_IMG = '/images/capability_laser_cutting_1791778023419.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';

/**
 * Picks the best image for a capability card by keyword.
 * Anything without a dedicated photo falls back to the hero image,
 * cropped differently so cards don't look identical.
 * When you add more photos to /public/images, just add them here.
 */
const getCapabilityImage = (title: string, idx: number) => {
  const t = title.toLowerCase();
  if (t.includes('laser')) return { src: LASER_IMG, pos: 'center' };
  if (t.includes('bending') || t.includes('forming') || t.includes('rolling'))
    return { src: BENDING_IMG, pos: 'center' };
  const positions = ['left center', 'center top', 'right center', 'center bottom'];
  return { src: HERO_IMG, pos: positions[idx % positions.length] };
};

/* Hides a broken image and lets the dark gradient behind it show */
const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

const STATS = [
  { icon: Factory, label: 'Covered Workshop', value: '30,000+ Sq. Ft.' },
  { icon: Hammer, label: 'Fabrication Bays', value: '3 Heavy Bays' },
  { icon: Gauge, label: 'Max Press Capacity', value: '600 Tonnes' },
  { icon: Ruler, label: 'Plate Bending', value: '3–100 mm Confirmed' },
];

interface CapabilitiesViewProps {
  onOpenRFQ: (initialCapability?: string) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({ onOpenRFQ }) => {
  return (
    <div className="space-y-0">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
        <img
          src={HERO_IMG}
          alt="Heavy fabrication facility"
          onError={hideOnError}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        {/* overlays for readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-40 sm:pt-32 sm:pb-48">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/40 backdrop-blur px-3 py-1">
              <span className="w-2 h-2 bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                Infrastructure &amp; Machinery
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Manufacturing Capability{' '}
              <span className="text-red-500">Under One Roof</span>
            </h1>

            <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Our 30,000+ sq. ft. facility across 3 fabrication bays combines heavy hydraulic
              pressing, CNC laser cutting, oxyfuel profiling, plate bending, certified welding,
              blasting, painting, and non-destructive testing.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenRFQ()}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#machinery"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white hover:bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Explore Machinery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP (overlaps hero) ================= */}
      <section className="relative z-10 -mt-24 sm:-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white shadow-2xl border border-neutral-200 divide-x divide-y md:divide-y-0 divide-neutral-200">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-6 flex items-start gap-4">
                <div className="p-2.5 bg-red-50 text-red-600 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                    {label}
                  </span>
                  <strong className="text-neutral-900 text-base sm:text-lg font-bold">
                    {value}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES GRID ================= */}
      <section id="machinery" className="bg-white py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Our Machinery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Every process, in-house
            </h2>
            <p className="text-neutral-600">
              From raw plate to blasted, painted and tested assemblies — one facility, one point
              of accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES_DATA.map((cap, idx) => {
              const img = getCapabilityImage(cap.title, idx);
              return (
                <article
                  key={cap.id}
                  className="group bg-white border border-neutral-200 flex flex-col overflow-hidden hover:border-red-600 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950">
                    <img
                      src={img.src}
                      alt={cap.title}
                      loading="lazy"
                      onError={hideOnError}
                      style={{ objectPosition: img.pos }}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />

                    <span className="absolute top-3 left-3 text-[11px] font-mono font-bold text-white bg-red-600 px-2 py-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute top-3 right-3 text-[11px] font-mono font-bold text-neutral-900 bg-white/95 px-2 py-1">
                      {cap.capacity}
                    </span>
                    <h3 className="absolute bottom-3 left-4 right-4 text-xl font-bold text-white drop-shadow">
                      {cap.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {cap.description}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Technical Scope
                        </span>
                        <ul className="space-y-1.5 text-xs text-neutral-700">
                          {cap.specifications.map((spec, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 bg-neutral-50 p-2 border border-neutral-200/80"
                            >
                              <Check className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenRFQ(cap.title)}
                      className="w-full py-2.5 bg-neutral-900 group-hover:bg-red-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Enquire Capabilities</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SPOTLIGHT: LASER + BENDING ================= */}
      <section className="bg-neutral-950 text-white">
        {/* Laser */}
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[480px] overflow-hidden bg-neutral-900">
            <img
              src={LASER_IMG}
              alt="CNC laser cutting in progress"
              loading="lazy"
              onError={hideOnError}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-neutral-950/40" />
          </div>
          <div className="flex items-center px-6 sm:px-12 lg:px-16 py-14">
            <div className="max-w-lg space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                <Flame className="w-4 h-4" /> Precision Cutting
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight">
                Clean edges. Tight tolerances. Fast turnaround.
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Our fiber laser handles 0.7 mm to 20 mm in mild steel, stainless and aluminium —
                cutting directly from your CAD data with narrow kerf and minimal distortion.
              </p>
              <button
                onClick={() => onOpenRFQ('CNC Laser Cutting')}
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold uppercase tracking-wider"
              >
                Quote a laser job <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bending */}
        <div className="grid lg:grid-cols-2 border-t border-neutral-800">
          <div className="flex items-center px-6 sm:px-12 lg:px-16 py-14 order-2 lg:order-1">
            <div className="max-w-lg space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                <Hammer className="w-4 h-4" /> Heavy Forming
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight">
                Up to 600 tonnes of forming power.
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Plate bending and rolling from 3 mm to 100 mm, with variable V-die and segment
                tooling for tight cylindrical radii and complex multi-step bends.
              </p>
              <button
                onClick={() => onOpenRFQ('Plate Forming & Bending')}
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold uppercase tracking-wider"
              >
                Quote a forming job <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[480px] overflow-hidden bg-neutral-900 order-1 lg:order-2">
            <img
              src={BENDING_IMG}
              alt="Heavy plate bending and rolling"
              loading="lazy"
              onError={hideOnError}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-neutral-950/40" />
          </div>
        </div>
      </section>

      {/* ================= MATERIALS & INSPECTION ================= */}
      <section className="bg-neutral-50 py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Materials */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                  Material Metallurgy
                </span>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Documented Material Experience
                </h3>
                <p className="text-sm text-neutral-600">
                  Certified welding and forming procedures validated across core engineering
                  alloys:
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-5 border border-neutral-200 border-l-4 border-l-red-600">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-sm text-neutral-900">Mild Steel (Carbon Steel)</strong>
                    <span className="text-xs font-mono text-red-600 font-bold">IS2062 · SA516</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Structural frames, pressure vessel shells, heavy dozer housings, water
                    sprinkler tanks up to 50 KL.
                  </p>
                </div>

                <div className="bg-white p-5 border border-neutral-200 border-l-4 border-l-red-600">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-sm text-neutral-900">Stainless Steel</strong>
                    <span className="text-xs font-mono text-red-600 font-bold">SS304 · SS316</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Chemical process vessels (up to 2m dia × 9m length), food/textile tanks, clean
                    passivated seams.
                  </p>
                </div>
              </div>
            </div>

            {/* NDT */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Non-Destructive Testing
                </span>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Inspection &amp; Non-Destructive Testing
                </h3>
                <p className="text-sm text-neutral-600">
                  Tested and qualified to customer drawings and pressure codes:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    t: 'Ultrasonic Testing (UT)',
                    d: 'Evaluates internal weld volume and thickness for heavy plate weldments.',
                  },
                  {
                    t: 'Liquid Penetrant Testing (LPT)',
                    d: 'Detects surface cracks, undercut, and porosity on structural seams and flanged nozzles.',
                  },
                  {
                    t: 'Radiography (RT)',
                    d: 'Radiographic examination for high-hazard chemical and pressurized vessels.',
                  },
                  {
                    t: 'Hydrostatic Pressure Testing',
                    d: 'Full volumetric water fill testing up to specified design proof pressures.',
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="bg-white p-4 border border-neutral-200 hover:border-red-600 transition-colors"
                  >
                    <ShieldCheck className="w-5 h-5 text-red-600 mb-2" />
                    <strong className="text-sm text-neutral-900 block">{item.t}</strong>
                    <span className="text-xs text-neutral-600">{item.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLATE FEASIBILITY ESTIMATOR ================= */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlateCalculator onQuoteWithSpec={onOpenRFQ} />
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          onError={hideOnError}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-950/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Have a drawing ready?</h3>
            <p className="text-neutral-300">
              Send us your specs and get a feasibility response from our engineering team.
            </p>
          </div>
          <button
            onClick={() => onOpenRFQ()}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors shrink-0"
          >
            Request a Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};