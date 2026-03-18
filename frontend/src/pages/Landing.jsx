// frontend/src/pages/Landing.jsx
import React from "react";
import MainLayout from "../Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLoader } from "../context/LoaderContext";
import { 
  ArrowRight, Globe, BarChart3, MessageSquare, 
  ShieldCheck, Landmark, ArrowUpRight, Sparkles
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { showLoader } = useLoader();

  console.log("🏠 Landing page rendered");

  // Reusable navigation function with loader
  const navigateWithLoader = (path, message) => {
    console.log(`🚀 Navigating to ${path} with message: ${message}`);
    showLoader(message);
    
    setTimeout(() => {
      console.log(`➡️ Now navigating to ${path}`);
      navigate(path);
    }, 300);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <MainLayout>
      <div className="bg-[#FCFDFF] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden font-sans">
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden">
          
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920" 
              alt="City Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 via-transparent to-slate-950/90"></div>
          </div>
          
          <motion.div {...fadeIn} className="max-w-4xl text-center relative z-20 pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Direct Democracy 2.0
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-8">
              Your voice, <br />
              <span className="text-indigo-400 font-serif italic font-normal">digitally amplified.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium mb-10 opacity-90">
              Stop waiting for change. CIVIX provides the infrastructure for citizens to propose, vote, and track community resolutions in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Get Started Button */}
              <button
                onClick={() => navigateWithLoader("/auth", "Loading authentication...")}
                className="group px-10 py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-indigo-600 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center gap-3 active:scale-95"
              >
                Get Started 
                <div className="bg-white/20 p-1 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
              
              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[1.8rem] shadow-2xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 ring-1 ring-white/20 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-slate-500 opacity-50" />
                    </div>
                  ))}
                </div>
                <span className="text-[12px] font-black text-white/70 ml-2 tracking-tight italic">10k+ Citizens Joined</span>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#FCFDFF] to-transparent z-10"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 md:px-16 bg-[#FCFDFF] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <InteractiveCard 
                icon={<MessageSquare className="w-5 h-5" />}
                title="Smart Petitions"
                desc="Legally recognized petitions with automated delivery to concerned departments."
                tag="Citizens"
              />
              <InteractiveCard 
                icon={<Globe className="w-5 h-5" />}
                title="Community Hub"
                desc="Localized forums for your city to discuss infrastructure and social issues."
                tag="Network"
              />
              <InteractiveCard 
                icon={<BarChart3 className="w-5 h-5" />}
                title="Impact Ledger"
                desc="Transparent tracking of budget allocations and project completion status."
                tag="Transparency"
              />
            </div>
          </div>
        </section>

        {/* Authority Section */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <div className="bg-slate-950 rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-0"></div>

              <div className="max-w-xl relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck size={16} /> Government Verified
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Official Portal for <br />
                  <span className="text-indigo-400 italic font-serif font-normal">Government Bodies.</span>
                </h2>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                  Join hundreds of verified departments already using CIVIX to respond to citizen needs. Secure, data-driven, and highly efficient.
                </p>
                <div className="pt-4">
                  {/* Enter Portal Button */}
                  <button 
                    onClick={() => navigateWithLoader("/auth", "Loading official portal...")}
                    className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 group shadow-xl"
                  >
                    Enter Portal <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="hidden lg:block relative z-10">
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl w-80 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="h-2 w-2/3 bg-white/20 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                    </div>
                    <div className="pt-4 flex items-center justify-between opacity-50">
                      <Landmark className="text-white" size={24} />
                      <div className="flex gap-2 font-mono text-[10px] text-white">SYSTEM ACTIVE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="stats" className="py-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/3">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-snug">Driving real results <br/>for real people.</h3>
              <p className="text-slate-500 font-medium">Our metrics reflect active civic engagement across the nation.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-8 md:gap-16 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100">
              <StatItem val="12.4k" label="Petitions" />
              <StatItem val="850k" label="Citizens" />
              <StatItem val="94%" label="Resolution" />
              <StatItem val="150+" label="Cities" />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function InteractiveCard({ icon, title, desc, tag }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="p-8 md:p-10 border border-slate-100 bg-white rounded-[2.5rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 relative group overflow-hidden"
    >
      <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500/50 mb-2 block">{tag}</span>
      <h3 className="text-xl font-bold text-slate-950 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
    </motion.div>
  );
}

function StatItem({ val, label }) {
  return (
    <div className="group">
      <div className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">{val}</div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}