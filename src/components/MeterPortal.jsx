import React, { useState } from 'react';
import { IconAplSunburst, IconCreditCard, IconCheckCircle, IconCopy, IconX, IconShield } from './Icons';

export default function MeterPortal({ isOpen, onClose }) {
  const [meterType, setMeterType] = useState('prepaid');
  const [meterNumber, setMeterNumber] = useState('450198231102');
  const [customerName, setCustomerName] = useState('Aba Industrial Plastics Ltd');
  const [amount, setAmount] = useState(10000);
  const [phone, setPhone] = useState('08031234567');
  const [tariffBand, setTariffBand] = useState('band-a');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [copied, setCopied] = useState(false);

  const ratePerKwh = tariffBand === 'band-a' ? 225 : tariffBand === 'band-b' ? 180 : 140;
  const netAmount = amount > 500 ? amount * 0.925 : amount;
  const calculatedUnits = (netAmount / ratePerKwh).toFixed(1);

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const rawToken = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000)).join('-');
      
      setReceipt({
        token: rawToken,
        units: calculatedUnits,
        amount: amount,
        meterNo: meterNumber,
        date: new Date().toLocaleString(),
        receiptId: `APL-STS-${Math.floor(100000 + Math.random() * 900000)}`,
        lga: "Osisioma Industrial Feeder 2"
      });
      setLoading(false);
    }, 1800);
  };

  const handleCopyToken = () => {
    if (receipt?.token) {
      navigator.clipboard.writeText(receipt.token.replace(/-/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 border-2 border-[#0072CE]/60 bg-[#030f1e] shadow-2xl rounded-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <IconX className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <IconAplSunburst className="w-12 h-12" />
          <div>
            <h3 className="text-2xl font-extrabold text-white heading-font">
              APL Electric Token Portal
            </h3>
            <p className="text-xs text-slate-300">
              Official APL Electric Company STS Smart Meter Recharge
            </p>
          </div>
        </div>

        {!receipt ? (
          /* Payment Form */
          <form onSubmit={handleProcessPayment} className="space-y-5">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setMeterType('prepaid')}
                className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  meterType === 'prepaid'
                    ? 'bg-[#F5B800] text-[#030f1e] shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                STS Prepaid Token
              </button>
              <button
                type="button"
                onClick={() => setMeterType('postpaid')}
                className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  meterType === 'postpaid'
                    ? 'bg-[#F5B800] text-[#030f1e] shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Postpaid Bill Pay
              </button>
            </div>

            {/* Meter Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Meter / Account Number
              </label>
              <input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#F5B800]"
                placeholder="e.g. 4501 9823 1102"
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-[11px] text-[#38BDF8] font-semibold">
                  Account Verified: {customerName}
                </span>
                <span className="text-[11px] text-slate-400">Band A (20+ hrs)</span>
              </div>
            </div>

            {/* Preset Amount Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Amount (₦)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[2000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      amount === amt
                        ? 'bg-[#0072CE]/30 border-[#F5B800] text-[#F5B800]'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white font-bold placeholder-slate-500 focus:outline-none focus:border-[#F5B800]"
                placeholder="Custom Amount"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                SMS Token Delivery Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#F5B800]"
              />
            </div>

            {/* Units Calculation Summary */}
            <div className="bg-[#0072CE]/20 p-4 rounded-xl border border-[#0072CE]/40 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-300 block font-semibold">ESTIMATED ELECTRICITY UNITS</span>
                <span className="text-xs text-slate-400">Rate: ₦{ratePerKwh}/kWh (Inc VAT 7.5%)</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#F5B800] heading-font block">
                  {calculatedUnits} <span className="text-sm font-semibold text-white">kWh</span>
                </span>
              </div>
            </div>

            {/* Process Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-apl-gold py-4 rounded-xl justify-center text-base shadow-xl"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-[#030f1e] border-t-transparent rounded-full animate-spin"></span>
                  Encrypting APL STS Token...
                </span>
              ) : (
                <span>Generate STS Token (₦{amount.toLocaleString()})</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <IconShield className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>Secured by NERC Licensed APL Electric Gateway</span>
            </div>
          </form>
        ) : (
          /* Token Receipt Modal View */
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-[#F5B800]/20 border-2 border-[#F5B800] text-[#F5B800] flex items-center justify-center mx-auto shadow-xl shadow-yellow-500/30">
              <IconCheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-[#F5B800] uppercase">
                TRANSACTION SUCCESSFUL
              </span>
              <h4 className="text-2xl font-extrabold text-white heading-font mt-1">
                Your 20-Digit STS Smart Token
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Meter No: {receipt.meterNo} • {customerName}
              </p>
            </div>

            {/* Token Display Box */}
            <div className="bg-black/80 border-2 border-[#F5B800] p-5 rounded-2xl relative shadow-inner">
              <span className="text-xs text-slate-400 font-semibold block mb-2">
                ENTER TOKEN ON PREPAID KEYPAD & PRESS ENTER
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5B800] tracking-widest font-mono select-all">
                {receipt.token}
              </div>

              <button
                onClick={handleCopyToken}
                className="mt-4 inline-flex items-center gap-2 bg-[#0072CE]/30 hover:bg-[#0072CE]/50 text-white px-4 py-2 rounded-lg text-xs font-bold border border-[#0072CE]/50 transition-colors"
              >
                <IconCopy className="w-4 h-4 text-[#F5B800]" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Token Code'}</span>
              </button>
            </div>

            {/* Summary Details Table */}
            <div className="bg-white/5 rounded-xl p-4 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Receipt Reference:</span>
                <span className="font-mono text-white font-bold">{receipt.receiptId}</span>
              </div>
              <div className="flex justify-between">
                <span>Energy Purchased:</span>
                <span className="font-bold text-[#F5B800]">{receipt.units} kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <span className="font-bold text-white">₦{receipt.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Date:</span>
                <span>{receipt.date}</span>
              </div>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Buy Another Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
