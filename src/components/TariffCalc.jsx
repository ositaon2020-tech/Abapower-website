import React, { useState } from 'react';
import { IconCalculator, IconZap } from './Icons';

export default function TariffCalc() {
  const [kwh, setKwh] = useState(350);
  const [band, setBand] = useState('band-a');

  const bands = {
    'band-a': { name: 'Band A (20+ Hours Daily)', rate: 225, description: 'Minimum 20 hours guaranteed daily grid availability.' },
    'band-b': { name: 'Band B (16+ Hours Daily)', rate: 180, description: 'Minimum 16 hours guaranteed daily grid availability.' },
    'band-c': { name: 'Band C (12+ Hours Daily)', rate: 140, description: 'Minimum 12 hours guaranteed daily grid availability.' },
    'band-d': { name: 'Band D (8+ Hours Daily)', rate: 110, description: 'Minimum 8 hours guaranteed daily grid availability.' }
  };

  const currentBand = bands[band];
  const energyCost = kwh * currentBand.rate;
  const vat = energyCost * 0.075;
  const totalCost = energyCost + vat;

  const dieselCost = kwh * 750;
  const savings = Math.max(0, dieselCost - totalCost);

  return (
    <section id="tariffs" className="py-24 relative bg-[#030f1e] border-t border-[#0072CE]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-pill-gold mb-3">
            <IconCalculator className="w-4 h-4 text-[#F5B800]" />
            <span>TRANSPARENT NERC APPROVED BILLING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Interactive MYTO Tariff Calculator
          </h2>
          <p className="text-slate-300 text-lg mt-4">
            Calculate your exact monthly electricity bill and see how much your business saves by switching from self-diesel generation to APL Electric grid energy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Left Column */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Service Availability Band
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(bands).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setBand(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      band === key
                        ? 'bg-[#0072CE]/30 border-[#F5B800] text-[#F5B800]'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-extrabold">{val.name.split(' ')[0]} {val.name.split(' ')[1]}</div>
                    <div className="text-[11px] font-mono text-[#F5B800] mt-1">₦{val.rate}/kWh</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Monthly Energy Consumption
                </label>
                <span className="text-xl font-extrabold text-[#F5B800] heading-font">
                  {kwh.toLocaleString()} <span className="text-xs font-normal">kWh</span>
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F5B800]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>50 kWh (Household)</span>
                <span>1,500 kWh (Business)</span>
                <span>3,000 kWh (Factory)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-white block mb-1">Band Specification:</span>
              <p>{currentBand.description}</p>
            </div>
          </div>

          {/* Results Display Right Column */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 border-2 border-[#0072CE]/50 space-y-6 relative overflow-hidden">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ESTIMATED MONTHLY BILL
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-white heading-font mt-1">
                  ₦{Math.round(totalCost).toLocaleString()}
                </div>
                <span className="text-xs text-[#38BDF8] font-semibold mt-1 block">
                  Calculated at NERC Tariff Band Rate (₦{currentBand.rate}/kWh)
                </span>
              </div>

              {/* Cost Itemization */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Energy Charge ({kwh} kWh × ₦{currentBand.rate}):</span>
                  <span className="font-mono font-bold text-white">₦{Math.round(energyCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Value Added Tax (VAT 7.5%):</span>
                  <span className="font-mono font-bold text-white">₦{Math.round(vat).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>NERC Meter Surcharge:</span>
                  <span className="font-mono font-bold text-[#F5B800]">₦0.00 (WAIVED)</span>
                </div>
              </div>

              {/* Diesel Savings Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0072CE]/40 to-[#071e3d] border border-[#F5B800]/50">
                <span className="text-xs font-bold text-[#F5B800] uppercase tracking-widest block mb-1">
                  GRID POWER VS DIESEL GENERATOR SAVINGS
                </span>
                <div className="text-2xl font-extrabold text-[#F5B800] heading-font">
                  SAVE ₦{Math.round(savings).toLocaleString()} / MONTH
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Self-generating {kwh} kWh with diesel generators costs ~₦{Math.round(dieselCost).toLocaleString()} at ₦750/kWh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
