import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ActivePage, ProjectItem } from '../../types';
import { PRODUCT_CATEGORIES, PROJECTS_EXPERIENCE } from '../../data/companyData';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Maximize2, Phone } from 'lucide-react';

// Reuses the facility photo already used on the home hero
const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductsViewProps {
  onOpenRFQ: (initialCategory?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onOpenRFQ, onSelectProject }) => {
  const reduce = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const filteredCategories =
    selectedCategory === 'all'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((c) => c.id === selectedCategory);

  // Helper to find projects related to a category
  const getProjectsForCategory = (catTitle: string) =>
    PROJECTS_EXPERIENCE.filter((p) => {
      if (catTitle.includes('Vessels') && p.category === 'Vessels & Tanks') return true;
      if (catTitle.includes('Tanks') && p.category === 'Vessels & Tanks') return true;
      if (catTitle.includes('Earthmoving') && p.category === 'Earthmoving & Mining') return true;
      if (catTitle.includes('Structures') && p.category === 'Industrial Machinery') return true;
      if (catTitle.includes('Process') && p.category === 'Process Equipment') return true;
      return false;
    });

  const filters = [
    { id: 'all', title: 'All products', count: PRODUCT_CATEGORIES.length },
    ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, title: c.title, count: null as number | null })),
  ];

  return (
    <div className="bg-white text-neutral-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ============================ HERO (compact) ============================ */}
      <section className="relative isolate flex items-center overflow-hidden bg-neutral-950 text-white lg:min-h-[340px]">
        <motion.img
          src={HERO_IMG}
          alt=""
          aria-hidden
          referrerPolicy="no-referrer"
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/70" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent"
        />
        <div aria-hidden className="absolute left-0 top-0 -z-10 h-full w-1.5 bg-red-600" />

        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-md"
          >
            <span className="h-2.5 w-2.5 bg-red-500" />
            Manufactured products
          </motion.div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-[1.05] tracking-tighter sm:text-4xl lg:text-5xl">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                Custom products for
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block text-red-500"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
              >
                industrial applications.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg"
          >
            We manufacture a broad range of custom-engineered products and fabricated components based
            on customer drawings, specifications and application requirements.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => onOpenRFQ()}
              className="group inline-flex items-center justify-center gap-2 bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
            >
              Request a quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#product-grid"
              className="group inline-flex items-center justify-center gap-2 border border-white/60 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-900 active:scale-[0.98] sm:text-base"
            >
              Browse categories
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ======================= FILTER BAR ======================= */}
      <section className="sticky top-20 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Product categories"
            className="flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((f) => {
              const active = selectedCategory === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(f.id)}
                  className={`relative shrink-0 px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${
                    active
                      ? 'text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="products-filter-pill"
                      className={`absolute inset-0 ${f.id === 'all' ? 'bg-neutral-900' : 'bg-red-600'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {f.title}
                    {f.count !== null && (
                      <span
                        className={`px-1.5 text-xs font-bold tabular-nums ${
                          active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {f.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================= CATEGORY GRID ======================= */}
      <section id="product-grid" className="scroll-mt-40 bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-10 bg-red-600" />
                <span className="text-sm font-semibold text-red-600">Product range</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {selectedCategory === 'all' ? 'Everything we manufacture' : filteredCategories[0]?.title}
              </h2>
            </div>
            <span className="hidden text-base font-medium text-neutral-500 sm:block">
              Showing {filteredCategories.length} of {PRODUCT_CATEGORIES.length}
            </span>
          </div>

          <div key={selectedCategory} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {filteredCategories.map((cat, idx) => {
              const relatedProjects = getProjectsForCategory(cat.title);
              const number = String(PRODUCT_CATEGORIES.findIndex((c) => c.id === cat.id) + 1).padStart(2, '0');
              const isExpanded = expandedProduct === cat.id;
              const detailsId = `product-details-${cat.id}`;

              return (
                <motion.article
                  key={cat.id}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(idx, 5) * 0.07, ease: EASE }}
                  className="group relative flex flex-col self-start overflow-hidden border border-neutral-200 bg-white transition-[border-color,box-shadow] duration-300 hover:border-neutral-300 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.3)]"
                >
                  {/* red top edge reveals on hover */}
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-500 group-hover:scale-x-100" />

                  {/* big ghost number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-3 select-none text-7xl font-black leading-none text-neutral-100 transition-colors duration-300 group-hover:text-red-50 sm:text-8xl"
                  >
                    {number}
                  </span>

                  <div className="relative flex flex-col gap-6 p-6 sm:p-8">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-red-600 px-2.5 py-1 text-sm font-bold text-white">
                          Category {number}
                        </span>
                        {cat.applicableStandards && (
                          <span className="border border-neutral-300 bg-white px-2.5 py-1 text-sm font-medium text-neutral-600">
                            {cat.applicableStandards}
                          </span>
                        )}
                      </div>
                      <h3 className="max-w-[82%] text-2xl font-extrabold leading-[1.15] tracking-tight text-neutral-900 sm:text-3xl">
                        {cat.title}
                      </h3>
                      <p className="max-w-[62ch] text-base leading-7 text-neutral-600">{cat.description}</p>
                    </div>

                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      onClick={() => setExpandedProduct(isExpanded ? null : cat.id)}
                      className="group/details flex w-full items-center justify-between border-t border-neutral-200 pt-5 text-left text-sm font-semibold text-neutral-800 transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 text-red-600 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <motion.div
                    id={detailsId}
                    aria-hidden={!isExpanded}
                    inert={!isExpanded}
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      ease: EASE,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 border-t border-neutral-200 p-6 sm:p-8">
                      {/* Materials */}
                      {cat.typicalMaterials.length > 0 && (
                        <div className="border-t border-neutral-100 pt-5">
                          <h4 className="mb-3 text-sm font-semibold text-neutral-500">
                            Materials in documented examples
                          </h4>
                          <ul className="flex flex-wrap gap-2">
                            {cat.typicalMaterials.map((mat, i) => (
                              <li
                                key={i}
                                className="inline-flex min-h-8 items-center border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm leading-5 font-medium text-neutral-800"
                              >
                                {mat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Examples */}
                      {cat.examples.length > 0 && (
                        <div className="border-t border-neutral-100 pt-5">
                          <h4 className="mb-3 text-sm font-semibold text-neutral-500">
                            Selected examples
                          </h4>
                          <ul className="grid grid-cols-1 gap-x-5 gap-y-3 lg:grid-cols-2">
                            {cat.examples.map((ex, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-6 text-neutral-800">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-red-600 text-white">
                                  <Check className="h-3 w-3" strokeWidth={3} />
                                </span>
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Related projects */}
                      {relatedProjects.length > 0 && (
                        <div className="border-t border-neutral-200 pt-5">
                          <h4 className="mb-3 text-sm font-semibold text-red-600">
                            Documented project experience
                          </h4>
                          <div className="space-y-2">
                            {relatedProjects.slice(0, 2).map((rp) => (
                              <button
                                key={rp.id}
                                onClick={() => onSelectProject(rp)}
                                className="group/p flex w-full items-center justify-between gap-3 border border-neutral-200 bg-neutral-50 px-4 py-3 text-left transition-colors hover:border-red-600 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                              >
                                <span className="truncate text-[15px] font-semibold text-neutral-900">
                                  {rp.title}
                                </span>
                                <Maximize2 className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover/p:text-red-600" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="border-t border-neutral-200 pt-5">
                        <button
                          onClick={() => onOpenRFQ(cat.title)}
                          className="group/btn flex min-h-14 w-full items-center justify-between bg-neutral-900 px-5 py-4 text-base font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          <span className="truncate pr-3">Enquire for {cat.title}</span>
                          <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================== BOTTOM CTA ======================== */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 text-white lg:py-28">
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
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/25 blur-[140px]"
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-4xl space-y-7 px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="text-sm font-semibold text-red-400">Build to print</span>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Need a custom component <span className="text-red-500">not listed here?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300">
            Our Coimbatore works handles build-to-print fabrication across mild steel, stainless steel and
            aluminium. Send your drawings for a rapid feasibility review.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onOpenRFQ()}
              className="group inline-flex items-center justify-center gap-2 bg-red-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Submit your drawings
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="tel:+919585953545"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5 text-red-400" />
              +91 95859 53545
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};