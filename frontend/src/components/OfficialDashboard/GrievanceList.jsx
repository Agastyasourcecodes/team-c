import React from 'react';

export const GrievanceList = ({ grievances }) => {
  if (!grievances || grievances.length === 0) {
    return <div className="text-slate-400 text-center py-10">No active complaints or petitions found.</div>;
  }

  return (
    <div className="space-y-4">
      {grievances.map(g => (
        <div key={g._id} className="bg-black/20 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-white/5 transition-all gap-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                g.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                g.status === 'under_review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-slate-500/20 text-slate-300 border border-slate-500/30'
              }`}>
                {g.status ? g.status.replace('_', ' ').toUpperCase() : 'UNKNOWN'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {new Date(g.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-xs text-blue-300 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {g.category}
              </span>
            </div>
            
            <h4 className="text-lg font-semibold text-white">{g.title}</h4>
            
            <p className="text-slate-300 text-sm mt-1">
              📍 {g.location} <span className="mx-2 text-slate-600">•</span> 
              <span className="font-mono text-xs opacity-80">
                ✍️ {g.signatureCount} / {g.signatureGoal} Signatures
              </span>
            </p>
            
            <p className="text-slate-400 text-xs mt-3 line-clamp-2">
              {g.description}
            </p>
          </div>
          
          <button className="bg-blue-600 text-white border border-blue-500 px-6 py-2.5 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 self-start md:self-auto whitespace-nowrap">
            Review Case
          </button>
        </div>
      ))}
    </div>
  );
};