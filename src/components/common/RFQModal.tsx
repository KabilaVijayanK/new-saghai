import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  UploadCloud,
  FileText,
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  Copy,
  Check,
} from 'lucide-react';
import { PRODUCT_CATEGORIES, INDUSTRIES_SERVED, COMPANY_INFO } from '../../data/companyData';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const MATERIALS = [
  { value: 'Mild Steel', label: 'Mild Steel', sub: 'IS2062 / Carbon' },
  { value: 'SA516 Boiler Steel', label: 'SA516', sub: 'Pressure vessel grade' },
  { value: 'Stainless Steel SS304', label: 'SS304', sub: 'Stainless steel' },
  { value: 'Stainless Steel SS316', label: 'SS316', sub: 'Stainless steel' },
  { value: 'Aluminium', label: 'Aluminium', sub: 'Sheet / plate' },
  { value: 'Other / Customer Supplied', label: 'Customer supplied', sub: 'Specified by you' },
];

const STEPS = [
  { t: 'Send your requirement', d: 'Drawings and specifications.' },
  { t: 'Engineering review', d: 'Checked against our plant capacity.' },
  { t: 'Quotation shared', d: 'Our team contacts you directly.' },
];

const inputCls =
  'w-full border border-neutral-300 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 transition-colors hover:border-neutral-400 focus:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-600/10';

const Field: React.FC<{
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, htmlFor, required, children, className = '' }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-neutral-800">
      {label}
      {required && <span className="ml-0.5 text-red-600">*</span>}
    </label>
    {children}
  </div>
);

