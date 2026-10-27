import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ActivePage, ProjectItem } from '../../types';
import {
  PRODUCT_CATEGORIES,
  WHY_CHOOSE_US,
  PROJECTS_EXPERIENCE,
  FAQ_LIST,
} from '../../data/companyData';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Phone,
  Mail,
  Flame,
  Hammer,
  Building2,
  ShieldCheck,
  Zap,
  Ruler,
  Paintbrush,
  ScanSearch,
  Cog,
  ClipboardCheck,
  Truck,
Droplets,
FlaskConical,
FileText,
PackageCheck,
  Layers,
CalendarCheck,
Factory,
BadgeCheck,
} from 'lucide-react';
import { PlateCalculator } from '../common/PlateCalculator';

// Local images
const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';
const LASER_IMG = '/images/capability_laser_cutting_1791778023419.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';
const VESSEL_IMG = '/images/project_pressure_vessel_1791778050554.jpg';

/**
 * Product + project images.
 * Keys must match `cat.id` (PRODUCT_CATEGORIES) and `item.id` (PROJECTS_EXPERIENCE).
 * Replace the filenames with the real ones from /public/images.
 * Missing / wrong files fall back to a dark placeholder, so nothing breaks.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  'pressure-vessels': '/images/pressure-vessels.jpg',
  'storage-tanks': '/images/storage-tanks.jpg',
  'heat-exchangers': '/images/heat-exchangers.jpg',
  'earthmoving-components': '/images/earthmoving.jpg',
  'industrial-structures': '/images/structures.jpg',
  'process-plant-components': '/images/process-plant.jpg',
  'sheet-metal-components': '/images/sheet-metal.jpg',
  'compression-dished-ends': '/images/dished-ends.jpg',
};

// Add real customers ONLY with their permission. Logo wall stays hidden while empty.
const CUSTOMERS: { name: string; logo?: string }[] = [
  // { name: 'Customer Name', logo: '/images/customers/customer-name.svg' },
];

const SECTORS = [
  {
    icon: Truck,
    title: 'Earthmoving & construction equipment',
    text: 'Axle housings, drawbars and structural components built to OEM drawings and tolerances.',
    tag: 'Dozers · Motor graders',
  },
  {
    icon: FlaskConical,
    title: 'Process & chemical plants',
    text: 'Pressure vessels, jacketed vessels and heat exchangers in SA516 and stainless grades.',
    tag: 'UT · RT · Hydrotest',
  },
  {
    icon: Droplets,
    title: 'Storage & water infrastructure',
    text: 'Storage tanks and water sprinkler tanks fabricated for municipal and industrial use.',
    tag: '28 kL · 50 kL tanks',
  },
  {
    icon: Factory,
    title: 'Heavy engineering & manufacturing',
    text: 'Industrial structures, dished ends and sheet metal components for production plants.',
    tag: 'Structures · Dished ends',
  },
];

const WORK_STEPS = [
  { icon: FileText, title: 'Share your drawing', text: 'Send drawings, specs and quantities through the RFQ form.' },
  { icon: ClipboardCheck, title: 'Engineering review', text: 'Our engineers check feasibility, material and process.' },
  { icon: Hammer, title: 'Fabrication', text: 'Cutting, forming, welding and finishing under one roof.' },
  { icon: ScanSearch, title: 'Inspection', text: 'NDT and dimensional checks against your drawing.' },
  { icon: PackageCheck, title: 'Dispatch', text: 'Documented, traceable and delivered to schedule.' },
];

interface HomeViewProps {
  onNavigate: (page: ActivePage) => void;
  onOpenRFQ: (initialCategory?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when a block scrolls into view. Skipped for reduced motion. */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Counts up to a number when visible. */
const CountUp: React.FC<{ to: number; suffix?: string; format?: boolean }> = ({
  to,
  suffix = '',
  format = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {format ? val.toLocaleString('en-IN') : val}
      {suffix}
    </span>
  );
};

/**
 * Image with skeleton while loading, fade-in once loaded, and a dark
 * placeholder if the file is missing. Zooms + un-mutes on parent `group` hover.
 */
