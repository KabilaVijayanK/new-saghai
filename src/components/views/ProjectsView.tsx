import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectItem } from '../../types';
import { PROJECTS_EXPERIENCE } from '../../data/companyData';
import { ArrowRight, Maximize2, Layers, Weight, Ruler, Search, X } from 'lucide-react';

/* ---------- Images (served from /public/images) ---------- */
const VESSEL_IMG = '/images/project_pressure_vessel_1791778050554.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';
const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

/**
 * Picks an image per project. Uses the project's own `image` field if your
 * data has one; otherwise falls back by category, then by keyword.
 * Add more photos to /public/images and map them here.
 */
const getProjectImage = (project: ProjectItem, idx: number) => {
  if (project.image) return { src: project.image, pos: 'center' };

  const text = `${project.title} ${project.category}`.toLowerCase();
  const alt = ['center', 'left center', 'right center'][idx % 3];

  if (text.includes('vessel') || text.includes('tank') || text.includes('process'))
    return { src: VESSEL_IMG, pos: alt };
  if (text.includes('earth') || text.includes('mining') || text.includes('dozer') || text.includes('bend'))
    return { src: BENDING_IMG, pos: alt };
  return { src: HERO_IMG, pos: alt };
};

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

interface ProjectsViewProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenRFQ: (initialRequirement?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject, onOpenRFQ }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [preview, setPreview] = useState<{ src: string; title: string; category: string } | null>(null);

  useEffect(() => {
    if (!preview) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [preview]);

  const categories = [
    { id: 'all', label: `All Projects (${PROJECTS_EXPERIENCE.length})` },
    { id: 'Vessels & Tanks', label: 'Vessels & Tanks' },
    { id: 'Earthmoving & Mining', label: 'Earthmoving & Mining' },
    { id: 'Industrial Machinery', label: 'Industrial Machinery' },
    { id: 'Process Equipment', label: 'Process Equipment' },
  ];

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS_EXPERIENCE.filter((p) => {
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.application.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [filterCategory, searchQuery]);

  return (
    <div className="space-y-0">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
        <img
          src={VESSEL_IMG}
          alt="Fabricated pressure vessel"
          onError={hideOnError}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-neutral-950/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/40 backdrop-blur px-3 py-1">
              <span className="w-2 h-2 bg-red-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                Shopfloor Track Record
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              From Components to{' '}
              <span className="text-red-500">Complete Fabricated Assemblies</span>
            </h1>

            <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Our project experience demonstrates our ability to manufacture application-specific
              components and fabricated products across demanding industrial requirements.
            </p>

            <div className="flex flex-wrap gap-6 pt-2 text-sm">
              <div>
                <strong className="block text-3xl font-extrabold text-white">
                  {PROJECTS_EXPERIENCE.length}
                </strong>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Documented Projects
                </span>
              </div>
              <div className="w-px bg-neutral-700" />
              <div>
                <strong className="block text-3xl font-extrabold text-white">4</strong>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Industry Segments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER + SEARCH ================= */}
      <section className="bg-white/95 backdrop-blur border-b border-neutral-200 py-3 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors border ${
                    filterCategory === c.id
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900 hover:text-neutral-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search material, part or spec..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-neutral-300 focus:border-red-600 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs text-neutral-500 font-mono">
            <span>SHOWING {filteredProjects.length} DOCUMENTED INDUSTRIAL PROJECTS</span>
            <span>CLICK A CARD TO INSPECT DETAILED SPECIFICATIONS</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white border border-dashed border-neutral-300 py-20 text-center space-y-3">
              <p className="text-neutral-900 font-semibold">No projects match your search.</p>
              <p className="text-sm text-neutral-500">
                Try a different keyword or clear the filters.
              </p>
              <button
                onClick={() => {
                  setFilterCategory('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 bg-neutral-900 hover:bg-red-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const img = getProjectImage(project, idx);
                return (
                  <article
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="group cursor-pointer bg-white border border-neutral-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-62 overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950">
                      <button
                        type="button"
                        aria-label={`View larger image of ${project.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPreview({
                            src: img.src,
                            title: project.title,
                            category: project.category,
                          });
                        }}
                        className="absolute inset-0 h-full w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        <img
                          src={img.src}
                          alt={project.title}
                          loading="lazy"
                          onError={hideOnError}
                          style={{ objectPosition: img.pos }}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </button>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

                      <span className="pointer-events-none absolute top-3 left-3 text-[11px] font-mono font-bold text-white bg-red-600 px-2 py-1">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="pointer-events-none absolute top-3 right-3 text-[10px] font-mono font-semibold text-neutral-900 bg-white/95 px-2 py-1">
                        {project.category}
                      </span>

                      <div
                        aria-hidden
                        className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center bg-white/90 text-neutral-900 transition-colors group-hover:bg-red-600 group-hover:text-white"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Specs */}
                        <div className="grid gap-2 text-xs">
                          <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200/80 p-2.5">
                            <Layers className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="block text-[10px] font-mono uppercase text-neutral-400">
                                Material
                              </span>
                              <span className="text-neutral-800 font-medium break-words">
                                {project.material}
                              </span>
                            </div>
                          </div>

                          {(project.weight || project.dimensions) && (
                            <div className="grid grid-cols-2 gap-2">
                              {project.weight && (
                                <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200/80 p-2.5">
                                  <Weight className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                  <div className="min-w-0">
                                    <span className="block text-[10px] font-mono uppercase text-neutral-400">
                                      Weight
                                    </span>
                                    <span className="text-neutral-900 font-bold break-words">
                                      {project.weight}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {project.dimensions && (
                                <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200/80 p-2.5">
                                  <Ruler className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                  <div className="min-w-0">
                                    <span className="block text-[10px] font-mono uppercase text-neutral-400">
                                      Size
                                    </span>
                                    <span className="text-neutral-800 font-medium break-words">
                                      {project.dimensions}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-neutral-500">
                          <span className="font-semibold text-neutral-700">Application: </span>
                          {project.application}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-red-600 transition-colors">
                          Inspect Drawing Scope
                        </span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= CONSULTATION BANNER ================= */}
      <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          onError={hideOnError}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-950/70" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
          <h3 className="text-3xl sm:text-4xl font-extrabold">
            Have a Similar Industrial Requirement?
          </h3>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            From 50 KL high-tonnage sprinkler tanks to precision 1,200 mm butterfly valve bodies,
            Saghai Engineering executes custom fabrication to exact client specifications.
          </p>
          <div className="pt-3">
            <button
              onClick={() => onOpenRFQ()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold uppercase tracking-wider transition-colors shadow-lg"
            >
              Discuss Your Project Requirements <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {preview && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} image`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white sm:px-6">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{preview.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{preview.category}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close image preview"
                  onClick={() => setPreview(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center bg-black/30 p-2 sm:p-5">
                <img
                  src={preview.src}
                  alt={preview.title}
                  className="max-h-[78vh] max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};