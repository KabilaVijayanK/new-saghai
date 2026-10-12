import React from 'react';
import { ActivePage } from '../../types';
import { 
  WORK_PROCESS_STEPS, 
  CAPABILITIES_DATA, 
  LEADERSHIP_TEAM, 
  APPROVED_CUSTOMERS, 
  PRODUCT_CATEGORIES, 
  INDUSTRIES_SERVED 
} from '../../data/companyData';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  Users, 
  Building2, 
  Layers, 
  Check, 
  Compass 
} from 'lucide-react';

const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

interface AboutViewProps {
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenRFQ }) => {
  return (
    <div className="space-y-0">
      
      {/* 1. HERO */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                ABOUT SAGHAI ENGINEERING
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Engineering Experience Built Since 1978
            </h1>
            
            <p className="text-lg text-neutral-300 leading-relaxed">
              For more than five decades, Saghai Engineering has built its experience around custom metal fabrication and engineered products for industrial applications.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="bg-white py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                A Fabrication Legacy That Continues to Evolve
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Saghai Engineering was established in 1978 with a focus on metal fabrication and customer-specific manufacturing requirements.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Over the years, the company has developed experience across pressure vessels, storage tanks, heat exchangers, earthmoving equipment components, industrial structures, process plant components and sheet metal products.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Today, Saghai Engineering combines established fabrication knowledge with modern manufacturing capabilities to support customers looking for application-specific engineered products.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onOpenRFQ}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Discuss Your Project Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-neutral-200 bg-neutral-50 p-6 space-y-6">
                <div className="relative h-64 overflow-hidden border border-neutral-300">
                  <img
                    src={HERO_IMG}
                    alt="Saghai Engineering Workshop with heavy fabrication infrastructure"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-neutral-950/80 text-white text-xs font-mono">
                    Coimbatore Heavy Fabrication Infrastructure
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-white p-3 border border-neutral-200">
                    <span className="text-neutral-500 block uppercase text-[10px]">Foundation Year</span>
                    <strong className="text-base text-neutral-900">1978</strong>
                  </div>
                  <div className="bg-white p-3 border border-neutral-200">
                    <span className="text-neutral-500 block uppercase text-[10px]">Industrial Experience</span>
                    <strong className="text-base text-neutral-900">5+ Decades</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK (5 Steps) */}
      <section className="bg-neutral-50/70 py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              EXECUTION DISCIPLINE
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              From Customer Requirement to Finished Component
            </h2>
            <p className="text-sm text-neutral-600">
              Our systematic 5-stage manufacturing methodology ensures dimensional fidelity and quality compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORK_PROCESS_STEPS.map((step) => (
              <div key={step.step} className="bg-white p-6 border border-neutral-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-red-600 block">
                    {step.step} — {step.title}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900">
                    {step.summary}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. OUR MANUFACTURING FACILITY */}
      <section className="bg-white py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold block">
                OUR MANUFACTURING FACILITY
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                30,000+ Sq. Ft. Fabrication Facility
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                Saghai Engineering operates from a covered fabrication facility of approximately 30,000 sq. ft. across three fabrication bays.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                The facility is equipped to support a range of fabrication requirements including cutting, forming, pressing, welding, blasting, painting and inspection.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-neutral-50 p-6 sm:p-8 border border-neutral-200 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-900 font-bold border-b border-neutral-200 pb-3">
                  Facility Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-800">
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>30,000+ sq. ft. covered area</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>3 fabrication bays</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Hydraulic pressing up to 600 tonnes</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>CNC laser cutting (0.7–20 mm)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>CNC oxyfuel cutting (up to 150 mm)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Plate forming / bending (3–50 mm)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>FCAW, GMAW, SMAW & GTAW welding</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>In-house blasting & painting</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-white border border-neutral-200 sm:col-span-2">
                    <Check className="w-4 h-4 text-red-600 shrink-0" />
                    <span>UT, LPT, Radiography & Hydrostatic testing</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. MATERIAL EXPERIENCE */}
      <section className="bg-neutral-50/70 py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              RAW MATERIALS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Working Across Common Industrial Materials
            </h2>
            <p className="text-sm text-neutral-600">
              Our documented manufacturing experience includes standard materials used across process equipment and industrial fabrication applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-neutral-200 space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">Documented Scope</span>
              <h3 className="text-xl font-bold text-neutral-900">Mild Steel</h3>
              <p className="text-xs text-neutral-600">
                Heavy plates, structural sections, IS2062 carbon steel and SA516 pressure-vessel grade plates.
              </p>
            </div>

            <div className="bg-white p-6 border border-neutral-200 space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">Documented Scope</span>
              <h3 className="text-xl font-bold text-neutral-900">Stainless Steel</h3>
              <p className="text-xs text-neutral-600">
                SS304, SS316 and process vessel grades requiring hygienic passivated weld seams and corrosion resistance.
              </p>
            </div>

            <div className="bg-white p-6 border border-neutral-200 space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">Documented Scope</span>
              <h3 className="text-xl font-bold text-neutral-900">Aluminium</h3>
              <p className="text-xs text-neutral-600">
                Precision cut and formed aluminium components for lightweight structural and industrial enclosures.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. QUALITY & INSPECTION */}
      <section className="bg-white py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
              QUALITY ASSURANCE
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Quality-Focused Manufacturing
            </h2>
            <p className="text-sm text-neutral-600">
              Quality is considered throughout the manufacturing process, from understanding customer specifications to fabrication and applicable inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-50 p-5 border border-neutral-200 space-y-1.5">
              <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Ultrasonic Testing (UT)</h4>
              <p className="text-xs text-neutral-600">
                Verifying volumetric soundness and absence of internal lamination or root weld voids.
              </p>
            </div>

            <div className="bg-neutral-50 p-5 border border-neutral-200 space-y-1.5">
              <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Liquid Penetrant Testing (LPT)</h4>
              <p className="text-xs text-neutral-600">
                Detecting surface cracks and discontinuities on weld toes and fillet joints.
              </p>
            </div>

            <div className="bg-neutral-50 p-5 border border-neutral-200 space-y-1.5">
              <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Radiography Testing (RT)</h4>
              <p className="text-xs text-neutral-600">
                Radiographic weld examination for high-stress pressure containment boundaries.
              </p>
            </div>

            <div className="bg-neutral-50 p-5 border border-neutral-200 space-y-1.5">
              <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
              <h4 className="text-sm font-bold text-neutral-900">Hydrostatic Pressure Testing</h4>
              <p className="text-xs text-neutral-600">
                Full water hydrostatic testing to validated proof pressure with calibrated gauges.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. LEADERSHIP */}
      <section className="bg-neutral-50/70 py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              COMPANY LEADERSHIP
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Experience at the Foundation. Global Perspective for the Future.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERSHIP_TEAM.map((leader) => (
              <div key={leader.name} className="bg-white p-8 border border-neutral-200 space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                  <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center font-bold font-mono text-base">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{leader.name}</h3>
                    <span className="text-xs font-mono font-semibold text-red-600 uppercase tracking-wider">
                      {leader.role}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {leader.bio}
                </p>

                <div className="pt-2 text-xs font-mono text-neutral-500 bg-neutral-50 p-3 border border-neutral-200">
                  <span className="block text-[10px] uppercase text-neutral-400">Background Focus:</span>
                  <span className="text-neutral-800">{leader.experience}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CUSTOMER EXPERIENCE & RELATIONSHIPS */}
      <section className="bg-white py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
              TRUSTED PARTNERSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Built Through Long-Term Industrial Relationships
            </h2>
            <p className="text-sm text-neutral-600">
              Saghai Engineering's experience includes working with established industrial customers across engineering, equipment and manufacturing applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {APPROVED_CUSTOMERS.map((cust) => (
              <div
                key={cust.name}
                className="bg-neutral-50 border border-neutral-200 p-5 flex flex-col items-center justify-center text-center space-y-1.5 h-28"
              >
                <span className="text-lg font-extrabold tracking-wider text-neutral-900 font-mono">
                  {cust.code}
                </span>
                <span className="text-[10px] text-neutral-500 leading-tight">
                  {cust.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. GLOBAL OUTLOOK */}
      <section className="bg-neutral-50/70 py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block">
              INTERNATIONAL REACH
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              From Coimbatore to Global Industrial Markets
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed">
              With its manufacturing base in Coimbatore, Saghai Engineering is positioned to support industrial buyers and engineering requirements across selected global markets including Saudi Arabia, the Middle East, Europe and Latin America.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-white border border-neutral-200 px-3 py-1.5 text-neutral-800">
                Saudi Arabia & Gulf Region
              </span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 text-neutral-800">
                Middle East Industrial Corridors
              </span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 text-neutral-800">
                European Engineering Buyers
              </span>
              <span className="bg-white border border-neutral-200 px-3 py-1.5 text-neutral-800">
                Latin America Mining & Infrastructure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ABOUT PAGE FINAL CTA */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Let's Build Around Your Requirement
          </h2>
          <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Whether you have a detailed manufacturing drawing or an initial component requirement, share the available information with our team and let us discuss the right fabrication approach.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenRFQ}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
