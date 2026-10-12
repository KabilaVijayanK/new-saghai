import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { PROJECTS_EXPERIENCE } from '../../data/companyData';
import { ArrowRight, Maximize2, Layers, Weight, Gauge, Check } from 'lucide-react';

const VESSEL_IMG = '/images/project_pressure_vessel_1791778050554.jpg';
const BENDING_IMG = '/images/capability_plate_bending_1791778038932.jpg';
const HERO_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

interface ProjectsViewProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenRFQ: (initialRequirement?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onSelectProject,
  onOpenRFQ,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Projects (16)' },
    { id: 'Vessels & Tanks', label: 'Vessels & Tanks' },
    { id: 'Earthmoving & Mining', label: 'Earthmoving & Mining' },
    { id: 'Industrial Machinery', label: 'Industrial Machinery' },
    { id: 'Process Equipment', label: 'Process Equipment' },
  ];

  const filteredProjects = PROJECTS_EXPERIENCE.filter(p => {
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.application.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-0">
      
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                SHOPFLOOR TRACK RECORD
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              From Components to Complete Fabricated Assemblies
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our project experience demonstrates our ability to manufacture application-specific components and fabricated products across demanding industrial requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-neutral-100 border-b border-neutral-200 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                    filterCategory === c.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search material, part or spec..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 focus:border-red-600 outline-none"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex justify-between items-center text-xs text-neutral-500 font-mono">
            <span>SHOWING {filteredProjects.length} DOCUMENTED INDUSTRIAL PROJECTS</span>
            <span>CLICK TO INSPECT DETAILED SPECIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer bg-white border border-neutral-200 hover:border-red-600 transition-all p-6 flex flex-col justify-between space-y-5 hover:shadow-md"
              >
                <div className="space-y-4">
                  
                  {/* Category and Index */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-100 pb-2.5">
                    <span className="text-neutral-500">{project.category}</span>
                    <span className="group-hover:text-red-600 font-bold transition-colors">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technical Specs Summary */}
                  <div className="bg-neutral-50 p-3 border border-neutral-200/80 space-y-1.5 text-xs font-mono">
                    <div className="flex items-start justify-between">
                      <span className="text-neutral-400 uppercase text-[10px]">Material:</span>
                      <span className="text-neutral-800 font-medium text-right truncate max-w-[170px]">
                        {project.material}
                      </span>
                    </div>

                    {project.weight && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 uppercase text-[10px]">Weight:</span>
                        <span className="text-neutral-900 font-bold">
                          {project.weight}
                        </span>
                      </div>
                    )}

                    {project.dimensions && (
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400 uppercase text-[10px]">Dimensions:</span>
                        <span className="text-neutral-800 font-medium text-right truncate max-w-[170px]">
                          {project.dimensions}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Application */}
                  <div className="text-[11px] text-neutral-500">
                    <span className="font-semibold text-neutral-700">Application: </span>
                    {project.application}
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-neutral-600">
                    Inspect Drawing Scope
                  </span>
                  <div className="w-7 h-7 bg-neutral-100 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Project Consultation Banner */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Have a Similar Industrial Requirement?
          </h3>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto">
            From 50 KL high-tonnage sprinkler tanks to precision 1,200 mm butterfly valve bodies, Saghai Engineering executes custom fabrication to exact client specifications.
          </p>
          <div className="pt-3">
            <button
              onClick={() => onOpenRFQ()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              Discuss Your Project Requirements
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
