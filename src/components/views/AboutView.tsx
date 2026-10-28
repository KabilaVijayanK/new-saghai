import React from 'react';
import { ActivePage } from '../../types';
import { WORK_PROCESS_STEPS, LEADERSHIP_TEAM } from '../../data/companyData';
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Factory,
  Flame,
  Scissors,
  Hammer,
  Paintbrush,
  ScanSearch,
  Droplets,
  Gauge,
  Radiation,
  MapPin,
} from 'lucide-react';

const HERO_IMG = '/about.png';

interface AboutViewProps {
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: () => void;
}

const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
  center?: boolean;
}> = ({ eyebrow, title, text, dark, center }) => (
  <div className={`max-w-2xl space-y-3 ${center ? 'mx-auto text-center' : ''}`}>
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-8 bg-red-600" />
      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-600 font-bold">
        {eyebrow}
      </span>
    </div>
    <h2
      className={`text-3xl sm:text-4xl font-bold tracking-tight leading-tight ${
        dark ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {title}
    </h2>
    {text && (
      <p className={`text-base leading-relaxed ${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {text}
      </p>
    )}
  </div>
);

const STATS = [
  { value: '1978', label: 'Established' },
  { value: '45+', label: 'Years of fabrication' },
  { value: '30,000+', label: 'Sq. ft. covered facility' },
  { value: '600 T', label: 'Hydraulic pressing' },
];

const FACILITY = [
  { icon: Factory, title: '3 Fabrication Bays', text: '30,000+ sq. ft. covered area' },
  { icon: Gauge, title: 'Hydraulic Pressing', text: 'Up to 600 tonnes' },
  { icon: Scissors, title: 'CNC Laser Cutting', text: '0.7 – 20 mm' },
  { icon: Flame, title: 'CNC Oxyfuel Cutting', text: 'Up to 150 mm' },
  { icon: Hammer, title: 'Plate Forming / Bending', text: '3 – 100 mm' },
  { icon: Flame, title: 'Welding', text: 'FCAW, GMAW, SMAW & GTAW' },
  { icon: Paintbrush, title: 'Blasting & Painting', text: 'Fully in-house' },
  { icon: ScanSearch, title: 'Inspection', text: 'UT, LPT, RT & Hydrotest' },
];

const MATERIALS = [
  {
    name: 'Carbon Steels',
    grades: ['IS2062: E250 Gr. A / B / C', 'SA516 Gr. 60 / 70 Plates'],
    text: 'Heavy plates, structural sections, carbon steel and pressure-vessel grade plates.',
  },
  {
    name: 'High Strength & Wear Plates',
    grades: ['S355J / S410J High Strength Steel', 'S690QL / S700MC', 'Hardox 400 / 450 Wear Plates'],
    text: 'High-strength and wear-resistant steel plates for demanding industrial and heavy-duty applications.',
  },
  {
    name: 'Stainless Steels',
    grades: ['SA240 Gr. 304 / 316 / 310 / 410'],
    text: 'Stainless steel grades for corrosion-resistant pressure vessels, process equipment and industrial applications.',
  },
];

const QUALITY = [
  {
    icon: ScanSearch,
    code: 'UT',
    title: 'Ultrasonic Testing',
    text: 'Verifies volumetric soundness and absence of internal lamination or root weld voids.',
  },
  {
    icon: Droplets,
    code: 'LPT',
    title: 'Liquid Penetrant Testing',
    text: 'Detects surface cracks and discontinuities on weld toes and fillet joints.',
  },
  {
    icon: Radiation,
    code: 'RT',
    title: 'Radiography Testing',
    text: 'Radiographic weld examination for high-stress pressure containment boundaries.',
  },
  {
    icon: Gauge,
    code: 'HYDRO',
    title: 'Hydrostatic Testing',
    text: 'Full water testing to validated proof pressure with calibrated gauges.',
  },
];

const REGIONS = [
  'Saudi Arabia & Gulf Region',
  'Middle East Industrial Corridors',
  'European Engineering Buyers',
  'Latin America Mining & Infrastructure',
];

