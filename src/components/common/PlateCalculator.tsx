import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface PlateCalculatorProps {
  onQuoteWithSpec: (specDetails: string) => void;
}

export const PlateCalculator: React.FC<PlateCalculatorProps> = ({ onQuoteWithSpec }) => {
  const [material, setMaterial] = useState<'ms' | 'ss' | 'al'>('ms');
  const [thickness, setThickness] = useState<number>(16);
  const [length, setLength] = useState<number>(2500);
  const [width, setWidth] = useState<number>(1250);
  const [quantity, setQuantity] = useState<number>(1);

  // Densities in g/cm3 (equivalent to kg/m3 / 1000)
  const densities = {
    ms: 7.85, // Mild Steel / Carbon Steel
    ss: 8.00, // Stainless Steel SS304/SS316
    al: 2.70  // Aluminium
  };

  const materialNames = {
    ms: 'Mild Steel / Carbon Steel (IS2062 / SA516)',
    ss: 'Stainless Steel (SS304 / SS316)',
    al: 'Aluminium'
  };

  // Weight calculation: Volume in m3 * Density in kg/m3
  const volumeM3 = (length / 1000) * (width / 1000) * (thickness / 1000);
  const singleWeightKg = volumeM3 * (densities[material] * 1000);
  const totalWeightKg = singleWeightKg * quantity;
  const totalWeightTonnes = totalWeightKg / 1000;

  // Process evaluations based on Saghai verified capabilities
  const isLaserEligible = thickness >= 0.7 && thickness <= 20;
  const isOxyfuelEligible = thickness > 20 && thickness <= 150 && material === 'ms';
  const isBendingConfirmed = thickness >= 3 && thickness <= 50;

  const handleTransferToRFQ = () => {
    const summary = `${materialNames[material]} Plate: ${thickness} mm thk × ${length} mm L × ${width} mm W (Qty: ${quantity}, Total Weight: ${totalWeightKg.toFixed(1)} kg / ${totalWeightTonnes.toFixed(3)} tonnes)`;
    onQuoteWithSpec(summary);
  };

  return (
    <div className="bg-white border border-neutral-300 shadow-sm p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
              Plate Weight & Fabrication Feasibility Estimator
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Calculate theoretical plate mass and verify against Saghai Engineering cutting and bending capacities.
          </p>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-mono uppercase bg-neutral-100 text-neutral-700 px-2.5 py-1">
          Engineering Tool
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Material Select */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
              Select Material Alloy
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMaterial('ms')}
                className={`py-2 px-3 text-xs font-medium border text-center transition-colors ${
                  material === 'ms'
                    ? 'border-red-600 bg-red-50/50 text-red-700 font-semibold'
                    : 'border-neutral-300 hover:border-neutral-400 text-neutral-700'
                }`}
              >
                Mild Steel (7.85)
              </button>
              <button
                type="button"
                onClick={() => setMaterial('ss')}
                className={`py-2 px-3 text-xs font-medium border text-center transition-colors ${
                  material === 'ss'
                    ? 'border-red-600 bg-red-50/50 text-red-700 font-semibold'
                    : 'border-neutral-300 hover:border-neutral-400 text-neutral-700'
                }`}
              >
                Stainless Steel (8.00)
              </button>
              
            </div>
          </div>

          {/* Thickness */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Plate Thickness (mm)
              </label>
              <span className="font-mono text-sm font-bold text-red-600">
                {thickness} mm
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[3, 6, 10, 12, 16, 20, 25, 32, 40, 50].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setThickness(t)}
                  className={`text-[11px] font-mono px-2 py-0.5 border ${
                    thickness === t ? 'border-red-600 bg-red-600 text-white' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                  }`}
                >
                  {t}mm
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Length (mm)
              </label>
              <input
                type="number"
                min="100"
                max="12000"
                step="50"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Width (mm)
              </label>
              <input
                type="number"
                min="50"
                max="3500"
                step="50"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Quantity (Units)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:border-red-600 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Calculation Results & Feasibility (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-50 p-5 border border-neutral-200 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block">
              Estimated Mass & Scope
            </span>

            <div className="space-y-1">
              <span className="text-xs text-neutral-500">Total Calculated Weight</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-neutral-900 tabular-nums">
                  {totalWeightKg.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-neutral-600 font-mono">kg</span>
                <span className="text-xs text-neutral-400 font-mono ml-2">
                  ({totalWeightTonnes.toFixed(3)} tonnes)
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Single Plate: {singleWeightKg.toFixed(1)} kg @ {densities[material]} g/cm³
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
              {/* Cutting Feasibility */}
              <div className="flex items-start gap-2">
                {isLaserEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : isOxyfuelEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                )}
                <div>
                  <strong className="text-neutral-900 block">Cutting Method:</strong>
                  {isLaserEligible && (
                    <span className="text-neutral-700">
                      CNC Laser Cutting (Within Saghai 0.7–20 mm range)
                    </span>
                  )}
                  {!isLaserEligible && isOxyfuelEligible && (
                    <span className="text-neutral-700">
                      CNC Oxyfuel Cutting (Within Saghai up to 150 mm range)
                    </span>
                  )}
                  {!isLaserEligible && !isOxyfuelEligible && (
                    <span className="text-neutral-700">
                      Consult engineering for special thickness processing
                    </span>
                  )}
                </div>
              </div>

              {/* Bending Feasibility */}
              <div className="flex items-start gap-2">
                {isBendingConfirmed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                )}
                <div>
                  <strong className="text-neutral-900 block">Plate Bending Feasibility:</strong>
                  {isBendingConfirmed ? (
                    <span className="text-neutral-700">
                      Confirmed Saghai bending capability (3–50 mm)
                    </span>
                  ) : (
                    <span className="text-neutral-700">
                      {thickness < 3 ? 'Sheet metal bending / light press' : 'Requires heavy hydraulic pressing review'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-neutral-200">
            <button
              onClick={handleTransferToRFQ}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Transfer Spec to RFQ Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
