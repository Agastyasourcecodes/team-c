import React from 'react';
import { 
  UserCheck, 
  UserX, 
  Mail, 
  User, 
  ShieldAlert, 
  ChevronRight 
} from 'lucide-react';
export const ApprovalTable = ({ officials, onApprove, onReject }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/20 overflow-hidden mb-10">
      <div className="px-8 py-7 border-b border-slate-50 flex justify-between items-center bg-white/50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Verification Queue</h3>
        </div>
        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 uppercase tracking-widest">
          {officials.length} Pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/30 text-slate-400 text-[10px] uppercase tracking-widest font-black">
              <th className="px-8 py-5 text-left">Official Information</th>
              <th className="px-8 py-5 text-left">Credentials</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {officials.map((off) => (
              <tr key={off._id} className="hover:bg-indigo-50/20 transition-all duration-300 group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-none mb-1">{off.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">ID: {off._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono">
                    <Mail size={12} className="text-indigo-400" /> {off.email}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onApprove(off._id)} className="p-2.5 bg-white border border-slate-100 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl shadow-sm transition-all"><UserCheck size={18} /></button>
                    <button onClick={() => onReject(off._id)} className="p-2.5 bg-white border border-slate-100 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl shadow-sm transition-all"><UserX size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};