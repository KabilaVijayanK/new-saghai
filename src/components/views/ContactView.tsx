import React, { useMemo, useRef, useState } from 'react';
import { COMPANY_INFO, PRODUCT_CATEGORIES, INDUSTRIES_SERVED } from '../../data/companyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  X,
  Copy,
  Printer,
  Navigation,
  Check,
} from 'lucide-react';

type UploadedFile = { name: string; size: number };

const MATERIALS = [
  { value: 'Mild Steel', label: 'Mild Steel', sub: 'IS2062 / Carbon' },
  { value: 'SA516 Boiler Steel', label: 'SA516', sub: 'Pressure vessel plate' },
  { value: 'Stainless Steel SS304', label: 'SS304', sub: 'Stainless' },
  { value: 'Stainless Steel SS316', label: 'SS316', sub: 'Marine / chemical' },
  { value: 'Aluminium', label: 'Aluminium', sub: 'Light weight' },
  { value: 'Other', label: 'Other', sub: 'Free-issue material' },
];

const QUICK_QTY = ['1 unit', '5 units', '10 units', 'Monthly supply'];

const ACCEPTED = '.pdf,.dwg,.dxf,.step,.stp,.iges,.png,.jpg,.jpeg';

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const inputBase =
  'w-full bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 ' +
  'transition focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 hover:border-neutral-400';

const Field: React.FC<{
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, required, hint, children }) => (
  <label className="block">
    <span className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
      <span>
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {hint && <span className="font-normal normal-case tracking-normal text-neutral-400">{hint}</span>}
    </span>
    {children}
  </label>
);

