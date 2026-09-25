import React, { useState } from 'react';
import { IconAplSunburst, IconMessageSquare, IconX } from './Icons';

export default function SupportModal({ isOpen, onClose, onOpenPayModal }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Nnoo! Welcome to APL Electric Company Helpdesk. How can I assist you with your power supply, smart meter token, or fault report today?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const quickQuestions = [
    "How do I buy STS smart meter token?",
    "Check tariff rates for Band A",
    "Emergency fault line for Aba",
    "Where is APL Electric head office?"
  ];

  const handleSend = (userText) => {
    const query = userText || inputMsg;
    if (!query.trim()) return;

    const updated = [...messages, { sender: 'user', text: query }];
    setMessages(updated);
    setInputMsg('');

    setTimeout(() => {
      let reply = "Thank you for reaching out to APL Electric Company. Our customer care desk at Osisioma Headquarters is processing your inquiry.";
      const qLower = query.toLowerCase();

      if (qLower.includes('token') || qLower.includes('buy') || qLower.includes('meter')) {
        reply = "You can instantly purchase your STS prepaid smart meter token online through our Token Portal or dial *737*APL# on your mobile device.";
      } else if (qLower.includes('tariff') || qLower.includes('band')) {
        reply = "APL Electric operates NERC approved MYTO tariffs: Band A (20+ hrs daily) is ₦225/kWh, Band B (16+ hrs daily) is ₦180/kWh, and Band C is ₦140/kWh.";
      } else if (qLower.includes('fault') || qLower.includes('emergency') || qLower.includes('phone')) {
        reply = "For emergency faults or fallen power lines, call our 24/7 Rapid Response Hotline at 0700-APL-POWER (0700-275-7693) or 0803-ABA-GRID.";
      } else if (qLower.includes('office') || qLower.includes('location') || qLower.includes('address')) {
        reply = "Our APL Electric Headquarters is located at Aba Power Station, Osisioma Industrial Layout, Aba, Abia State, Nigeria.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel p-6 border-2 border-[#0072CE]/60 bg-[#030f1e] shadow-2xl rounded-2xl flex flex-col h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <IconAplSunburst className="w-10 h-10" />
            <div>
              <h3 className="font-extrabold text-white text-lg heading-font">APL Care Assistant</h3>
              <span className="text-[11px] text-[#F5B800] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span> Online 24/7 Support
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-black/40 border border-white/15 text-slate-300 hover:border-[#F5B800] hover:text-[#F5B800] px-3 py-1.5 rounded-full transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-black/40 rounded-xl border border-white/10 mb-4 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${m.sender === 'user'
                    ? 'bg-[#0072CE] text-white font-medium rounded-br-none'
                    : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-none'
                  }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputMsg);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type your inquiry here..."
            className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#F5B800]"
          />
          <button type="submit" className="btn-apl-gold text-xs py-3 px-5 rounded-xl">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