export const AboutView: React.FC<AboutViewProps> = ({ onOpenRFQ }) => {
  return (
    <div>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/40" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 lg:pt-32">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/40 px-3 py-1.5 backdrop-blur">
              <span className="w-1.5 h-1.5 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-300 font-semibold">
                About Saghai Engineering
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Engineering experience
              <br />
              <span className="text-red-500">built since 1978.</span>
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
              For more than five decades, Saghai Engineering has built its experience around custom
              metal fabrication and engineered products for industrial applications.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenRFQ}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#facility"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 hover:border-white/60 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                See Our Facility
              </a>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="relative border-t border-white/10 bg-neutral-950/70 backdrop-blur">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HERITAGE */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-red-600/30" />
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <img
                  src={HERO_IMG}
                  alt="Saghai Engineering workshop with heavy fabrication infrastructure"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-4 bg-gradient-to-t from-neutral-950/90 to-transparent text-white text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  Coimbatore Heavy Fabrication Infrastructure
                </div>
              </div>
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-red-600 text-white px-6 py-4 shadow-xl">
                <div className="text-3xl font-extrabold font-mono leading-none">1978</div>
                <div className="text-[10px] uppercase tracking-widest mt-1 text-red-100">
                  Foundation year
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                eyebrow="Our Heritage"
                title="A fabrication legacy that continues to evolve"
              />
              <p className="text-lg text-neutral-800 leading-relaxed">
                Saghai Engineering was established in 1978 with a focus on metal fabrication and
                customer-specific manufacturing requirements.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Over the years, the company has developed experience across pressure vessels,
                storage tanks, heat exchangers, earthmoving equipment components, industrial
                structures, process plant components and sheet metal products.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Today, we combine established fabrication knowledge with modern manufacturing
                capabilities to support customers looking for application-specific engineered
                products.
              </p>
              <button
                onClick={onOpenRFQ}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Discuss your project requirements
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <SectionHeader
            eyebrow="Execution Discipline"
            title="From customer requirement to finished component"
            text="A systematic 5-stage methodology that protects dimensional fidelity and quality compliance."
          />

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-neutral-300" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {WORK_PROCESS_STEPS.map((step, i) => (
                <div key={step.step} className="relative group">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-neutral-900 text-sm font-mono font-bold text-neutral-900 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-5 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-red-600 font-bold">
                      {step.title}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {step.summary}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACILITY */}
      <section id="facility" className="bg-neutral-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <SectionHeader
                dark
                eyebrow="Our Manufacturing Facility"
                title="30,000+ sq. ft. fabrication facility"
              />
            </div>
            <p className="lg:col-span-5 text-neutral-400 leading-relaxed">
              A covered facility of approximately 30,000 sq. ft. across three fabrication bays,
              equipped for cutting, forming, pressing, welding, blasting, painting and inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {FACILITY.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-neutral-950 p-6 space-y-4 hover:bg-neutral-900 transition-colors group"
              >
                <Icon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MATERIALS */}
<section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
    <SectionHeader
      center
      eyebrow="Raw Materials"
      title="Working across common industrial materials"
      text="Our documented manufacturing experience covers standard materials used in process equipment and industrial fabrication."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
  {MATERIALS.map((m) => (
    <div
      key={m.name}
      className="relative border border-neutral-200 p-8 space-y-4 text-center hover:border-red-600 hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-300" />

      <h3 className="text-2xl font-bold text-neutral-900">{m.name}</h3>

      <div className="flex flex-wrap justify-center gap-2">
        {m.grades.map((g) => (
          <span
            key={g}
            className="px-2.5 py-1 bg-neutral-100 text-[11px] font-mono font-semibold text-neutral-700"
          >
            {g}
          </span>
        ))}
      </div>

      <p className="text-sm text-neutral-600 leading-relaxed">{m.text}</p>
    </div>
  ))}
</div>
  </div>
</section>

      {/* 6. QUALITY */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Quality Assurance"
            title="Quality-focused manufacturing"
            text="Quality is considered throughout the process, from understanding customer specifications to fabrication and applicable inspection."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUALITY.map(({ icon: Icon, code, title, text }) => (
              <div key={code} className="bg-white border border-neutral-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400">
                    {code}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            Inspection scope is applied per customer specification and applicable standards.
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Company Leadership"
            title="Experience at the foundation. Global perspective for the future."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERSHIP_TEAM.map((leader) => (
              <div
                key={leader.name}
                className="border border-neutral-200 bg-white hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 p-8 pb-6 border-b border-neutral-100">
                  <div className="w-16 h-16 bg-neutral-900 text-white flex items-center justify-center font-bold font-mono text-lg shrink-0">
                    {leader.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{leader.name}</h3>
                    <span className="text-xs font-mono font-semibold text-red-600 uppercase tracking-wider">
                      {leader.role}
                    </span>
                  </div>
                </div>
                <div className="p-8 pt-6 space-y-5">
                  <p className="text-sm text-neutral-600 leading-relaxed">{leader.bio}</p>
                  <div className="border-l-2 border-red-600 pl-4">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Background focus
                    </span>
                    <span className="text-sm text-neutral-800">{leader.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GLOBAL */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <SectionHeader
                eyebrow="International Reach"
                title="From Coimbatore to global industrial markets"
              />
              <p className="text-neutral-700 leading-relaxed">
                With its manufacturing base in Coimbatore, Saghai Engineering is positioned to
                support industrial buyers and engineering requirements across selected global
                markets including Saudi Arabia, the Middle East, Europe and Latin America.
              </p>
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REGIONS.map((r) => (
                <div
                  key={r}
                  className="flex items-start gap-3 bg-white border border-neutral-200 p-5"
                >
                  <Globe2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-neutral-800 leading-snug">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="relative overflow-hidden bg-red-600 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 14px)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Let's build around your requirement
          </h2>
          <p className="text-red-50 max-w-2xl mx-auto leading-relaxed">
            Whether you have a detailed manufacturing drawing or an initial component requirement,
            share the available information with our team and let us discuss the right fabrication
            approach.
          </p>
          <button
            onClick={onOpenRFQ}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xl"
          >
            Request a Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};