import React from 'react';
import { CORE_SERVICES, WORK_PROCESS_STEPS } from '../../data/companyData';
import { ArrowRight, Check, Sliders, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PlateCalculator } from '../common/PlateCalculator';

const LASER_IMG = '/images/capability_laser_cutting_1791778023419.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';

interface ServicesViewProps {
  onOpenRFQ: (initialService?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenRFQ }) => {
  return (
    <div className="space-y-0">
      
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                FABRICATION SERVICES
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Precision Cutting & Controlled Plate Forming
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our core fabrication services are focused on precision cutting and controlled plate forming for industrial components and custom fabrication requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="bg-white py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Service 01: CNC Laser Cutting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1">
                  SERVICE 01
                </span>
                <span className="text-xs font-mono uppercase text-neutral-400">
                  CNC High-Power Fiber Laser
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Precision CNC Laser Cutting
              </h2>
              <div className="text-2xl font-mono font-bold text-red-600">
                0.7 – 20 mm Thickness Scope
              </div>
              <p className="text-base text-neutral-700 leading-relaxed">
                CNC laser cutting for industrial components, fabricated parts and custom profiles from 0.7–20 mm thickness. Fast CAD to cut toolpath conversion delivers sharp edge geometry and minimal heat dissipation.
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Service Deliverables
                </h4>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Clean edge perpendicularity and minimal heat-affected zone (HAZ)</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Complex geometric contours, mounting holes, slots and custom profiles</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Material scope across Mild Steel, Stainless Steel and Aluminium</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Direct DXF / DWG nesting optimization for maximum plate yield</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenRFQ('CNC Laser Cutting')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
                >
                  <span>Request Laser Cutting Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-neutral-300 overflow-hidden shadow-lg bg-neutral-100">
                <img
                  src={LASER_IMG}
                  alt="Precision CNC Laser cutting machine in operation at Saghai Engineering"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200" />

          {/* Service 02: Plate Bending */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="border border-neutral-300 overflow-hidden shadow-lg bg-neutral-100">
                <img
                  src={BENDING_IMG}
                  alt="Industrial heavy plate bending press brake at Saghai Engineering"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1">
                  SERVICE 02
                </span>
                <span className="text-xs font-mono uppercase text-neutral-400">
                  Controlled Heavy Plate Forming
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Industrial Plate Bending
              </h2>
              <div className="text-2xl font-mono font-bold text-red-600">
                3 – 50 mm Customer-Confirmed Scope
              </div>
              <p className="text-base text-neutral-700 leading-relaxed">
                Controlled plate bending for fabricated components requiring accurate geometry and forming, from 3–50 mm current customer-confirmed capability.
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Service Deliverables
                </h4>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Customer-confirmed bending capability spanning 3 mm up to 50 mm plate thickness</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Cylindrical vessel shell rolling and multi-radius segment forming</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Heavy channels, stiffeners, earthmoving brackets and structural flanges</span>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 p-2.5 border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>Crown-compensated tonnage distribution to avoid middle deflection</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenRFQ('Industrial Plate Bending')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
                >
                  <span>Request Plate Bending Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Process Flow */}
      <section className="bg-neutral-50/70 py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              MANUFACTURING PIPELINE
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Drawing → Review → Fabrication → Inspection → Delivery
            </h2>
            <p className="text-sm text-neutral-600">
              Clear stage-gate execution for dependable dimensional accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORK_PROCESS_STEPS.map((s) => (
              <div key={s.step} className="bg-white p-5 border border-neutral-200 space-y-2">
                <span className="text-xs font-mono font-bold text-red-600">
                  STEP {s.step}
                </span>
                <h3 className="text-base font-bold text-neutral-900">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Embedded Feasibility Calculator */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlateCalculator onQuoteWithSpec={onOpenRFQ} />
        </div>
      </section>

    </div>
  );
};
