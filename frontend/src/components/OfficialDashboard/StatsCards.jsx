import React from 'react';

export const StatsCards = () => {
  const stats = [
    { label: 'Total Grievances', value: '1,284', color: 'text-white', icon: 'bi-list-ul' },
    { label: 'Pending Approvals', value: '08', color: 'text-blue-400', icon: 'bi-shield-lock' },
    { label: 'Resolved Cases', value: '942', color: 'text-emerald-400', icon: 'bi-check-all' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-all group">
          <i className={`bi ${s.icon} ${s.color} text-2xl mb-4 block`}></i>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{s.label}</p>
          <h3 className={`text-6xl font-black italic tracking-tighter ${s.color} group-hover:scale-105 transition-transform origin-left`}>
            {s.value}
          </h3>
        </div>
      ))}
    </div>
  );
};