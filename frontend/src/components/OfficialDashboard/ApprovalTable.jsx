import React from 'react';

export const ApprovalTable = ({ officials }) => {
  return (
    <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
      <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Verification Queue</h3>
        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full">
          {officials.length} Pending
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 text-slate-300 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Officer Name</th>
              <th className="px-6 py-4">Employee ID</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {officials.map((off) => (
              <tr key={off.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{off.name}</td>
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">{off.empId}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-emerald-300 hover:text-white bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 px-4 py-2 rounded-lg font-medium transition-colors">
                    Approve
                  </button>
                  <button className="text-red-300 hover:text-white bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 px-4 py-2 rounded-lg font-medium transition-colors">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};