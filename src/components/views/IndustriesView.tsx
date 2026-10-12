import React from 'react';
import { INDUSTRIES_SERVED } from '../../data/companyData';
import { ArrowRight, Check, ShieldCheck, Factory } from 'lucide-react';

interface IndustriesViewProps {
  onOpenRFQ: (industryName?: string) => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = ({ onOpenRFQ }) => {
  return (
    <div className="space-y-0">
      
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                INDUSTRIAL SECTORS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built for Diverse Industrial Applications
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our manufacturing experience extends across multiple industrial sectors where custom fabrication, engineered components and application-specific manufacturing are required.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <div
                key={ind.id}
                className="bg-white border border-neutral-200 p-6 flex flex-col justify-between space-y-6 hover:border-red-600 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-100 pb-2">
                    <span>SECTOR {String(idx + 1).padStart(2, '0')}</span>
                    <Factory className="w-4 h-4 text-neutral-400" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-neutral-900">
                      {ind.name}
                    </h2>
                    <p className="text-xs font-mono text-red-600 mt-1">
                      {ind.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {ind.description}
                  </p>

                  {/* Key Components */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Fabricated Components
                    </span>
                    <div className="space-y-1">
                      {ind.keyComponents.map((comp, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-700">
                          <span className="w-1.5 h-1.5 bg-red-600 shrink-0" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demanding Factors */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Critical Parameters
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ind.demandingFactors.map((df, i) => (
                        <span key={i} className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5">
                          {df}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onOpenRFQ(ind.name)}
                    className="w-full py-2 bg-neutral-50 hover:bg-red-600 hover:text-white border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>Enquire for {ind.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Supply & Defense Precision Note */}
      <section className="bg-neutral-50/70 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            ENGINEERING GOVERNANCE
          </span>
          <h3 className="text-2xl font-bold text-neutral-900">
            Strict Material Traceability & Non-Destructive Testing
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Whether manufacturing high-pressure chemical reactors or defense mine plough assemblies, every component receives complete drawing compliance, Mill Test Report (MTR) correlation, and NDT validation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenRFQ()}
              className="px-6 py-3 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
            >
              Discuss Application-Specific Needs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
