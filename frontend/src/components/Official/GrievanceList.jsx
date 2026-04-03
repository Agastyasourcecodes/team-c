// frontend/src/components/Official/GrievanceList.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Activity,
  X // Added X icon for the close button
} from 'lucide-react';

const statusStyles = {
  active: "bg-blue-50 text-blue-600 border-blue-200",
  under_review: "bg-amber-50 text-amber-600 border-amber-200",
  in_progress: "bg-emerald-50 text-emerald-600 border-emerald-200",
  resolved: "bg-green-50 text-green-600 border-green-200",
  dismissed: "bg-rose-50 text-rose-600 border-rose-200",
  closed: "bg-slate-50 text-slate-600 border-slate-200"
};

export const GrievanceList = ({ grievances, onUpdateStatus }) => {
  // Add state to track which grievance is currently being viewed
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <>
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
              
              {/* Added onClick handler to open the modal */}
              <button 
                onClick={() => setSelectedReport(g)}
                className="w-full py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                 Analyze Report <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- ANALYSIS MODAL --- */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedReport.category}
                  </span>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${statusStyles[selectedReport.status] || statusStyles.active}`}>
                    {selectedReport.status.replace('_', ' ')}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-2 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all shadow-sm border border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content (Scrollable) */}
              <div className="p-8 overflow-y-auto">
                <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight">
                  {selectedReport.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Clock size={14} className="text-indigo-400" />
                    Filed on {new Date(selectedReport.createdAt).toLocaleDateString()}
                  </div>
                  {selectedReport.location && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <MapPin size={14} className="text-indigo-400" />
                      {selectedReport.location}
                    </div>
                  )}
                  {/* Depending on how your backend sends createdBy, it might be an object or a string ID */}
                  {selectedReport.createdBy && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Users size={14} className="text-indigo-400" />
                      Creator ID: {typeof selectedReport.createdBy === 'object' ? selectedReport.createdBy._id || selectedReport.createdBy.name : selectedReport.createdBy}
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Complete Description</h3>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                      {selectedReport.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Current Traction</h3>
                  <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm font-black text-indigo-900">Signatures: {selectedReport.signatureCount} / {selectedReport.signatureGoal}</span>
                      <span className="text-sm font-bold text-indigo-600 bg-white px-3 py-1 rounded-xl border border-indigo-100 shadow-sm">
                        {Math.round((selectedReport.signatureCount/selectedReport.signatureGoal)*100)}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${Math.min((selectedReport.signatureCount/selectedReport.signatureGoal)*100, 100)}%` }}
                        className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};