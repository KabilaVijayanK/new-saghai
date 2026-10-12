import React, { useState } from 'react';
import { COMPANY_INFO, PRODUCT_CATEGORIES, INDUSTRIES_SERVED } from '../../data/companyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    productComponent: '',
    quantity: '1',
    material: 'Mild Steel',
    requirement: '',
    message: '',
    uploadedFiles: [] as string[]
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      setTimeout(() => {
        const fileNames = Array.from(e.target.files!).map(f => f.name);
        setFormData(prev => ({
          ...prev,
          uploadedFiles: [...prev.uploadedFiles, ...fileNames]
        }));
        setUploading(false);
      }, 400);
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SE-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqRef(id);
    setSubmitted(true);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <div className="space-y-0">
      
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/30 px-3 py-1">
              <span className="w-2 h-2 bg-red-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-red-300 font-semibold">
                DIRECT RFQ ENQUIRY
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Tell Us What You Need to Build.
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Share your drawing, specification or project requirement with Saghai Engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details & Location (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold block mb-1">
                    WORKS & OFFICE LOCATION
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Saghai Engineering
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    Coimbatore, Tamil Nadu, India
                  </p>
                </div>

                <div className="space-y-4 text-sm text-neutral-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900 text-xs font-mono uppercase">Factory Address:</strong>
                      <span className="text-xs leading-relaxed">{COMPANY_INFO.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900 text-xs font-mono uppercase">Direct Phone:</strong>
                      <a
                        href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                        className="text-sm font-semibold text-neutral-900 hover:text-red-600 font-mono"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900 text-xs font-mono uppercase">Engineering Email:</strong>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-xs font-mono text-neutral-900 hover:text-red-600 break-all"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900 text-xs font-mono uppercase">Operational Hours:</strong>
                      <span className="text-xs">{COMPANY_INFO.workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-600 space-y-2">
                  <span className="font-semibold text-neutral-900 block">Facility Specifications:</span>
                  <p className="text-[11px] text-neutral-500">
                    30,000+ sq. ft. covered manufacturing floor across 3 fabrication bays equipped with gantry cranes, 600T hydraulic press, CNC laser, and hydro testing.
                  </p>
                </div>
              </div>

              {/* Map Locator Card */}
              <div className="border border-neutral-200 bg-neutral-900 text-white p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                  <Building2 className="w-4 h-4" />
                  <span>COIMBATORE INDUSTRIAL HUB</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Located in Vellakinar, Coimbatore with direct highway connectivity to major industrial zones, sea ports (Tuticorin & Cochin) and national transport corridors.
                </p>
                <div className="pt-1 text-[11px] font-mono text-neutral-400">
                  PIN CODE: 641029 · TAMIL NADU
                </div>
              </div>

            </div>

            {/* Comprehensive RFQ Form (8 cols) */}
            <div className="lg:col-span-8">
              
              {submitted ? (
                <div className="bg-neutral-50 border border-neutral-200 p-8 sm:p-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-red-100 text-red-600 mx-auto flex items-center justify-center rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                      Requirement Registered
                    </span>
                    <h2 className="text-3xl font-bold text-neutral-900">
                      Enquiry #{rfqRef} Received
                    </h2>
                    <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                      Thank you for submitting your requirement. Our engineering team at Saghai Engineering will review your specifications, drawings, and required delivery schedule.
                    </p>
                  </div>

                  <div className="bg-white p-5 border border-neutral-200 text-left text-xs text-neutral-700 space-y-1.5 max-w-xl mx-auto font-mono">
                    <p><strong>Contact Name:</strong> {formData.name}</p>
                    <p><strong>Company:</strong> {formData.company}</p>
                    <p><strong>Email / Phone:</strong> {formData.email} / {formData.phone}</p>
                    <p><strong>Component Category:</strong> {formData.productComponent || 'Custom Component'}</p>
                    <p><strong>Material Selected:</strong> {formData.material}</p>
                    <p><strong>Quantity:</strong> {formData.quantity}</p>
                    {formData.uploadedFiles.length > 0 && (
                      <p><strong>Drawings Attached:</strong> {formData.uploadedFiles.join(', ')}</p>
                    )}
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-neutral-300 p-6 sm:p-10 shadow-sm">
                  
                  <div className="border-b border-neutral-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Engineering Quotation Request
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Fill out the form below. For custom-engineered items, attaching your component drawings (PDF, DWG, STEP) allows our engineering team to provide an accurate feasibility and cost estimate.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Basic Contacts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Your Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. S. Kumar"
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Company Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Industrial Systems Ltd."
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                        />
                      </div>
                    </div>

                    {/* Technical Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Industry Sector
                        </label>
                        <select
                          value={formData.industry}
                          onChange={e => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none bg-white"
                        >
                          <option value="">Select Industry</option>
                          {INDUSTRIES_SERVED.map(ind => (
                            <option key={ind.id} value={ind.name}>{ind.name}</option>
                          ))}
                          <option value="Other">Other Industrial Sector</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Product / Component Category
                        </label>
                        <select
                          value={formData.productComponent}
                          onChange={e => setFormData({ ...formData, productComponent: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none bg-white"
                        >
                          <option value="">Select Category</option>
                          {PRODUCT_CATEGORIES.map(p => (
                            <option key={p.id} value={p.title}>{p.title}</option>
                          ))}
                          <option value="Laser Cutting Service">Precision CNC Laser Cutting</option>
                          <option value="Plate Bending Service">Industrial Plate Bending</option>
                          <option value="Other Custom Fabrication">Other Custom Fabrication</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Material Specification
                        </label>
                        <select
                          value={formData.material}
                          onChange={e => setFormData({ ...formData, material: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none bg-white"
                        >
                          <option value="Mild Steel">Mild Steel (IS2062 / Carbon Steel)</option>
                          <option value="SA516 Boiler Steel">SA516 Boiler / Pressure Vessel Plate</option>
                          <option value="Stainless Steel SS304">Stainless Steel SS304</option>
                          <option value="Stainless Steel SS316">Stainless Steel SS316</option>
                          <option value="Aluminium">Aluminium</option>
                          <option value="Other">Other / Free Issue Material</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                          Quantity / Order Batch
                        </label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 1 unit, 10 units, Monthly supply"
                          className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                        />
                      </div>
                    </div>

                    {/* Drawing Attachment Upload */}
                    <div className="border border-dashed border-neutral-300 p-5 bg-neutral-50/60 text-center">
                      <input
                        type="file"
                        id="contact-file-input"
                        multiple
                        accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="contact-file-input"
                        className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                      >
                        <Upload className="w-6 h-6 text-red-600" />
                        <span className="text-xs font-semibold text-neutral-800">
                          {uploading ? 'Processing drawings...' : 'Upload Drawing / Technical Datasheet'}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          Supported formats: PDF, DWG, DXF, STEP, STP, IGES. Files are kept under strict confidentiality.
                        </span>
                      </label>

                      {formData.uploadedFiles.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 justify-center">
                          {formData.uploadedFiles.map((fn, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 bg-white border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700"
                            >
                              <FileText className="w-3.5 h-3.5 text-red-600" />
                              <span className="truncate max-w-[200px]">{fn}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-neutral-400 hover:text-red-600 ml-1 font-bold"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Specific requirement & Message */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1">
                        Application Details & Scope of Work
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe dimensions, wall/plate thickness, operating pressures, welding codes, required NDT testing (UT, LPT, Radiography, Hydrostatic), surface treatment (blasting, primer, painting), and expected dispatch timeline..."
                        className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <span className="text-xs text-neutral-500 font-mono">
                        Direct Desk: {COMPANY_INFO.phone}
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <span>Send Engineering Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>

                </div>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
