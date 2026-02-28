import React from 'react';

export const ApprovalTable = ({ officials }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl">
      <div className="p-8 border-b border-white/10">
        <h3 className="text-xl font-black uppercase tracking-tighter">Verification Queue</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <th className="px-8 py-5">Officer Name</th>
            <th className="px-8 py-5">Employee ID</th>
            <th className="px-8 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {officials.map((off) => (
            <tr key={off.id} className="hover:bg-white/5 transition-colors group">
              <td className="px-8 py-6 font-bold">{off.name}</td>
              <td className="px-8 py-6 text-slate-400 font-mono uppercase">{off.empId}</td>
              <td className="px-8 py-6 text-right space-x-2">
                <button className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10">Approve</button>
                <button className="bg-red-500/20 text-red-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};