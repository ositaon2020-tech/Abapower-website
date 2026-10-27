import React from 'react';
import { IconCheckCircle } from './Icons';

export default function OutageTracker() {
  // Field & customer-care imagery:
  // engineers in dark-blue coveralls + helmets repairing transformers,
  // servicing meters/feeders, and customer-care attendants assisting customers.
  const collageImages = {
    large:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDTwoXei2DrdNWoynqBIa0PkZWO1BwARMj7k76mbwtwONEkj-0o_BE2Hs&s=10',
    smallTopLeft:
      'https://cultureintelligence.ynaija.com/wp-content/uploads/2021/07/Textile-industry.jpg',
    smallTopRight:
      'https://images.pexels.com/photos/7709165/pexels-photo-7709165.jpeg?auto=compress&cs=tinysrgb&w=500',
    smallBottomRight:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iCIJtRsHXNQLAp-M1i0rDFRMS1zBAa31EeapstiKyTWHY485inf5G_mI&s=10',
  };

  const impactChips = ['Jobs', 'Skills', 'Enterprise', 'Growth'];

  const pillars = [
    { label: 'Enterprise', value: 'Stronger businesses' },
    { label: 'Communities', value: 'Better daily life' },
  ];

  return (
    <section
      id="customer-service"
      className="py-20 sm:py-24 relative section-shade border-t border-[#0072CE]/20 overflow-hidden"
    >
      {/* Ambient brand glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0072CE]/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F5B800]/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left — Beyond Electricity */}
          <div data-reveal="left" className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-12 h-1 bg-[#F5B800] rounded-full"></span>
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#0072CE] uppercase">
                Beyond Electricity
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold heading-font text-[#0072CE] leading-[1.05] tracking-tight">
              Power is only
              <br />
              part of the story.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-6">
              Reliable electricity creates the foundation for enterprise, productivity, jobs, skills and long-term community development.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="bg-white rounded-2xl p-5 border border-[#0072CE]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#F5B800]/60 transition-all duration-300"
                >
                  <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#0072CE] uppercase">
                    {pillar.label}
                  </span>
                  <h3 className="text-xl font-extrabold heading-font text-[#0b2a4a] mt-3 leading-snug">
                    {pillar.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Center — Photo Collage */}
          <div data-reveal="zoom" className="lg:col-span-4 order-1 lg:order-2">
            <div className="relative w-full max-w-[380px] mx-auto aspect-square">
              {/* Dotted texture */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(#0072CE 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              ></div>

              {/* Large circle */}
              <div className="absolute left-0 bottom-[8%] w-[60%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-[#0b2440] to-[#0072CE] flex items-center justify-center transition-transform duration-500 hover:scale-105">
                <img
                  src={collageImages.large}
                  alt="Aba Power engineer in dark-blue coverall and helmet servicing a transformer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Small circle — top left */}
              <div className="absolute top-[2%] left-[34%] w-[26%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#0b2a4a] transition-transform duration-500 hover:scale-110">
                <img
                  src={collageImages.smallTopLeft}
                  alt="Aba Power technician repairing a distribution feeder"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small circle — top right */}
              <div className="absolute top-[8%] right-0 w-[34%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#0072CE] transition-transform duration-500 hover:scale-110">
                <img
                  src={collageImages.smallTopRight}
                  alt="Aba Power customer-care attendant assisting a customer on the phone"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small circle — bottom right */}
              <div className="absolute bottom-[10%] right-[2%] w-[30%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#F5B800] transition-transform duration-500 hover:scale-110">
                <img
                  src={collageImages.smallBottomRight}
                  alt="Aba Power customer-care attendant assisting a customer"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Accent dot */}
              <span className="absolute bottom-[6%] left-[8%] w-3 h-3 rounded-full bg-[#0072CE]"></span>
            </div>
          </div>

          {/* Right — Community Impact */}
          <div data-reveal="right" className="lg:col-span-4 order-3">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#0072CE] uppercase">
              Community Impact
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold heading-font text-[#0072CE] leading-[1.05] tracking-tight mt-5">
              Empowering communities beyond power supply.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-6">
              Aba Power supports productivity, institutional growth, community confidence and improved quality of life through reliable power infrastructure.
            </p>

            <div className="flex flex-wrap gap-x-7 gap-y-3 mt-8">
              {impactChips.map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-2 text-[#0b2a4a] font-extrabold text-sm sm:text-base"
                >
                  <IconCheckCircle className="w-4 h-4 text-[#0072CE]" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
