import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ProjectItem } from '../../types';
import { PRODUCT_CATEGORIES, PROJECTS_EXPERIENCE } from '../../data/companyData';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Phone,
  X,
  ZoomIn,
} from 'lucide-react';
import { SafeImg, getCategoryImages, ProductCategory } from './productImages';

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductDetailViewProps {
  product: ProductCategory;
  onBack: () => void;
  onOpenRFQ: (initialCategory?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectProduct: (product: ProductCategory) => void;
  /** Optional: opens the Contact page. Falls back to a phone link if omitted. */
  onContact?: () => void;
}

const getProjectsForCategory = (catTitle: string) =>
  PROJECTS_EXPERIENCE.filter((p) => {
    if (catTitle.includes('Vessels') && p.category === 'Vessels & Tanks') return true;
    if (catTitle.includes('Tanks') && p.category === 'Vessels & Tanks') return true;
    if (catTitle.includes('Earthmoving') && p.category === 'Earthmoving & Mining') return true;
    if (catTitle.includes('Structures') && p.category === 'Industrial Machinery') return true;
    if (catTitle.includes('Process') && p.category === 'Process Equipment') return true;
    return false;
  });

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 1.05 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.98 }),
};

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onOpenRFQ,
  onSelectProject,
  onSelectProduct,
  onContact,
}) => {
  const reduce = useReducedMotion();
  const images = getCategoryImages(product);
  const categories = PRODUCT_CATEGORIES as ProductCategory[];
  const number = String(categories.findIndex((c) => c.id === product.id) + 1).padStart(2, '0');
  const related = getProjectsForCategory(product.title);
  const others = categories.filter((c) => c.id !== product.id).slice(0, 3);

  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const [lightbox, setLightbox] = useState(false);

  // reset + scroll to top when the product changes
  useEffect(() => {
    setPage([0, 0]);
    setLightbox(false);
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, [product.id, reduce]);

  const paginate = useCallback(
    (dir: number) => setPage(([i]) => [(i + dir + images.length) % images.length, dir]),
    [images.length]
  );
  const goTo = (i: number) => setPage(([cur]) => [i, i > cur ? 1 : -1]);

  // keyboard: arrows + escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paginate]);

  // lock body scroll in lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-neutral-900 antialiased selection:bg-red-600 selection:text-white"
    >
      {/* ============================ HEADER ============================ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <SafeImg
          src={images[0]}
          alt=""
          aria-hidden
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* light overlay: just enough for text contrast, image stays visible */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/60 via-neutral-950/20 to-transparent" />
        <div aria-hidden className="absolute left-0 top-0 -z-10 h-full w-1.5 bg-red-600" />

        <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20">
          <motion.button
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={onBack}
            className="group inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All products
          </motion.button>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-red-600 px-3 py-1.5 text-sm font-bold"
            >
              Category {number}
            </motion.span>
            {product.applicableStandards && (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="border border-white/30 px-3 py-1.5 text-sm font-medium text-neutral-200"
              >
                {product.applicableStandards}
              </motion.span>
            )}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tighter drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                key={product.id}
                className="block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              >
                {product.title}
              </motion.span>
            </span>
          </h1>

          {/* Header CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => onOpenRFQ(product.title)}
              className="group inline-flex items-center justify-center gap-2 bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98] sm:text-base"
            >
              Enquiry now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            {onContact ? (
              <button
                onClick={onContact}
                className="group inline-flex items-center justify-center gap-2 border border-white/70 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-900 active:scale-[0.98] sm:text-base"
              >
                Contact us
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            ) : (
              <a
                href="tel:+919585953545"
                className="group inline-flex items-center justify-center gap-2 border border-white/70 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-900 active:scale-[0.98] sm:text-base"
              >
                <Phone className="h-5 w-5" />
                Contact us
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================ GALLERY + INFO ============================ */}
      <section className="bg-neutral-50 py-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:px-8">
          {/* ---------- GALLERY ---------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="group relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 bg-neutral-200 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial={reduce ? false : 'enter'}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.65, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) paginate(1);
                    else if (info.offset.x > 80) paginate(-1);
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <SafeImg
                    src={images[index]}
                    alt={`${product.title} - photo ${index + 1}`}
                    loading="eager"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />

              {/* counter */}
              <span className="absolute left-0 top-5 bg-red-600 px-3 py-1.5 text-sm font-bold tabular-nums text-white">
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>

              {/* zoom */}
              <button
                onClick={() => setLightbox(true)}
                aria-label="View full screen"
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-white/90 text-neutral-900 opacity-0 backdrop-blur transition-all duration-300 hover:bg-red-600 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
              >
                <ZoomIn className="h-5 w-5" />
              </button>

              {/* arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-900 opacity-0 backdrop-blur transition-all duration-300 hover:bg-red-600 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-neutral-900 opacity-0 backdrop-blur transition-all duration-300 hover:bg-red-600 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* progress bar */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-red-600"
                  animate={{ width: `${((index + 1) / images.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((src, i) => {
                  const active = i === index;
                  return (
                    <motion.button
                      key={src + i}
                      onClick={() => goTo(i)}
                      aria-label={`Show image ${i + 1}`}
                      aria-current={active}
                      whileHover={reduce ? undefined : { y: -4 }}
                      className={`relative aspect-[4/3] overflow-hidden border-2 transition-colors ${
                        active ? 'border-red-600' : 'border-transparent hover:border-neutral-400'
                      }`}
                    >
                      <SafeImg src={src} alt="" className="h-full w-full object-cover" />
                      {!active && <span className="absolute inset-0 bg-neutral-950/35 transition-opacity hover:opacity-0" />}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------- INFO ---------- */}
          <div className="space-y-10">
            <motion.div {...fadeUp()}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-10 bg-red-600" />
                <span className="text-sm font-semibold text-red-600">Overview</span>
              </div>
              <p className="text-lg leading-8 text-neutral-700">{product.description}</p>
            </motion.div>

            {/* quick facts */}
            <motion.div {...fadeUp(0.05)} className="grid grid-cols-3 border border-neutral-200 bg-white">
              {[
                { k: 'Materials', v: product.typicalMaterials?.length ?? 0 },
                { k: 'Examples', v: product.examples?.length ?? 0 },
                { k: 'Projects', v: related.length },
              ].map((s, i) => (
                <div key={s.k} className={`p-5 text-center ${i > 0 ? 'border-l border-neutral-200' : ''}`}>
                  <div className="text-3xl font-black tabular-nums text-neutral-900">{s.v}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">{s.k}</div>
                </div>
              ))}
            </motion.div>

            {product.typicalMaterials?.length > 0 && (
              <motion.div {...fadeUp(0.05)}>
                <h2 className="mb-4 text-xl font-extrabold tracking-tight">Materials in documented examples</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.typicalMaterials.map((m, i) => (
                    <motion.li
                      key={i}
                      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                      className="border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:border-red-600 hover:text-red-600"
                    >
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {product.examples?.length > 0 && (
              <motion.div {...fadeUp(0.05)}>
                <h2 className="mb-4 text-xl font-extrabold tracking-tight">Selected examples</h2>
                <ul className="space-y-3">
                  {product.examples.map((ex, i) => (
                    <motion.li
                      key={i}
                      initial={reduce ? false : { opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
                      className="flex items-start gap-3 border border-neutral-200 bg-white p-4 text-[15px] leading-6 text-neutral-800 transition-colors hover:border-neutral-400"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-red-600 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {ex}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {related.length > 0 && (
              <motion.div {...fadeUp(0.05)}>
                <h2 className="mb-4 text-xl font-extrabold tracking-tight text-red-600">
                  Documented project experience
                </h2>
                <div className="space-y-2">
                  {related.slice(0, 3).map((rp) => (
                    <button
                      key={rp.id}
                      onClick={() => onSelectProject(rp)}
                      className="group/p flex w-full items-center justify-between gap-3 border border-neutral-200 bg-white px-4 py-3.5 text-left transition-all hover:border-red-600 hover:bg-red-50"
                    >
                      <span className="truncate text-[15px] font-semibold">{rp.title}</span>
                      <Maximize2 className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover/p:text-red-600" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA card */}
            <motion.div {...fadeUp(0.05)} className="relative overflow-hidden bg-neutral-950 p-7 text-white">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/40 blur-3xl" />
              <h3 className="relative text-2xl font-extrabold tracking-tight">Interested in this product?</h3>
              <p className="relative mt-2 text-neutral-300">
                Share your drawings and specifications and we will respond with a feasibility review.
              </p>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => onOpenRFQ(product.title)}
                  className="group inline-flex flex-1 items-center justify-center gap-2 bg-red-600 px-6 py-3.5 font-bold transition-all hover:bg-red-700 hover:shadow-[0_14px_40px_-10px_rgba(220,38,38,0.8)] active:scale-[0.98]"
                >
                  Enquire now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="tel:+919585953545"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3.5 font-bold transition-colors hover:border-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 text-red-400" />
                  Call us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ OTHER PRODUCTS ============================ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-10 bg-red-600" />
                <span className="text-sm font-semibold text-red-600">Keep exploring</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Other products</h2>
            </div>
            <button
              onClick={onBack}
              className="hidden items-center gap-2 text-sm font-bold text-neutral-900 transition-colors hover:text-red-600 sm:inline-flex"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {others.map((o, i) => (
              <motion.button
                key={o.id}
                {...fadeUp(i * 0.08)}
                onClick={() => onSelectProduct(o)}
                className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 text-left"
              >
                <SafeImg
                  src={getCategoryImages(o)[0]}
                  alt={o.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-600 transition-transform duration-700 group-hover:scale-x-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-xl font-extrabold leading-tight">{o.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-400">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ LIGHTBOX ============================ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.title} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/95 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-red-600"
            >
              <X className="h-6 w-6" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-red-600"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-red-600"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw]"
            >
              <SafeImg
                src={images[index]}
                alt={`${product.title} - photo ${index + 1}`}
                loading="eager"
                className="max-h-[88vh] max-w-[92vw] object-contain"
              />
            </motion.div>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-1.5 text-sm font-semibold tabular-nums text-white">
              {index + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};