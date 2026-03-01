import React from 'react';

export const StatsCards = () => {
  const stats = [
    { label: 'Total Grievances', value: '1,284', iconColor: 'text-sky-400', bgColor: 'bg-sky-500/20', icon: 'bi-list-ul' },
    { label: 'Pending Approvals', value: '08', iconColor: 'text-amber-400', bgColor: 'bg-amber-500/20', icon: 'bi-shield-lock' },
    { label: 'Resolved Cases', value: '942', iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/20', icon: 'bi-check-all' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-black/20 border border-white/10 p-6 rounded-2xl hover:bg-white/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-300 text-sm font-medium">{s.label}</p>
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.bgColor}`}>
              <i className={`bi ${s.icon} ${s.iconColor} text-xl`}></i>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">
            {s.value}
          </h3>
        </div>
      ))}
    </div>
  );
};