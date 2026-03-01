import React from 'react';

export const GrievanceList = () => {
  const grievances = [
    { id: 101, title: 'Broken Water Pipe', area: 'Sector 56', status: 'High', date: 'Oct 24, 2025' },
    { id: 102, title: 'Street Light Issue', area: 'Main Market', status: 'Medium', date: 'Oct 23, 2025' }
  ];

  return (
    <div className="space-y-4">
      {grievances.map(g => (
        <div key={g.id} className="bg-black/20 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-white/5 transition-all gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${g.status === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                {g.status} Priority
              </span>
              <span className="text-xs text-slate-400 font-medium">{g.date}</span>
            </div>
            <h4 className="text-lg font-semibold text-white">{g.title}</h4>
            <p className="text-slate-300 text-sm mt-1">{g.area} <span className="mx-2 text-slate-600">•</span> <span className="font-mono text-xs opacity-70">ID: #{g.id}</span></p>
          </div>
          <button className="bg-blue-600 text-white border border-blue-500 px-6 py-2.5 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 self-start md:self-auto">
            Review Case
          </button>
        </div>
      ))}
    </div>
  );
};