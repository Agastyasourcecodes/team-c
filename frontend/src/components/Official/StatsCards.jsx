import React from 'react';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
export const StatsCards = () => {
  const stats = [
    { label: 'Total Grievances', value: '1,284', icon: <FileText size={20} />, trend: '+12%', color: 'from-indigo-600 to-blue-500' },
    { label: 'Pending Verifications', value: '08', icon: <ShieldAlert size={20} />, trend: 'Action Required', color: 'from-rose-500 to-orange-400' },
    { label: 'Resolved', value: '942', icon: <CheckCircle2 size={20} />, trend: '98% Success', color: 'from-emerald-500 to-teal-400' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5, scale: 1.01 }}
          className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center justify-between group"
        >
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{s.value}</h3>
            <div className="mt-2 text-[9px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-full inline-block border border-slate-100">
              {s.trend}
            </div>
          </div>
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
            {s.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
};