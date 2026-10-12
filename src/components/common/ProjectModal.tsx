import React from 'react';
import { ProjectItem } from '../../types';
import { X, Check, ArrowRight, ShieldCheck, Layers, Gauge, Weight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl shadow-2xl border border-neutral-300 my-8">
        
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-5 flex items-center justify-between border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
              <span>Project Specification</span>
              <span>·</span>
              <span className="text-red-400">{project.category}</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white font-sans">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-neutral-700 leading-relaxed">
            {project.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-neutral-50 p-4 border border-neutral-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                Material Grade
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                <Layers className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="truncate">{project.material}</span>
              </div>
            </div>

            {project.weight && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                  Component Weight
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                  <Weight className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{project.weight}</span>
                </div>
              </div>
            )}

            {project.dimensions && (
              <div className={project.weight ? '' : 'col-span-2'}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5">
                  Dimensions / Size
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                  <Gauge className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="truncate">{project.dimensions}</span>
                </div>
              </div>
            )}
          </div>

          {/* Application */}
          <div className="space-y-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Industrial Application
            </h4>
            <p className="text-sm font-medium text-neutral-900">
              {project.application}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Verified Technical Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keySpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50/80 p-2.5 border border-neutral-200/80"
                >
                  <Check className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality & Traceability Statement */}
          <div className="flex items-start gap-3 bg-red-50/50 border border-red-200/60 p-3.5 text-xs text-neutral-700">
            <ShieldCheck className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <div>
              <strong className="text-neutral-900 block mb-0.5">Application-Specific Quality Compliance</strong>
              <span>
                Fabricated to customer drawings, welding parameters (FCAW/GMAW/SMAW/GTAW), and tested with applicable Non-Destructive Testing (UT, LPT, Radiography, Hydrostatic).
              </span>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Close
            </button>
            <button
              onClick={() => onRequestSimilar(project.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
            >
              <span>Discuss Similar Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
