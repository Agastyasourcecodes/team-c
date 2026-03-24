// frontend/src/components/Official/GrievanceList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Activity // Added Activity icon
} from 'lucide-react';

// Added a color map for different statuses
const statusStyles = {
  active: "bg-blue-50 text-blue-600 border-blue-200",
  under_review: "bg-amber-50 text-amber-600 border-amber-200",
  in_progress: "bg-emerald-50 text-emerald-600 border-emerald-200",
  resolved: "bg-green-50 text-green-600 border-green-200",
  dismissed: "bg-rose-50 text-rose-600 border-rose-200",
  closed: "bg-slate-50 text-slate-600 border-slate-200"
};

export const GrievanceList = ({ grievances, onUpdateStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      {grievances.map(g => (
        <motion.div 
          key={g._id}
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-indigo-100/10 relative group"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[9px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">{g.category}</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <Clock size={12} /> {new Date(g.createdAt).toLocaleDateString()}
            </div>
          </div>

          <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">{g.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 italic mb-6 font-medium">"{g.description}"</p>

          {/* NEW: Status Dropdown Control */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl mb-6 border border-slate-100">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Activity size={14} className="text-indigo-400" /> Status
             </div>
             <select 
                value={g.status || 'active'} 
                onChange={(e) => onUpdateStatus(g._id, e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer appearance-none text-center ${statusStyles[g.status] || statusStyles.active}`}
             >
                <option value="active">Active</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
                <option value="closed">Closed</option>
             </select>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-50">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-slate-900 uppercase">{g.signatureCount} / {g.signatureGoal}</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                {Math.round((g.signatureCount/g.signatureGoal)*100)}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((g.signatureCount/g.signatureGoal)*100, 100)}%` }}
                className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
              />
            </div>
            
            <button className="w-full py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2">
               Analyze Report <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};