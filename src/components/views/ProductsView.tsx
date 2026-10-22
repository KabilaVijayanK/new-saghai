import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { PRODUCT_CATEGORIES } from '../../data/companyData';
import { ArrowRight, ArrowUpRight, Phone, Images } from 'lucide-react';
import { SafeImg, getCategoryImages, ProductCategory } from './productImages';

const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';
const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductsViewProps {
  onOpenRFQ: (initialCategory?: string) => void;
  /** Opens the product details page */
  onSelectProduct: (product: ProductCategory) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onOpenRFQ, onSelectProduct }) => {
  const reduce = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const categories = PRODUCT_CATEGORIES as ProductCategory[];
  const filtered =
    selectedCategory === 'all' ? categories : categories.filter((c) => c.id === selectedCategory);

  const filters = [
    { id: 'all', title: 'All products', count: categories.length as number | null },
    ...categories.map((c) => ({ id: c.id, title: c.title, count: null as number | null })),
  ];

  return (
    <div className="bg-white text-neutral-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ============================ HERO ============================ */}
      <section className="relative isolate flex items-center overflow-hidden bg-neutral-950 text-white lg:min-h-[360px]">
        <motion.img
          src={HERO_IMG}
          alt=""
          aria-hidden
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/70" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent"
        />
        <div aria-hidden className="absolute left-0 top-0 -z-10 h-full w-1.5 bg-red-600" />

        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-md"
          >
            <span className="h-2.5 w-2.5 animate-pulse bg-red-500" />
            Manufactured products
          </motion.div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
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
            className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg"
          >
            We manufacture a broad range of custom-engineered products and fabricated components based
            on customer drawings, specifications and application requirements.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => onOpenRFQ()}
              className="group inline-flex items-center justify-center gap-2 bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98] sm:text-base"
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

      {/* ======================= PRODUCT GRID ======================= */}
      <section id="product-grid" className="scroll-mt-40 bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-10 bg-red-600" />
                <span className="text-sm font-semibold text-red-600">Product range</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {selectedCategory === 'all' ? 'Everything we manufacture' : filtered[0]?.title}
              </h2>
            </div>
            <span className="hidden text-base font-medium text-neutral-500 sm:block">
              Showing {filtered.length} of {categories.length}
            </span>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, idx) => {
                const imgs = getCategoryImages(cat);
                const number = String(categories.findIndex((c) => c.id === cat.id) + 1).padStart(2, '0');
                const isHover = hovered === cat.id;

                return (
                  <motion.article
                    layout
                    key={cat.id}
                    initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: Math.min(idx, 5) * 0.08, ease: EASE }}
                    onMouseEnter={() => setHovered(cat.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative flex flex-col overflow-hidden border border-neutral-200 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                  >
                    {/* IMAGE */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(cat)}
                      aria-label={`View details for ${cat.title}`}
                      className="relative block aspect-video w-full overflow-hidden bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                    >
                      <SafeImg
                        src={imgs[0]}
                        alt={cat.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                      {/* second image cross-fades in on hover */}
                      {imgs[1] && (
                        <SafeImg
                          src={imgs[1]}
                          alt=""
                          aria-hidden
                          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                            isHover ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
                          }`}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/45 via-neutral-950/5 to-transparent" />

                      <span className="absolute left-0 top-5 bg-red-600 px-3 py-1.5 text-sm font-bold text-white">
                        Category {number}
                      </span>
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <Images className="h-3.5 w-3.5" />
                        {imgs.length} photos
                      </span>

                      {/* hover pill */}
                      <span className="absolute bottom-4 left-4 inline-flex translate-y-3 items-center gap-2 bg-white px-4 py-2 text-sm font-bold text-neutral-900 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Open gallery
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      </span>
                      {/* red edge reveal */}
                      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-700 group-hover:scale-x-100" />
                    </button>

                    {/* BODY */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      {cat.applicableStandards && (
                        <span className="w-fit border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600">
                          {cat.applicableStandards}
                        </span>
                      )}
                      <h3 className="text-2xl font-extrabold leading-tight tracking-tight">{cat.title}</h3>
                      <p className="line-clamp-3 text-[15px] leading-7 text-neutral-600">{cat.description}</p>

                      {cat.typicalMaterials?.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {cat.typicalMaterials.slice(0, 3).map((m, i) => (
                            <li
                              key={i}
                              className="border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700"
                            >
                              {m}
                            </li>
                          ))}
                          {cat.typicalMaterials.length > 3 && (
                            <li className="px-1 py-1 text-xs font-semibold text-red-600">
                              +{cat.typicalMaterials.length - 3} more
                            </li>
                          )}
                        </ul>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectProduct(cat)}
                        className="group/btn mt-auto flex w-full items-center justify-between border-t border-neutral-200 pt-5 text-left text-sm font-bold text-neutral-900 transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                      >
                        <span>View Details</span>
                        <span className="flex h-10 w-10 items-center justify-center bg-neutral-900 text-white transition-all duration-300 group-hover/btn:bg-red-600">
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </span>
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
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
              className="group inline-flex items-center justify-center gap-2 bg-red-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98]"
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