const SectionTitle: React.FC<{ n: number; title: string }> = ({ n, title }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center bg-neutral-900 text-sm font-bold text-white">
      {n}
    </span>
    <h4 className="text-base font-bold text-neutral-900">{title}</h4>
    <span className="h-px flex-1 bg-neutral-200" />
  </div>
);

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, initialProduct = '' }) => {
  const reduce = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    productCategory: initialProduct || '',
    quantity: '1',
    material: 'Mild Steel',
    thickness: '',
    requirement: '',
    message: '',
    mockFiles: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // Pre-select the category when the modal opens from a product / service card
  useEffect(() => {
    if (isOpen && initialProduct) set('productCategory', initialProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialProduct]);

  // Escape to close, lock page scroll, focus first field
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const names = Array.from(files).map((f) => f.name);
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, mockFiles: [...prev.mockFiles, ...names] }));
      setIsUploading(false);
    }, 500);
  }, []);

  const removeFile = (idx: number) =>
    setFormData((prev) => ({ ...prev, mockFiles: prev.mockFiles.filter((_, i) => i !== idx) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqNumber(`SE-RFQ-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(rfqNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const telHref = `tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Fixed height + single shrinkable grid row = inner areas can scroll */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rfq-title"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative grid h-[100dvh] w-full max-w-6xl grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden bg-white shadow-2xl sm:h-[min(92vh,900px)] lg:grid-cols-[340px_1fr]"
          >
            {/* ============ Left info panel (desktop) ============ */}
            {/* ============ Left info panel (desktop) ============ */}
<aside className="relative hidden min-h-0 flex-col justify-between overflow-hidden bg-neutral-950 p-8 text-white lg:flex">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
  <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-600/30 blur-[90px]" />

  <div className="relative">
    <div className="flex items-center gap-3">
      <span className="h-[3px] w-8 bg-red-600" />
      <span className="text-sm font-semibold text-red-400">Direct engineering enquiry</span>
    </div>
    <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight xl:text-3xl">
      Let's engineer your requirement.
    </h3>
    <p className="mt-3 text-sm leading-relaxed text-neutral-300">
      Our team reviews every enquiry against our 600 T press, laser cutting (0.7–20 mm) and
      plate bending (3–50 mm) capability.
    </p>

    {/* Steps: hidden automatically on short screens so nothing overflows */}
    <ol className="mt-7 space-y-5 [@media(max-height:760px)]:hidden">
      {STEPS.map((s, i) => (
        <li key={s.t} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-red-500/50 bg-red-600/10 text-sm font-bold text-red-300">
            {i + 1}
          </span>
          <div>
            <p className="text-[15px] font-semibold">{s.t}</p>
            <p className="text-sm text-neutral-400">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>

  <div className="relative mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
    <p className="flex items-start gap-2.5 text-neutral-300">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
      Your drawings and dimensions stay strictly confidential.
    </p>
    <a href={telHref} className="flex items-center gap-2.5 font-semibold text-white hover:text-red-300">
      <Phone className="h-4 w-4 text-red-400" />
      {COMPANY_INFO.phone}
    </a>
  </div>
</aside>

            {/* ============ Right: form / success ============ */}
            <div className="flex min-h-0 flex-col overflow-hidden bg-white">
              {/* Header (fixed) */}
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5 sm:px-8">
                <div>
                  <span className="text-sm font-semibold text-red-600 lg:hidden">Direct engineering enquiry</span>
                  <h3 id="rfq-title" className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
                    {submitted ? 'Enquiry received' : 'Request a manufacturing quotation'}
                  </h3>
                  {!submitted && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                      <Clock className="h-4 w-4" />
                      Takes about 2 minutes. Fields marked * are required.
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-2 -mt-1 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  /* ---------------- Success ---------------- */
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-10 text-center sm:px-8"
                  >
                    <motion.div
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600"
                    >
                      <CheckCircle2 className="h-12 w-12" />
                    </motion.div>

                    <p className="mt-6 text-sm font-semibold text-neutral-500">Your quotation reference</p>
                    <button
                      onClick={copyRef}
                      className="group mx-auto mt-2 inline-flex items-center gap-3 border border-neutral-300 bg-neutral-50 px-5 py-3 font-mono text-xl font-bold text-neutral-900 transition-colors hover:border-red-600"
                      aria-label="Copy reference number"
                    >
                      {rfqNumber}
                      {copied ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-neutral-400 group-hover:text-red-600" />
                      )}
                    </button>

                    <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-600">
                      Thank you, <span className="font-semibold text-neutral-900">{formData.name}</span>. Our
                      technical team at the Coimbatore facility will review your requirement against our
                      fabrication capacity and get back to you.
                    </p>

                    <dl className="mx-auto mt-8 grid max-w-lg grid-cols-2 border border-neutral-200 text-left text-sm">
                      {[
                        ['Company', formData.company || 'Not specified'],
                        ['Category', formData.productCategory || 'General custom fabrication'],
                        ['Material', formData.material],
                        ['Quantity', formData.quantity || '—'],
                      ].map(([k, v], i) => (
                        <div
                          key={k}
                          className={`p-4 ${i % 2 === 1 ? 'border-l border-neutral-200' : ''} ${
                            i >= 2 ? 'border-t border-neutral-200' : ''
                          }`}
                        >
                          <dt className="text-neutral-500">{k}</dt>
                          <dd className="mt-0.5 font-semibold text-neutral-900">{v}</dd>
                        </div>
                      ))}
                      {formData.mockFiles.length > 0 && (
                        <div className="col-span-2 border-t border-neutral-200 p-4">
                          <dt className="text-neutral-500">Drawings attached</dt>
                          <dd className="mt-0.5 font-semibold text-neutral-900">{formData.mockFiles.join(', ')}</dd>
                        </div>
                      )}
                    </dl>

                    <p className="mt-6 text-sm text-neutral-500">
                      Need it urgently? Call us on{' '}
                      <a href={telHref} className="font-semibold text-red-600">
                        {COMPANY_INFO.phone}
                      </a>
                    </p>

                    <button
                      onClick={resetForm}
                      className="mt-8 bg-neutral-900 px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  /* ---------------- Form ---------------- */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    {/* Scrolling body */}
                    <div className="min-h-0 flex-1 space-y-9 overflow-y-auto overscroll-contain px-5 py-7 sm:px-8">
                      {/* 1. Contact */}
                      <section className="space-y-5">
                        <SectionTitle n={1} title="Your details" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Full name" htmlFor="rfq-name" required>
                            <input
                              ref={firstFieldRef}
                              id="rfq-name"
                              type="text"
                              required
                              autoComplete="name"
                              value={formData.name}
                              onChange={(e) => set('name', e.target.value)}
                              placeholder="e.g. Ramesh Kumar"
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Company / organisation" htmlFor="rfq-company" required>
                            <input
                              id="rfq-company"
                              type="text"
                              required
                              autoComplete="organization"
                              value={formData.company}
                              onChange={(e) => set('company', e.target.value)}
                              placeholder="e.g. Bharat Heavy Components Ltd"
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Email address" htmlFor="rfq-email" required>
                            <input
                              id="rfq-email"
                              type="email"
                              required
                              autoComplete="email"
                              value={formData.email}
                              onChange={(e) => set('email', e.target.value)}
                              placeholder="name@company.com"
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Phone number" htmlFor="rfq-phone" required>
                            <input
                              id="rfq-phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={(e) => set('phone', e.target.value)}
                              placeholder="+91 98765 43210"
                              className={inputCls}
                            />
                          </Field>
                        </div>
                      </section>

                      {/* 2. Requirement */}
                      <section className="space-y-5">
                        <SectionTitle n={2} title="What do you need?" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field label="Industry sector" htmlFor="rfq-industry">
                            <select
                              id="rfq-industry"
                              value={formData.industry}
                              onChange={(e) => set('industry', e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Select industry</option>
                              {INDUSTRIES_SERVED.map((ind) => (
                                <option key={ind.id} value={ind.name}>
                                  {ind.name}
                                </option>
                              ))}
                              <option value="Other">Other industrial application</option>
                            </select>
                          </Field>
                          <Field label="Product / component type" htmlFor="rfq-product">
                            <select
                              id="rfq-product"
                              value={formData.productCategory}
                              onChange={(e) => set('productCategory', e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Select category</option>
                              {PRODUCT_CATEGORIES.map((p) => (
                                <option key={p.id} value={p.title}>
                                  {p.title}
                                </option>
                              ))}
                              <option value="Custom Component">Custom fabricated part / profile</option>
                            </select>
                          </Field>
                        </div>

                        {/* Material cards */}
                        <fieldset>
                          <legend className="mb-2 text-sm font-semibold text-neutral-800">Material</legend>
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                            {MATERIALS.map((m) => {
                              const active = formData.material === m.value;
                              return (
                                <label
                                  key={m.value}
                                  className={`relative cursor-pointer border px-4 py-3 transition-all duration-200 focus-within:ring-4 focus-within:ring-red-600/15 ${
                                    active
                                      ? 'border-red-600 bg-red-50'
                                      : 'border-neutral-300 bg-white hover:border-neutral-500'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="material"
                                    value={m.value}
                                    checked={active}
                                    onChange={() => set('material', m.value)}
                                    className="sr-only"
                                  />
                                  <span className="block text-[15px] font-bold text-neutral-900">{m.label}</span>
                                  <span className="block text-xs text-neutral-500">{m.sub}</span>
                                  {active && (
                                    <CheckCircle2 className="absolute right-2.5 top-2.5 h-4 w-4 text-red-600" />
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>

                        <Field label="Quantity / batches" htmlFor="rfq-qty">
                          <input
                            id="rfq-qty"
                            type="text"
                            value={formData.quantity}
                            onChange={(e) => set('quantity', e.target.value)}
                            placeholder="e.g. 1 unit, 50 per batch, monthly"
                            className={inputCls}
                          />
                        </Field>
                      </section>

                      {/* 3. Drawings + notes */}
                      <section className="space-y-5">
                        <SectionTitle n={3} title="Drawings and specifications" />

                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            addFiles(e.dataTransfer.files);
                          }}
                          className={`border-2 border-dashed p-6 text-center transition-colors ${
                            dragOver ? 'border-red-600 bg-red-50' : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
                          }`}
                        >
                          <input
                            type="file"
                            id="drawing-file-input"
                            multiple
                            accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.png,.jpg,.jpeg"
                            onChange={(e) => {
                              addFiles(e.target.files);
                              e.target.value = '';
                            }}
                            className="sr-only"
                          />
                          <label
                            htmlFor="drawing-file-input"
                            className="flex cursor-pointer flex-col items-center gap-2"
                          >
                            <span className="flex h-12 w-12 items-center justify-center bg-white text-red-600 shadow-sm ring-1 ring-neutral-200">
                              <UploadCloud className={`h-6 w-6 ${isUploading ? 'animate-pulse' : ''}`} />
                            </span>
                            <span className="text-[15px] font-semibold text-neutral-900">
                              {isUploading ? 'Attaching file…' : 'Drop drawings here or click to browse'}
                            </span>
                            <span className="text-sm text-neutral-500">
                              PDF, DWG, DXF, STEP, IGES, PNG, JPG. Kept strictly confidential.
                            </span>
                          </label>

                          {formData.mockFiles.length > 0 && (
                            <ul className="mt-5 flex flex-wrap justify-center gap-2">
                              {formData.mockFiles.map((fn, idx) => (
                                <li
                                  key={`${fn}-${idx}`}
                                  className="inline-flex items-center gap-2 border border-neutral-300 bg-white py-1.5 pl-3 pr-1.5 text-sm text-neutral-800"
                                >
                                  <FileText className="h-4 w-4 text-red-600" />
                                  <span className="max-w-[200px] truncate">{fn}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(idx)}
                                    aria-label={`Remove ${fn}`}
                                    className="p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <Field label="Detailed requirement" htmlFor="rfq-message">
                          <textarea
                            id="rfq-message"
                            rows={4}
                            value={formData.message}
                            onChange={(e) => set('message', e.target.value)}
                            placeholder="Dimensions, plate thickness, testing (UT, hydrostatic, radiography), finish (blasting / painting), timeline…"
                            className={`${inputCls} resize-y`}
                          />
                        </Field>
                      </section>
                    </div>

                    {/* Sticky action bar (fixed at bottom of right column) */}
                    <div className="flex shrink-0 flex-col-reverse items-stretch gap-3 border-t border-neutral-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                      <span className="text-sm text-neutral-500">
                        Prefer to talk?{' '}
                        <a href={telHref} className="font-semibold text-neutral-900 hover:text-red-600">
                          {COMPANY_INFO.phone}
                        </a>
                      </span>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 px-5 py-3.5 text-base font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:flex-none"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="group inline-flex flex-[2] items-center justify-center gap-2 bg-red-600 px-8 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:flex-none"
                        >
                          Submit requirement
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};