import React from 'react';
import { CAPABILITIES_DATA } from '../../data/companyData';
import { PlateCalculator } from '../common/PlateCalculator';
import { ArrowRight, Check, ShieldCheck, Factory, Gauge, Hammer, Flame, Ruler } from 'lucide-react';

const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';
const LASER_IMG = '/images/capability_laser_cutting_1791778023419.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';

interface CapabilitiesViewProps {
  onOpenRFQ: (initialCapability?: string) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({ onOpenRFQ }) => {
  return (
    <div className="space-y-0">
      
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                INFRASTRUCTURE & MACHINERY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Manufacturing Capability Under One Roof
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our 30,000+ sq. ft. facility across 3 fabrication bays combines heavy hydraulic pressing, CNC laser cutting, oxyfuel profiling, plate bending, certified welding, blasting, painting, and non-destructive testing.
            </p>
          </div>
        </div>
      </section>

      {/* Facility Scope Strip */}
      <section className="bg-neutral-950 text-white py-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block uppercase">Covered Workshop</span>
              <strong className="text-white text-base">30,000+ Sq. Ft.</strong>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">Fabrication Bays</span>
              <strong className="text-white text-base">3 Heavy Bays</strong>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">Max Press Capacity</span>
              <strong className="text-white text-base">600 Tonnes</strong>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">Plate Bending</span>
              <strong className="text-white text-base">3–50 mm Confirmed</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities List */}
      <section className="bg-white py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES_DATA.map((cap, idx) => (
              <div
                key={cap.id}
                className="bg-white border border-neutral-200 p-8 flex flex-col justify-between space-y-6 hover:border-red-600 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="text-xs font-mono font-bold text-red-600">
                      MACHINERY {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5">
                      {cap.capacity}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900">
                    {cap.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {cap.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Technical Scope:
                    </span>
                    <div className="space-y-1.5 text-xs text-neutral-700">
                      {cap.specifications.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2 bg-neutral-50 p-2 border border-neutral-200/80">
                          <Check className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => onOpenRFQ(cap.title)}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-red-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>Enquire Capabilities</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Materials & Inspection Matrix */}
      <section className="bg-neutral-50/70 py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Materials (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                  MATERIAL METALLURGY
                </span>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Documented Material Experience
                </h3>
                <p className="text-sm text-neutral-600">
                  Certified welding and forming procedures validated across core engineering alloys:
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 border border-neutral-200">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-sm text-neutral-900">Mild Steel (Carbon Steel)</strong>
                    <span className="text-xs font-mono text-red-600 font-bold">IS2062 · SA516</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Structural frames, pressure vessel shells, heavy dozer housings, water sprinkler tanks up to 50 KL.
                  </p>
                </div>

                <div className="bg-white p-4 border border-neutral-200">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-sm text-neutral-900">Stainless Steel</strong>
                    <span className="text-xs font-mono text-red-600 font-bold">SS304 · SS316</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Chemical process vessels (up to 2m dia × 9m length), food/textile tanks, clean passivated seams.
                  </p>
                </div>

                
              </div>
            </div>

            {/* Quality & Inspection (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  NON-DESTRUCTIVE TESTING
                </span>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Inspection & Non-Destructive Testing
                </h3>
                <p className="text-sm text-neutral-600">
                  Tested and qualified to customer drawings and pressure codes:
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 border border-neutral-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-neutral-900 block">Ultrasonic Testing (UT)</strong>
                    <span className="text-xs text-neutral-600">
                      Evaluates internal weld volume and thickness for heavy plate weldments.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 border border-neutral-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-neutral-900 block">Liquid Penetrant Testing (LPT)</strong>
                    <span className="text-xs text-neutral-600">
                      Detects surface cracks, undercut, and porosity on structural seams and flanged nozzles.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 border border-neutral-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-neutral-900 block">Radiography (RT)</strong>
                    <span className="text-xs text-neutral-600">
                      Radiographic examination for high-hazard chemical and pressurized vessels.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 border border-neutral-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm text-neutral-900 block">Hydrostatic Pressure Testing</strong>
                    <span className="text-xs text-neutral-600">
                      Full volumetric water fill testing up to specified design proof pressures.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Plate Feasibility Estimator */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlateCalculator onQuoteWithSpec={onOpenRFQ} />
        </div>
      </section>

    </div>
  );
};
