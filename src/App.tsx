import React, { useState, useEffect } from 'react';
import { ActivePage, ProjectItem } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ServicesView } from './components/views/ServicesView';
import { ProductsView } from './components/views/ProductsView';
import { ProductDetailView } from './components/views/ProductDetailView';
import type { ProductCategory } from './components/views/productImages';
import { IndustriesView } from './components/views/IndustriesView';
import { CapabilitiesView } from './components/views/CapabilitiesView';
import { ProjectsView } from './components/views/ProjectsView';
import { ContactView } from './components/views/ContactView';
import { RFQModal } from './components/common/RFQModal';
import { ProjectModal } from './components/common/ProjectModal';
import { Phone, Mail, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [rfqInitialCategory, setRfqInitialCategory] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    setSelectedProduct(null); // leaving / re-clicking a page always closes the product details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRFQ = (initialCategory: string = '') => {
    setRfqInitialCategory(initialCategory);
    setIsRFQOpen(true);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleSelectProduct = (product: ProductCategory) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestSimilarProject = (projectTitle: string) => {
    setSelectedProject(null);
    setRfqInitialCategory(`Similar to: ${projectTitle}`);
    setIsRFQOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      
      {/* Top Essential Utility Strip (Quiet, unobtrusive) */}
      <div className="bg-neutral-900 text-white text-[11px] font-mono py-1.5 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-3">
            <span>COIMBATORE WORKS · ESTABLISHED 1978</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">FABRICATION FACILITY</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-white hidden sm:flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3 text-red-500" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Sticky Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenRFQ={handleOpenRFQ}
            onSelectProject={handleSelectProject}
          />
        )}

        {activePage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenRFQ={() => handleOpenRFQ()}
          />
        )}

        {activePage === 'services' && (
          <ServicesView
            onOpenRFQ={handleOpenRFQ}
          />
        )}

        {/* Products list */}
        {activePage === 'products' && !selectedProduct && (
          <ProductsView
            onOpenRFQ={handleOpenRFQ}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* Product details page */}
        {activePage === 'products' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRFQ={handleOpenRFQ}
            onSelectProject={handleSelectProject}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'industries' && (
          <IndustriesView
            onOpenRFQ={handleOpenRFQ}
          />
        )}

        {activePage === 'capabilities' && (
          <CapabilitiesView
            onOpenRFQ={handleOpenRFQ}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsView
            onSelectProject={handleSelectProject}
            onOpenRFQ={handleOpenRFQ}
          />
        )}

        {activePage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRFQ={() => handleOpenRFQ()}
      />

      {/* Interactive Global RFQ Modal */}
      <RFQModal
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        initialProduct={rfqInitialCategory}
      />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
      />

      {/* Scroll to Top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 p-2.5 bg-neutral-900 text-white hover:bg-red-600 transition-colors shadow-lg border border-neutral-700"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}