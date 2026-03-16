import React from "react";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-400 mt-auto border-t border-white/5 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute -top-24 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Identity */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
              CIVIX<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs font-medium opacity-80">
              Empowering citizens through digital infrastructure. Propose, vote, and track community growth in real-time with India's most transparent governance portal.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-3">
              <FooterLink label="Smart Petitions" />
              <FooterLink label="Community Hub" />
              <FooterLink label="Impact Ledger" />
              <FooterLink label="Dept. Responses" />
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-3">
              <FooterLink label="Help Center" />
              <FooterLink label="Usage Guidelines" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-default text-sm">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
                   <Mail size={16} />
                </div>
                <span className="mt-1">support@civix.org</span>
              </li>
              <li className="flex items-start gap-3 group cursor-default text-sm">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
                   <Phone size={16} />
                </div>
                <span className="mt-1">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 group cursor-default text-sm">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
                   <MapPin size={16} />
                </div>
                <span className="mt-1 leading-relaxed">New Delhi, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © {currentYear} <span className="text-slate-400">CIVIX Official</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">Core System v2.0</span>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all group"
            >
              <ArrowUpRight size={18} className="-rotate-45 group-hover:-rotate-0 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components for cleaner code
function FooterLink({ label }) {
  return (
    <li>
      <a href="#" className="group flex items-center gap-2 text-sm hover:text-white transition-colors">
        <div className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
        {label}
      </a>
    </li>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
      {icon}
    </a>
  );
}