const SmartImage: React.FC<{ src?: string; alt: string; className?: string }> = ({
  src,
  alt,
  className = '',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-neutral-200" />}
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-white/20">
          <Factory className="h-12 w-12" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

/** Section heading block: small label, big title, optional intro. */
const SectionHead: React.FC<{
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
  center?: boolean;
}> = ({ label, title, intro, light, center }) => (
  <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <div
      className={`flex items-center gap-3 ${center ? 'justify-center' : ''} mb-4`}
    >
      <span className="h-[3px] w-10 bg-red-600" />
      <span
        className={`text-sm font-semibold tracking-wide ${
          light ? 'text-red-400' : 'text-red-600'
        }`}
      >
        {label}
      </span>
    </div>
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] ${
        light ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {title}
    </h2>
    {intro && (
      <p
        className={`mt-5 text-base sm:text-lg leading-relaxed ${
          light ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {intro}
      </p>
    )}
  </Reveal>
);

const PrimaryBtn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`group inline-flex items-center justify-center gap-2 bg-red-600 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${className}`}
  >
    {children}
    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
);

const GhostBtn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode; dark?: boolean }
> = ({ children, dark, className = '', ...props }) => (
  <button
    {...props}
    className={`group inline-flex items-center justify-center gap-2 border px-7 py-4 text-base font-semibold transition-all duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
      dark
        ? 'border-white/25 text-white hover:border-white hover:bg-white/10'
        : 'border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white'
    } ${className}`}
  >
    {children}
    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </button>
);

const capabilityIcons = [Hammer, Zap, Flame, Ruler, Cog, Paintbrush];

/* ------------------------------------------------------------------ */
/* Narrative hero + about story                                        */
/* ------------------------------------------------------------------ */

interface HeroProps {
  onOpenRFQ: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const HeroNarrative: React.FC<HeroProps> = ({ onOpenRFQ, onNavigate }) => {
  const reduce = useReducedMotion();

  // Slow parallax on the background image
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '15%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0.2]);

  // Masked line-by-line headline reveal
  const line = (i: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: { y: 0 },
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE },
  });

  const facts = [
    { v: <>1978</>, l: 'Established' },
    { v: <CountUp to={30000} suffix="+" format />, l: 'Sq. ft. facility' },
    { v: <CountUp to={3} />, l: 'Fabrication bays' },
    { v: <CountUp to={600} suffix=" t" />, l: 'Press capacity' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background image with parallax */}
      <motion.img
        src={HERO_IMG}
        alt=""
        aria-hidden
        referrerPolicy="no-referrer"
        style={{ y: bgY }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-x-0 -top-[5%] -z-20 h-[110%] w-full object-cover"
      />

      {/* Slight overlay: even dark tint + soft vignette for text contrast */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/60" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/80"
      />
      <div aria-hidden className="absolute left-0 top-0 -z-10 h-full w-1.5 bg-red-600" />

      {/* Centered content */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex w-full max-w-[1500px] flex-1 -translate-y-4 flex-col items-center justify-center px-4 pb-44 pt-28 text-center sm:-translate-y-6 sm:px-6 sm:pb-52 lg:px-8"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-3 border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur-md sm:text-base"
        >
          <span className="h-2.5 w-2.5 bg-red-500" />
          Saghai Engineering, Coimbatore
          <span className="h-4 w-px bg-white/30" />
          <span className="text-red-300">Since 1978</span>
        </motion.div>

        {/* Stretched headline: fluid size, tight tracking, spans the width */}
        <h1 className="mt-8 w-full font-black uppercase tracking-tighter [font-size:clamp(1.9rem,5.6vw,5.75rem)] leading-[1]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...line(0)}>
              Precision in Every Detail
            </motion.span>
          </span>

          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span className="block text-red-500" {...line(2)}>
             Built to Perform.
            </motion.span>
          </span>
        </h1>

        {/* Subcopy */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-100 sm:text-lg"
        >
          Custom-engineered products and fabricated components for heavy
          engineering, process equipment, earthmoving and manufacturing, built
          according to your specifications.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <button
            onClick={onOpenRFQ}
            className="group inline-flex items-center justify-center gap-2 bg-red-600 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
          >
            Request a quote
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="group inline-flex items-center justify-center gap-2 border border-white/60 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-900 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
          >
            Explore our products
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </motion.div>

      {/* Facts strip pinned to the bottom of the hero */}
      <motion.dl
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-6xl grid-cols-2 border-t-4 border-red-600 bg-white/95 text-neutral-900 shadow-[0_-20px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-md lg:grid-cols-4"
      >
        {facts.map((f, i) => (
          <div
            key={f.l}
            className={`px-4 py-5 text-center sm:py-7 ${i % 2 === 1 ? 'border-l border-neutral-200' : ''} ${
              i >= 2 ? 'border-t border-neutral-200 lg:border-t-0' : ''
            } ${i === 2 ? 'lg:border-l lg:border-neutral-200' : ''}`}
          >
            <dd className="text-xl font-extrabold tabular-nums tracking-tight sm:text-3xl">{f.v}</dd>
            <dt className="mt-1 text-xs font-medium text-neutral-600 sm:text-sm">{f.l}</dt>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* 2. ABOUT — scroll story                                             */
/*    Left side stays pinned with the year and a progress line; the    */
/*    right side scrolls through four short chapters.                  */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  {
    kicker: 'The beginning',
    title: 'A Coimbatore Manufacturing Unit, founded in 1978.',
    text: 'Saghai Engineering was founded in Coimbatore in 1978 and grew through practical fabrication expertise.',
  },
  {
    kicker: 'How we work',
    title: 'We build to your drawing.',
    text: 'Customer-focused engineering and a commitment to producing  custom components according to customer specific drawings, dimensions and requirements.',
  },
  {
    kicker: 'What we build',
    title: 'From vessels to structures.',
    text: 'Our experience covers a wide range of industrial work.',
    chips: [
      'Pressure vessels',
      'Storage tanks',
      'Heat exchangers',
      'Earthmoving equipment components',
      'Industrial structures',
      'Process plant components',
      'Sheet metal components',
    ],
  },
  {
    kicker: 'Today',
    title: 'Decades of experience, one clear approach.',
    text: 'A Coimbatore-based manufacturer of custom-engineered products and fabricated components for industrial applications.',
    cta: true,
  },
];

const Chapter: React.FC<{
  c: (typeof CHAPTERS)[number];
  index: number;
  onVisible: (i: number) => void;
  onNavigate: (page: ActivePage) => void;
}> = ({ c, index, onVisible, onNavigate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) onVisible(index);
  }, [inView, index, onVisible]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0.25 }}
      animate={{ opacity: inView ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[70vh] flex-col justify-center py-10"
    >
      <span className="text-base font-semibold text-red-600">{c.kicker}</span>
      <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
        {c.title}
      </h3>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-700">{c.text}</p>

      {c.chips && (
        <motion.ul
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-6 flex max-w-xl flex-wrap gap-2.5"
        >
          {c.chips.map((chip) => (
            <motion.li
              key={chip}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
              className="border border-neutral-300 bg-white px-4 py-2 text-base font-medium text-neutral-800"
            >
              {chip}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {c.cta && (
        <button
          onClick={() => onNavigate('about')}
          className="group mt-8 inline-flex w-fit items-center gap-2 bg-neutral-900 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Know more about Saghai
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </motion.div>
  );
};

export const AboutNarrative: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-24">
        {/* Pinned side */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-red-600" />
              <span className="text-base font-semibold text-red-600">About Saghai Engineering</span>
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl">
              Engineering experience that understands fabrication.
            </h2>

            <div className="mt-8 flex items-stretch gap-6">
              {/* Progress line */}
              <div className="relative hidden w-[3px] shrink-0 bg-neutral-200 sm:block">
                <motion.div
                  style={{ scaleY: reduce ? 1 : progress }}
                  className="absolute inset-0 origin-top bg-red-600"
                />
              </div>
              <div>
                <div className="text-7xl font-black tabular-nums leading-none text-neutral-900 sm:text-8xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current === 3 ? 'today' : '1978'}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      {current === 3 ? '5+' : '1978'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-base font-semibold text-neutral-600">
                  {current === 3 ? 'decades of manufacturing experience' : 'year Saghai Engineering was founded'}
                </p>
                <p className="mt-4 text-sm text-neutral-500">
                  Chapter {current + 1} of {CHAPTERS.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling chapters */}
        <div ref={trackRef} className="lg:col-span-7">
          {CHAPTERS.map((c, i) => (
            <Chapter key={c.kicker} c={c} index={i} onVisible={setCurrent} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenRFQ,
  onSelectProject,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const toggleFaq = (idx: number) =>
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);

  const handleCalculatorTransfer = (specDetails: string) => onOpenRFQ(specDetails);

  const homeFeaturedProjects = PROJECTS_EXPERIENCE.slice(0, 6);

  const capabilities = [
    { title: 'Hydraulic pressing', value: 'Up to 600 tonnes', text: 'Deep forming, dishing and high-tonnage plate shaping.' },
    { title: 'CNC laser cutting', value: '0.7 – 20 mm', text: 'Fibre laser cutting with clean, weld-ready edges in mild steel, SS and aluminium.' },
    { title: 'CNC oxyfuel cutting', value: 'Up to 150 mm', text: 'Heavy thermal cutting for thick carbon steel plates and flanges.' },
    { title: 'Plate bending', value: '3 – 100 mm', text: 'Customer-confirmed bending for heavy shells, structures and rolled segments.' },
    { title: 'Welding processes', value: 'FCAW · GMAW · SMAW · GTAW · SAW ', text: 'Certified procedures for pressure boundaries and structural joints.' },
    { title: 'Blasting & painting', value: 'In-house', text: 'Grit / shot blasting and a protective coating booth on site.' },
  ];

  const partnershipPillars = [
    {
      icon: ClipboardCheck,
      title: 'Direct engineering review',
      text: 'Your drawings and specifications are reviewed directly by our engineers.',
    },
    {
      icon: Layers,
      title: 'Material traceability',
      text: 'Materials documented and traceable through fabrication.',
    },
    {
      icon: CalendarCheck,
      title: 'On-Time delivery',
      text: 'Dependable manufacturing planned around your project timeline.',
    },
  ];

  return (
    <div className="bg-white text-neutral-900 antialiased selection:bg-red-600 selection:text-white">
      {/* 1. NARRATIVE HERO */}
      <HeroNarrative onOpenRFQ={() => onOpenRFQ()} onNavigate={onNavigate} />

      {/* ======================= 2. COMPANY SNAPSHOT ====================== */}
      <section className="border-b border-neutral-200 bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-6">
            <SectionHead
              label="Engineering since 1978"
              title="Decades of fabrication experience, built around customer requirements."
            />
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-neutral-700">
                Established in 1978, Saghai Engineering has developed decades of
                experience in metal fabrication and custom-engineered product
                manufacturing. Our work covers pressure vessels and storage
                tanks, earthmoving equipment components, industrial structures
                and process-plant components.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <button
                onClick={() => onNavigate('about')}
                className="group inline-flex items-center gap-2 text-base font-bold text-red-600 hover:text-red-700"
              >
                <span className="border-b-2 border-red-600/30 pb-0.5 transition-colors group-hover:border-red-700">
                  Read Saghai Engineering's story
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4 lg:col-span-6"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {[
              { n: <>1978</>, label: 'Established', text: 'Founded in Coimbatore with deep metal fabrication roots.' },
              { n: <CountUp to={30000} suffix="+" format />, label: 'Sq. ft. covered area', text: 'Dedicated heavy manufacturing workshop space.' },
              { n: <CountUp to={3} />, label: 'Fabrication bays', text: 'Segregated bays for cutting, forming, welding and assembly.' },
              { n: <>5+ decades</>, label: 'Manufacturing experience', text: 'Operating continuously across demanding sectors.', accent: true },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`border p-6 sm:p-8 ${
                  s.accent
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-900'
                }`}
              >
                <div className="text-4xl font-extrabold tabular-nums sm:text-5xl">{s.n}</div>
                <div className={`mt-2 text-base font-semibold ${s.accent ? 'text-red-50' : 'text-neutral-800'}`}>
                  {s.label}
                </div>
                <p className={`mt-2 text-sm leading-relaxed ${s.accent ? 'text-red-100' : 'text-neutral-600'}`}>
                  {s.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. NARRATIVE ABOUT */}
      <AboutNarrative onNavigate={onNavigate} />

      {/* ========================== 4. SERVICES =========================== */}
      <section className="border-b border-neutral-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              label="Core capabilities"
              title="Focused fabrication services"
              intro="Our core fabrication services focus on precision cutting and controlled plate forming for industrial components and custom fabrication requirements."
            />
            <Reveal>
              <button
                onClick={() => onNavigate('services')}
                className="group inline-flex items-center gap-2 text-base font-bold text-neutral-900 hover:text-red-600"
              >
                Explore our services
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                tag: 'Cutting',
                range: '0.7 – 20 mm',
                title: 'Precision CNC laser cutting',
                text: 'CNC laser cutting for industrial components, fabricated parts and custom profiles from 0.7–20 mm thickness, with strict edge accuracy and minimal thermal distortion.',
                img: LASER_IMG,
                alt: 'Precision CNC laser cutting 0.7–20 mm at Saghai Engineering',
                points: [
                  'Profiles in mild steel, stainless steel and aluminium',
                  'Clean edge perpendicularity, ready for welding',
                ],
                cta: 'Request laser cutting quote',
                rfq: 'Laser Cutting',
              },
              {
                tag: 'Forming',
                range: '3 – 100 mm',
                title: 'Bending & Rolling Services',
                text: 'Precision forming capabilities for heavy structural components, cylindrical shells, and custom-engineered fabrications.',
                img: BENDING_IMG,
                alt: 'Industrial plate bending 3–100 mm at Saghai Engineering',
                points: [
                  'Plate Bending: 25 mm thick × 4500 mm length',
                  'Rolling: 16 mm thick × 2000 mm length',
                ],
                cta: 'Request plate bending quote',
                rfq: 'Plate Bending',
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <article className="group flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.alt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                    <span className="absolute left-4 top-4 bg-white px-3 py-1 text-sm font-semibold text-neutral-900">
                      {s.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-red-600 px-3 py-1.5 text-base font-bold text-white">
                      {s.range}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold sm:text-3xl">{s.title}</h3>
                      <p className="text-base leading-relaxed text-neutral-600">{s.text}</p>
                      <ul className="space-y-2.5 pt-1 text-base text-neutral-700">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 bg-red-600" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => onOpenRFQ(s.rfq)}
                      className="group/btn flex w-full items-center justify-between bg-neutral-900 px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-red-600"
                    >
                      {s.cta}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 5. PRODUCTS ============================ */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              label="Products and fabricated components"
              title="Custom products for industrial applications"
              intro="We manufacture a broad range of custom-engineered products and fabricated components based on your drawings, specifications and application requirements."
            />
            <Reveal>
              <PrimaryBtn onClick={() => onNavigate('products')}>View all products</PrimaryBtn>
            </Reveal>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                variants={staggerChild}
                onClick={() => onNavigate('products')}
                className="group relative flex flex-col overflow-hidden border border-neutral-200 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-red-600 hover:shadow-[0_28px_50px_-28px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <SmartImage
                    src={cat.images?.[0] ?? PRODUCT_IMAGES[cat.id]}
                    alt={`${cat.title} fabricated by Saghai Engineering`}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-neutral-950/5 to-transparent" />
                  <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-xs font-bold tabular-nums text-neutral-900">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                {/* Text */}
                <div className="relative flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-xl font-bold leading-snug text-neutral-900 transition-colors group-hover:text-red-600">
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{cat.description}</p>
                  {/* sliding red edge */}
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================= 6. CAPABILITIES ========================== */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="relative mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <SectionHead
            light
            label="Plant and machinery"
            title="Manufacturing capability under one roof"
            intro="Our facility combines cutting, forming, pressing, welding, finishing and inspection to support diverse custom fabrication requirements."
          />

          <motion.div
            className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {capabilities.map((c, i) => {
              const Icon = capabilityIcons[i];
              return (
                <motion.div
                  key={c.title}
                  variants={staggerChild}
                  className="group space-y-4 bg-neutral-950 p-7 transition-colors duration-300 hover:bg-neutral-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-red-500/40 bg-red-600/10 text-red-400 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-400">{c.title}</div>
                    <div className="mt-1 text-2xl font-bold leading-tight text-white">{c.value}</div>
                  </div>
                  <p className="text-base leading-relaxed text-neutral-300">{c.text}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Inspection banner */}
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border border-red-500/40 bg-gradient-to-r from-red-950/60 to-neutral-950 p-7 md:flex-row md:items-center md:p-10">
              <div className="flex gap-5">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center bg-red-600 sm:flex">
                  <ScanSearch className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-red-300">
                    Inspection and non-destructive testing
                  </span>
                  <p className="text-2xl font-bold">UT, LPT, radiography and hydrostatic testing</p>
                  <p className="max-w-2xl text-base text-neutral-300">
                    Quality testing that verifies internal weld soundness,
                    surface integrity, pressure containment and dimensional
                    adherence to drawings.
                  </p>
                </div>
              </div>
              <PrimaryBtn className="whitespace-nowrap" onClick={() => onNavigate('capabilities')}>
                Full plant capabilities
              </PrimaryBtn>
            </div>
          </Reveal>

          {/* Plate estimator */}
          <Reveal>
            <div className="bg-white p-1 text-neutral-900">
              <PlateCalculator onQuoteWithSpec={handleCalculatorTransfer} />
            </div>
          </Reveal>
        </div>
      </section>

   {/* ======================== 7. ISO QUALITY ========================== */}
<section className="relative isolate overflow-hidden border-b border-neutral-200 bg-neutral-50 py-24 lg:py-32">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
  />
  <div
    aria-hidden
    className="pointer-events-none absolute -right-28 -top-24 h-96 w-96 rounded-full bg-red-100/70 blur-[100px]"
  />
  <div
    aria-hidden
    className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-sky-100/70 blur-[110px]"
  />

  <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE }}
      className="relative overflow-hidden border border-neutral-200 bg-white shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-rose-400"
      />

      <div className="grid items-center gap-12 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-24">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 border border-red-100 bg-red-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 sm:text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Quality management system
          </span>

          <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl lg:text-7xl">
            ISO{' '}
            <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              9001:2015
            </span>
          </h2>

          <p className="mt-5 text-lg font-semibold tracking-tight text-neutral-800 sm:text-xl lg:text-2xl">
            Quality built into every fabrication
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            The provided certificate documentation identifies Saghai Engineering Works and
            covers the manufacture of fabricated components for heavy engineering and other
            industrial applications.
          </p>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              'Certified quality management system',
              'Fabricated components for heavy engineering',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium text-neutral-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center lg:max-w-[420px]"
          >
            <div aria-hidden className="absolute inset-6 rounded-full bg-red-100/60 blur-3xl" />

            <motion.svg
              viewBox="0 0 200 200"
              aria-hidden
              className="absolute inset-0 h-full w-full"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={reduce ? undefined : { duration: 40, ease: 'linear', repeat: Infinity }}
            >
              <defs>
                <path id="iso-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="2 5" />
              <text className="fill-neutral-500" fontSize="9.5" fontWeight="700" letterSpacing="3.2">
                <textPath href="#iso-ring">
                  ISO 9001:2015 • QUALITY MANAGEMENT • SAGHAI ENGINEERING WORKS •
                </textPath>
              </text>
            </motion.svg>

            <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_20px_50px_-20px_rgba(220,38,38,0.35)]">
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-red-200" />
              <div className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <BadgeCheck className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9" aria-hidden="true" />
                </span>
                <span className="mt-3 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500 lg:text-[10px]">
                  Certified
                </span>
                <span className="text-lg font-black tracking-tight text-neutral-950 sm:text-xl lg:text-2xl">
                  ISO 9001
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>

    <motion.div
      className="mt-6 grid gap-5 sm:grid-cols-3"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {[
        { number: '01', icon: ClipboardCheck, label: 'Quality standard', value: 'ISO 9001:2015' },
        { number: '02', icon: Building2, label: 'Organization', value: 'Saghai Engineering Works' },
        { number: '03', icon: Factory, label: 'Industry scope', value: 'Heavy engineering & fabrication' },
      ].map((item) => (
        <motion.div
          key={item.number}
          variants={staggerChild}
          whileHover={reduce ? undefined : { y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="group relative overflow-hidden border border-neutral-200 bg-white p-7 text-left shadow-sm transition-colors hover:border-red-200 lg:p-8"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-red-600 transition-transform duration-500 group-hover:scale-x-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 -top-3 font-mono text-6xl font-black text-neutral-100 transition-colors group-hover:text-red-50"
          >
            {item.number}
          </span>

          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="relative mt-6 block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {item.label}
          </span>
          <span className="relative mt-2 block text-base font-bold leading-snug text-neutral-900 lg:text-lg">
            {item.value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* ========================== 8. WHY ================================ */}
      <section className="border-b border-neutral-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <SectionHead label="Our value" title="Why industrial buyers choose Saghai" />
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {WHY_CHOOSE_US.map((item) => (
              <motion.div
                key={item.number}
                variants={staggerChild}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="relative overflow-hidden border border-neutral-200 bg-neutral-50 p-7"
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 select-none text-8xl font-black text-neutral-200/70"
                >
                  {item.number}
                </span>
                <div className="relative space-y-3">
                  <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="text-base leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     {/* ======================== 9. CUSTOMERS ============================ */}
<section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50 py-20 lg:py-28">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
      backgroundSize: '56px 56px',
    }}
  />

  <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <SectionHead
        label="Who we build for"
        title="Fabrication partner to demanding industrial buyers"
        intro="From earthmoving OEMs to process plants, our customers rely on us for components that fit the drawing, pass inspection and arrive on schedule."
      />
      <Reveal delay={0.1}>
        <PrimaryBtn onClick={() => onOpenRFQ()}>Discuss your requirement</PrimaryBtn>
      </Reveal>
    </div>

    {/* Sectors */}
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {SECTORS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.article
            key={s.title}
            variants={staggerChild}
            whileHover={reduce ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="group relative flex flex-col gap-5 overflow-hidden border border-neutral-200 bg-white p-7 transition-colors duration-300 hover:border-red-600"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-black text-neutral-100"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="relative flex h-12 w-12 items-center justify-center border border-red-600/30 bg-red-50 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <div className="relative space-y-2">
              <h3 className="text-xl font-bold leading-snug text-neutral-900">{s.title}</h3>
              <p className="text-base leading-relaxed text-neutral-600">{s.text}</p>
            </div>
            <span className="relative mt-auto w-fit border-t border-neutral-200 pt-4 text-sm font-semibold text-neutral-500">
              {s.tag}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        );
      })}
    </motion.div>

    {/* Logo wall (hidden until CUSTOMERS has entries) */}
    {CUSTOMERS.length > 0 && (
      <Reveal>
        <div className="space-y-6">
          <p className="text-center text-sm font-semibold text-neutral-500">
            Companies we have manufactured for
          </p>
          <ul className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-5">
            {CUSTOMERS.map((c) => (
              <li
                key={c.name}
                className="group flex h-24 items-center justify-center bg-white px-6 transition-colors hover:bg-neutral-50"
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="max-h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center text-base font-bold text-neutral-500 transition-colors group-hover:text-neutral-900">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    )}

    {/* Drawing to dispatch */}
    <Reveal>
      <div className="border border-neutral-200 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <span className="text-sm font-semibold text-red-600">How we work with buyers</span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl">
              From your drawing to dispatch
            </h3>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="group inline-flex items-center gap-2 text-base font-bold text-neutral-900 hover:text-red-600"
          >
            See project experience
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {WORK_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="relative border-neutral-200 p-6 sm:p-7 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0 sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 lg:[&:not(:first-child)]:border-l"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-neutral-900 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold tabular-nums text-neutral-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-neutral-900">{s.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  </div>
</section>
      {/* ========================= 10. PROJECTS =========================== */}
      <section className="border-b border-neutral-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              label="Documented shopfloor work"
              title="From components to complete fabricated assemblies"
              intro="Our project experience shows our ability to manufacture application-specific components and fabricated products across different industrial requirements."
            />
            <Reveal>
              <GhostBtn onClick={() => onNavigate('projects')}>View project experience</GhostBtn>
            </Reveal>
          </div>

          {/* Featured */}
          <Reveal>
            <div className="grid grid-cols-1 overflow-hidden border border-neutral-200 bg-white shadow-sm lg:grid-cols-12">
              <div className="group relative min-h-[320px] overflow-hidden lg:col-span-5">
                <img
                  src={VESSEL_IMG}
                  alt="SS304 and SA516 process pressure vessel fabricated at Saghai Engineering"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-red-600 px-3 py-1.5 text-sm font-semibold text-white">
                  Featured assembly
                </span>
              </div>
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:col-span-7">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <span className="text-neutral-500">Vessels and tanks</span>
                    <span className="h-1 w-1 bg-neutral-400" />
                    <span className="text-red-600">SA516 / SS304</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                    Chemical storage / jacketed vessel
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-600">
                    Engineered with SA516 boiler-grade plate and SS304 stainless
                    steel, weighing approximately 8 tonnes and spanning 2,000 mm
                    diameter × 9,000 mm length for chemical processing
                    installations. 100% inspected with ultrasonic testing and
                    hydrostatic pressure validation.
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                    {[
                      ['Weight', '~8 tonnes'],
                      ['Dimensions', 'Ø 2,000 × 9,000 mm'],
                      ['Testing', 'RT and hydrostatic'],
                    ].map(([k, v]) => (
                      <div key={k} className="border-l-4 border-red-600 bg-neutral-50 px-4 py-3">
                        <span className="block text-sm text-neutral-500">{k}</span>
                        <strong className="text-base text-neutral-900">{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <PrimaryBtn onClick={() => onSelectProject(PROJECTS_EXPERIENCE[0])}>
                    Inspect vessel specifications
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other projects (slice 1–4 = a clean row of three, includes index 1) */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {homeFeaturedProjects.slice(1, 4).map((item, index) => {
              return (
                <motion.button
                  key={item.id}
                  variants={staggerChild}
                  onClick={() => onSelectProject(item)}
                  className="group flex h-full w-full flex-col overflow-hidden border border-neutral-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/5 to-transparent" />
                    <span className="absolute left-4 top-4 max-w-[75%] truncate bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm">
                      {item.category}
                    </span>
                    <span className="absolute right-4 top-4 font-mono text-xs font-semibold text-white/90">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-sm font-semibold text-white">
                      <span>Project details</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-black/20 transition-colors group-hover:bg-red-600 group-hover:border-red-600">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div>
                      <h3 className="min-h-[3.5rem] text-xl font-bold leading-snug text-neutral-900 transition-colors group-hover:text-red-600">
                        {item.title}
                      </h3>
                      <p className="mt-2 min-h-[4.5rem] line-clamp-3 text-sm leading-6 text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                    <dl className="mt-5 space-y-2 border-t border-neutral-200 pt-4 text-sm">
                      <div className="flex items-start justify-between gap-4">
                        <dt className="shrink-0 text-neutral-500">Material</dt>
                        <dd className="text-right font-semibold leading-5 text-neutral-900">{item.material}</dd>
                      </div>
                      {item.weight && (
                        <div className="flex items-start justify-between gap-4">
                          <dt className="shrink-0 text-neutral-500">Weight</dt>
                          <dd className="text-right font-semibold leading-5 text-neutral-900">{item.weight}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ====================== 11. PARTNERSHIP =========================== */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-red-600/20 blur-[120px]"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* Left: story */}
          <div className="space-y-7 lg:col-span-6">
            <SectionHead
              light
              label="Partnership approach"
              title="Long-term customer relationships built on execution"
            />
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
                Our long-standing customer relationships reflect our focus on dependable
                manufacturing, practical engineering and customer requirements. We deliver
                fabricated components that meet in specifications without compromise.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <span className="mb-3 block text-sm font-semibold text-neutral-400">We work closely with</span>
                <div className="flex flex-wrap gap-2.5">
                  {['Plant engineers', 'Procurement leaders', 'OEM designers'].map((t) => (
                    <span
                      key={t}
                      className="border border-white/20 bg-white/5 px-4 py-2 text-base font-medium text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <PrimaryBtn onClick={() => onOpenRFQ()}>Request a quote</PrimaryBtn>
                <GhostBtn dark onClick={() => onNavigate('contact')}>
                  Contact our team
                </GhostBtn>
              </div>
            </Reveal>
          </div>

          {/* Right: pillars */}
          <motion.div
            className="space-y-4 lg:col-span-6"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {partnershipPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={staggerChild}
                  whileHover={reduce ? undefined : { x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group relative flex gap-5 overflow-hidden border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-red-500/60 hover:bg-white/[0.07] sm:p-7"
                >
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-red-600 transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-red-500/40 bg-red-600/10 text-red-400 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="text-base leading-relaxed text-neutral-300">{p.text}</p>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-3 select-none text-7xl font-black text-white/[0.04]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================== 12. FAQ ============================== */}
      <section className="border-b border-neutral-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHead
            center
            label="Questions and answers"
            title="Frequently asked questions"
            intro="Technical details about our manufacturing capabilities, materials and quotation process."
          />
          <div className="space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <Reveal key={idx}>
                  <div
                    className={`border transition-colors duration-300 ${
                      isOpen ? 'border-red-600 bg-red-50/40' : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 sm:p-6"
                    >
                      <span className="text-base font-semibold text-neutral-900 sm:text-lg">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                          isOpen ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 text-base leading-relaxed text-neutral-700 sm:px-6">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= 13. FINAL CTA ========================== */}
      <section className="relative overflow-hidden bg-neutral-950 py-24 text-white lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/25 blur-[140px]"
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative mx-auto max-w-4xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-sm font-semibold text-red-400">Get in touch</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Have a requirement? <span className="text-red-500">Let's engineer it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300">
              Share your drawings, specifications or project requirements with
              Saghai Engineering. Our team will review your requirement and
              discuss the appropriate manufacturing approach.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryBtn onClick={() => onOpenRFQ()}>Request a quote</PrimaryBtn>
              <GhostBtn dark onClick={() => onNavigate('contact')}>
                Contact our team
              </GhostBtn>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 text-base text-neutral-300 sm:flex-row sm:gap-8">
              <span className="text-neutral-400">Coimbatore facility</span>
              <a href="tel:+919585953545" className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-red-400" />
                +91 95859 53545
              </a>
              <a href="mailto:Saghaiengg1978@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-red-400" />
                Saghaiengg1978@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};