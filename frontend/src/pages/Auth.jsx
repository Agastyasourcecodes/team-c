import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  ShieldCheck, 
  X, 
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-xl p-4 font-sans overflow-y-auto">
      
      {/* Premium Background Orbs */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[480px] bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden my-auto border border-white/20"
      >
        
        {/* Close Button - Premium Glass Style */}
        <button 
          onClick={() => navigate("/")} 
          className="absolute top-6 right-6 p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all z-20 active:scale-90 border border-transparent hover:border-slate-200"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-12">
          {/* Header - Minimalist & Sharp */}
          <div className="mb-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles size={12} />
              Secure Access
            </div>
            <h1 className="text-4xl font-bold text-slate-950 tracking-tight leading-none mb-3">
              Join <span className="text-indigo-600 italic font-serif font-normal">Civix.</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Select your portal to start making a difference in your community today.
            </p>
          </div>

          {/* Role Selection - Bento Style Stack */}
          <div className="space-y-4">
            
            {/* Citizen Option */}
            <motion.div 
              variants={itemVariants}
              onClick={() => navigate("/citizen-login")}
              className="group relative p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-600 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] rounded-[2rem] transition-all duration-500 cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <User size={28} className="transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Citizen</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium group-hover:text-slate-600 transition-colors">
                      Raise issues & track city growth.
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>

            {/* Official Option */}
            <motion.div 
              variants={itemVariants}
              onClick={() => navigate("/official-login")}
              className="group relative p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-950 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] transition-all duration-500 cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                    <ShieldCheck size={28} className="transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Official</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium group-hover:text-slate-600 transition-colors">
                      Administrative portal for authorities.
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Footer - Secure & Trusted */}
          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-50 rounded-lg">
                <Lock size={14} className="text-green-600" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                AES-256 Encrypted
              </span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-blue-500"></div>
      </motion.div>
    </div>
  );
}