const SectionHeader: React.FC<{ step: string; title: string; desc?: string }> = ({ step, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-neutral-900 font-mono text-xs font-bold text-white">
      {step}
    </div>
    <div>
      <h3 className="text-base font-bold text-neutral-900">{title}</h3>
      {desc && <p className="mt-0.5 text-xs text-neutral-500">{desc}</p>}
    </div>
  </div>
);

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    productComponent: '',
    quantity: '1 unit',
    material: 'Mild Steel',
    message: '',
  });
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list).map(f => ({ name: f.name, size: f.size }));
    setFiles(prev => {
      const existing = new Set(prev.map(p => p.name));
      return [...prev, ...incoming.filter(f => !existing.has(f.name))];
    });
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const completion = useMemo(() => {
    const required = [formData.name, formData.company, formData.email, formData.phone];
    const done = required.filter(v => v.trim().length > 0).length;
    return Math.round((done / required.length) * 100);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqRef(`SE-RFQ-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(rfqRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COMPANY_INFO.location}`
  )}`;

  return (
    <div className="bg-neutral-50">
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          aria-hidden
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-600/25 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-red-500/40 bg-red-950/40 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-red-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 bg-red-500" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-red-300">
                Direct RFQ Enquiry
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Tell us what you
              <br />
              need to <span className="text-red-500">build.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
              Share your drawing, specification or project requirement with Saghai Engineering and
              get a feasibility review from our engineers.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 bg-red-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                <Phone className="h-4 w-4" /> Call Engineering Desk
              </a>
              <a
                href="#rfq-form"
                className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                Start RFQ <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── MAIN ───────── */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* ───── Sidebar ───── */}
            <aside className="space-y-6 lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-200 p-6">
                    <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-widest text-red-600">
                      Works & Office
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900">Saghai Engineering</h3>
                    <p className="mt-0.5 font-mono text-xs text-neutral-500">Coimbatore, Tamil Nadu, India</p>
                  </div>

                  <ul className="divide-y divide-neutral-100 text-sm">
                    <li className="flex gap-4 p-5">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] font-semibold uppercase text-neutral-400">
                          Factory Address
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-800">{COMPANY_INFO.location}</p>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Get directions
                        </a>
                      </div>
                    </li>

                    <li className="flex gap-4 p-5">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div>
                        <div className="font-mono text-[10px] font-semibold uppercase text-neutral-400">
                          Direct Phone
                        </div>
                        <a
                          href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                          className="mt-0.5 block font-mono text-sm font-semibold text-neutral-900 hover:text-red-600"
                        >
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex gap-4 p-5">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] font-semibold uppercase text-neutral-400">
                          Engineering Email
                        </div>
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          className="mt-0.5 block break-all font-mono text-xs text-neutral-900 hover:text-red-600"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </li>

                    <li className="flex gap-4 p-5">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                      <div>
                        <div className="font-mono text-[10px] font-semibold uppercase text-neutral-400">
                          Operational Hours
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-800">{COMPANY_INFO.workingHours}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="relative overflow-hidden bg-neutral-950 p-6 text-white">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-red-400">
                      <Building2 className="h-4 w-4" />
                      <span>COIMBATORE INDUSTRIAL HUB</span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      Located in Vellakinar, Coimbatore with direct highway connectivity to major industrial
                      zones, sea ports (Tuticorin & Cochin) and national transport corridors.
                    </p>
                    <div className="border-t border-white/10 pt-3 font-mono text-[11px] text-neutral-400">
                      PIN CODE: 641029 · TAMIL NADU
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="leading-relaxed">
                    <strong className="font-semibold">Your drawings stay confidential.</strong> Files shared with
                    us are used only to prepare your quotation.
                  </p>
                </div>
              </div>
            </aside>

            {/* ───── Form / Success ───── */}
            <div id="rfq-form" className="scroll-mt-24 lg:col-span-8">
              {submitted ? (
                <div className="border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5">
                  <div className="h-1.5 bg-red-600" />
                  <div className="space-y-8 p-8 text-center sm:p-12">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
                      <CheckCircle2 className="h-11 w-11" />
                    </div>

                    <div className="space-y-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                        Requirement Registered
                      </span>
                      <h2 className="text-3xl font-extrabold text-neutral-900">Enquiry received.</h2>
                      <button
                        onClick={copyRef}
                        className="mx-auto inline-flex items-center gap-2 border border-dashed border-neutral-300 bg-neutral-50 px-4 py-2 font-mono text-sm font-bold text-neutral-900 transition hover:border-red-600"
                        title="Copy reference"
                      >
                        #{rfqRef}
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-neutral-400" />
                        )}
                      </button>
                      <p className="mx-auto max-w-lg text-sm leading-relaxed text-neutral-600">
                        Thank you. Our engineering team will review your specifications, drawings and required
                        delivery schedule. Quote this reference in any follow-up.
                      </p>
                    </div>

                    <dl className="mx-auto grid max-w-xl grid-cols-1 gap-px overflow-hidden border border-neutral-200 bg-neutral-200 text-left text-xs sm:grid-cols-2">
                      {[
                        ['Contact', formData.name],
                        ['Company', formData.company],
                        ['Email', formData.email],
                        ['Phone', formData.phone],
                        ['Component', formData.productComponent || 'Custom Component'],
                        ['Material', formData.material],
                        ['Quantity', formData.quantity || '—'],
                        [
                          'Drawings',
                          files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : 'None attached',
                        ],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-white p-3.5">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{k}</dt>
                          <dd className="mt-0.5 break-words font-semibold text-neutral-900">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-800 transition hover:bg-neutral-50"
                      >
                        <Printer className="h-4 w-4" /> Print Summary
                      </button>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800"
                      >
                        Submit Another Requirement
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-neutral-200 bg-white shadow-xl shadow-neutral-900/5">
                  {/* progress */}
                  <div className="h-1.5 bg-neutral-100">
                    <div
                      className="h-full bg-red-600 transition-all duration-500"
                      style={{ width: `${Math.max(completion, 6)}%` }}
                    />
                  </div>

                  <div className="border-b border-neutral-200 px-6 py-6 sm:px-10">
                    <h2 className="text-2xl font-extrabold text-neutral-900">Engineering Quotation Request</h2>
                    <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-neutral-500">
                      For custom-engineered items, attach your component drawings (PDF, DWG, STEP) so we can give
                      an accurate feasibility and cost estimate.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10 p-6 sm:p-10">
                    {/* 01 Contact */}
                    <div className="space-y-5">
                      <SectionHeader step="01" title="Your details" desc="So our engineers know who to reach." />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Your Name" required>
                          <input
                            type="text"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={e => set('name', e.target.value)}
                            placeholder="e.g. S. Kumar"
                            className={inputBase}
                          />
                        </Field>
                        <Field label="Company Name" required>
                          <input
                            type="text"
                            required
                            autoComplete="organization"
                            value={formData.company}
                            onChange={e => set('company', e.target.value)}
                            placeholder="e.g. Apex Industrial Systems Ltd."
                            className={inputBase}
                          />
                        </Field>
                        <Field label="Email Address" required>
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={e => set('email', e.target.value)}
                            placeholder="name@company.com"
                            className={inputBase}
                          />
                        </Field>
                        <Field label="Phone Number" required>
                          <input
                            type="tel"
                            required
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={e => set('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className={inputBase}
                          />
                        </Field>
                      </div>
                    </div>

                    {/* 02 Specification */}
                    <div className="space-y-5 border-t border-neutral-100 pt-10">
                      <SectionHeader
                        step="02"
                        title="What do you need?"
                        desc="Pick the closest match. Details can follow in the scope."
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Industry Sector">
                          <select
                            value={formData.industry}
                            onChange={e => set('industry', e.target.value)}
                            className={inputBase}
                          >
                            <option value="">Select industry</option>
                            {INDUSTRIES_SERVED.map(ind => (
                              <option key={ind.id} value={ind.name}>
                                {ind.name}
                              </option>
                            ))}
                            <option value="Other">Other Industrial Sector</option>
                          </select>
                        </Field>
                        <Field label="Product / Component">
                          <select
                            value={formData.productComponent}
                            onChange={e => set('productComponent', e.target.value)}
                            className={inputBase}
                          >
                            <option value="">Select category</option>
                            {PRODUCT_CATEGORIES.map(p => (
                              <option key={p.id} value={p.title}>
                                {p.title}
                              </option>
                            ))}
                            <option value="Laser Cutting Service">Precision CNC Laser Cutting</option>
                            <option value="Plate Bending Service">Industrial Plate Bending</option>
                            <option value="Other Custom Fabrication">Other Custom Fabrication</option>
                          </select>
                        </Field>
                      </div>

                      <div>
                        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-neutral-700">
                          Material Specification
                        </span>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                          {MATERIALS.map(m => {
                            const active = formData.material === m.value;
                            return (
                              <button
                                type="button"
                                key={m.value}
                                onClick={() => set('material', m.value)}
                                aria-pressed={active}
                                className={`relative border p-3 text-left transition ${
                                  active
                                    ? 'border-red-600 bg-red-50 ring-4 ring-red-600/10'
                                    : 'border-neutral-300 bg-white hover:border-neutral-400'
                                }`}
                              >
                                {active && (
                                  <Check className="absolute right-2 top-2 h-4 w-4 text-red-600" />
                                )}
                                <div className="text-sm font-bold text-neutral-900">{m.label}</div>
                                <div className="text-[11px] text-neutral-500">{m.sub}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <Field label="Quantity / Order Batch">
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={e => set('quantity', e.target.value)}
                          placeholder="e.g. 1 unit, 10 units, Monthly supply"
                          className={inputBase}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                          {QUICK_QTY.map(q => (
                            <button
                              type="button"
                              key={q}
                              onClick={() => set('quantity', q)}
                              className={`border px-3 py-1 text-[11px] font-medium transition ${
                                formData.quantity === q
                                  ? 'border-neutral-900 bg-neutral-900 text-white'
                                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-900'
                              }`}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>

                    {/* 03 Drawings */}
                    <div className="space-y-5 border-t border-neutral-100 pt-10">
                      <SectionHeader
                        step="03"
                        title="Drawings & datasheets"
                        desc="Optional, but speeds up your quotation."
                      />
                      <div
                        onDragOver={e => {
                          e.preventDefault();
                          setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={e => {
                          e.preventDefault();
                          setDragging(false);
                          addFiles(e.dataTransfer.files);
                        }}
                        onClick={() => inputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            inputRef.current?.click();
                          }
                        }}
                        className={`cursor-pointer border-2 border-dashed p-8 text-center transition ${
                          dragging
                            ? 'border-red-600 bg-red-50'
                            : 'border-neutral-300 bg-neutral-50/60 hover:border-red-400 hover:bg-red-50/40'
                        }`}
                      >
                        <input
                          ref={inputRef}
                          type="file"
                          multiple
                          accept={ACCEPTED}
                          onChange={e => {
                            addFiles(e.target.files);
                            e.target.value = '';
                          }}
                          className="hidden"
                        />
                        <UploadCloud className="mx-auto h-9 w-9 text-red-600" />
                        <p className="mt-3 text-sm font-semibold text-neutral-900">
                          {dragging ? 'Drop files to attach' : 'Drag & drop drawings here, or click to browse'}
                        </p>
                        <p className="mt-1 text-[11px] text-neutral-500">
                          PDF · DWG · DXF · STEP · STP · IGES · PNG · JPG
                        </p>
                      </div>

                      {files.length > 0 && (
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {files.map((f, idx) => (
                            <li
                              key={f.name}
                              className="flex items-center gap-3 border border-neutral-200 bg-white p-3"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-50 text-red-600">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-xs font-semibold text-neutral-900">{f.name}</div>
                                <div className="font-mono text-[10px] text-neutral-400">{formatSize(f.size)}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                aria-label={`Remove ${f.name}`}
                                className="p-1 text-neutral-400 transition hover:text-red-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* 04 Scope */}
                    <div className="space-y-5 border-t border-neutral-100 pt-10">
                      <SectionHeader
                        step="04"
                        title="Scope of work"
                        desc="Dimensions, thickness, pressures, codes, NDT, finish and timeline."
                      />
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Describe dimensions, wall/plate thickness, operating pressures, welding codes, required NDT (UT, LPT, Radiography, Hydrostatic), surface treatment (blasting, primer, painting) and expected dispatch timeline…"
                        className={`${inputBase} resize-y leading-relaxed`}
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center">
                      <span className="text-center font-mono text-xs text-neutral-500 sm:text-left">
                        Prefer to talk? {COMPANY_INFO.phone}
                      </span>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-3 bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/30"
                      >
                        <span>Send Engineering Enquiry</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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