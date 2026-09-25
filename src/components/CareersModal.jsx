import React, { useState } from 'react';
import { IconAplSunburst, IconX, IconCheckCircle, IconZap } from './Icons';

export default function CareersModal({ isOpen, onClose }) {
  const [appliedRole, setAppliedRole] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "SCADA & Transmission Control Engineer",
      dept: "Grid Operations • Osisioma IPP",
      type: "Full-Time",
      experience: "3-5 Years",
      desc: "Monitor and manage real-time 132/33kV transmission telemetry, injection substations, and automated breaker switching."
    },
    {
      id: 2,
      title: "High Voltage Line Protection Specialist",
      dept: "Network Maintenance • Aba Ring-Fence",
      type: "Full-Time",
      experience: "2-4 Years",
      desc: "Perform preventive maintenance, fault isolation, and emergency repairs on 110km+ overhead distribution lines."
    },
    {
      id: 3,
      title: "STS Smart Metering Technician",
      dept: "Metering & Commercial Operations",
      type: "Full-Time",
      experience: "1-3 Years",
      desc: "Deploy, audit, and configure STS prepaid smart meters and optical communication modules for residential & commercial customers."
    },
    {
      id: 4,
      title: "Industrial Commercial Account Executive",
      dept: "Business Development",
      type: "Full-Time",
      experience: "3+ Years",
      desc: "Manage dedicated 33kV feeder relationships for heavy manufacturing clients in Ariaria and Osisioma industrial layout."
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 border-2 border-[#0072CE]/60 bg-[#030f1e] shadow-2xl rounded-2xl my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setSuccess(false);
            setAppliedRole(null);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <IconX className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <IconAplSunburst className="w-12 h-12" />
          <div>
            <h3 className="text-2xl font-extrabold text-white heading-font">
              Careers at APL Electric Company
            </h3>
            <p className="text-xs text-slate-300">
              Join Nigeria's Premier Integrated Power Project in Aba
            </p>
          </div>
        </div>

        {!success ? (
          !appliedRole ? (
            /* Open Positions List */
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              <p className="text-xs text-slate-300">
                APL Electric Company is empowering talented engineers, linemen, technicians, and energy professionals to build Africa's most reliable power utility.
              </p>

              {jobs.map((j) => (
                <div key={j.id} className="bg-black/40 p-4 rounded-xl border border-white/10 hover:border-[#F5B800]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#F5B800] uppercase tracking-wider block">
                      {j.dept}
                    </span>
                    <h4 className="text-base font-extrabold text-white heading-font mt-0.5">
                      {j.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {j.desc}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span>Type: {j.type}</span>
                      <span>•</span>
                      <span>Experience: {j.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setAppliedRole(j)}
                    className="btn-apl-gold py-2.5 px-4 text-xs whitespace-nowrap self-start sm:self-center"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0072CE]/20 border border-[#0072CE]/40 flex justify-between items-center">
                <div>
                  <span className="text-[11px] text-[#F5B800] font-bold uppercase block">APPLYING FOR</span>
                  <span className="text-sm font-bold text-white">{appliedRole.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAppliedRole(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Change Role
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Engr. Chijioke Nwabueze"
                  className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#F5B800]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="chijioke@example.com"
                  className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#F5B800]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Resume / Cover Note</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Briefly state your qualifications and engineering experience..."
                  className="w-full bg-black/50 border border-white/20 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#F5B800]"
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-apl-gold py-3.5 rounded-xl text-sm font-bold">
                Submit Job Application
              </button>
            </form>
          )
        ) : (
          /* Application Received View */
          <div className="text-center py-8 space-y-4">
            <IconCheckCircle className="w-14 h-14 text-[#F5B800] mx-auto" />
            <h4 className="text-xl font-bold text-white">Application Received!</h4>
            <p className="text-xs text-slate-300">
              Thank you, <span className="text-[#F5B800] font-bold">{applicantName}</span>. Our APL Human Resources team will review your qualifications for the <span className="text-white font-bold">{appliedRole?.title}</span> position.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setAppliedRole(null);
              }}
              className="btn-outline-glass-apl py-2 px-6 text-xs text-white"
            >
              Back to Open Careers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
