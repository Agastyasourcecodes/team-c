import React from 'react';

export const GrievanceList = () => {
  const grievances = [
    { id: 101, title: 'Broken Water Pipe', area: 'Sector 56', status: 'High' },
    { id: 102, title: 'Street Light Issue', area: 'Main Market', status: 'Medium' }
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
      {grievances.map(g => (
        <div key={g.id} className="bg-white/5 p-8 rounded-[30px] border border-white/10 flex justify-between items-center group hover:border-blue-500/50 transition-all">
          <div>
            <span className={`text-[9px] font-black px-2 py-1 rounded uppercase mb-2 inline-block ${g.status === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
              {g.status} Priority
            </span>
            <h4 className="text-xl font-black tracking-tight">{g.title}</h4>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{g.area} • ID: #{g.id}</p>
          </div>
          <button className="bg-blue-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
            Take Action
          </button>
        </div>
      ))}
    </div>
  );
};