// frontend/src/components/Citizen/PetitionList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  PenTool,
  CheckCircle2,
  Plus // Added for the create button
} from 'lucide-react';

// Color map for different statuses to maintain design consistency
const statusStyles = {
  active: "bg-blue-50 text-blue-600 border-blue-200",
  under_review: "bg-amber-50 text-amber-600 border-amber-200",
  in_progress: "bg-emerald-50 text-emerald-600 border-emerald-200",
  resolved: "bg-green-50 text-green-600 border-green-200",
  dismissed: "bg-rose-50 text-rose-600 border-rose-200",
  closed: "bg-slate-50 text-slate-600 border-slate-200"
};

const statusLabels = { 
  active: "Active", 
  under_review: "Under Review", 
  in_progress: "In Progress",
  resolved: "Resolved",
  dismissed: "Dismissed",
  closed: "Closed" 
};

// Added onCreateClick to the props
export const PetitionList = ({ petitions, onSignPetition, currentUserId, onCreateClick }) => {
  
  return (
    <div className="space-y-8">
      
      {/* --- HEADER & CREATE BUTTON SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Petition Gallery</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Browse Petitions<span className="text-indigo-600">.</span></h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onCreateClick}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <Plus size={16} /> Start a Petition
          </button>
        </div>
      </div>

      {/* --- CONDITIONAL RENDER: EMPTY STATE OR GRID --- */}
      {(!petitions || petitions.length === 0) ? (
        <div className="text-center py-20 text-slate-500 font-medium bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
          No petitions found. Be the first to start a change!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {petitions.map((p) => {
            // Calculate progress percentage
            const progress = Math.min((p.signatureCount / p.signatureGoal) * 100, 100);
            
            // Determine if the current user has already signed
            const hasSigned = p.signers?.includes(currentUserId); 
            
            // Ensure status has a fallback
            const currentStatus = p.status || "active";

            return (
              <motion.div 
                key={p._id}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-indigo-100/10 relative group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4 gap-2">
                  <span className="text-[9px] font-black bg-slate-900 text-white px-3 py-1.5 rounded-full uppercase tracking-widest shrink-0">
                    {p.category}
                  </span>
                  
                  {/* Citizen Status Badge */}
                  <div className={`text-[9px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider shrink-0 ${statusStyles[currentStatus]}`}>
                    {statusLabels[currentStatus]}
                  </div>
                </div>

                <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                  {p.title}
                </h4>
                
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 font-medium flex-1">
                  "{p.description}"
                </p>

                <div className="flex items-center gap-4 mb-6 text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-indigo-400" /> {p.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-indigo-400" /> {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-4 pt-5 border-t border-slate-50 mt-auto">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-900 uppercase">
                      {p.signatureCount} / {p.signatureGoal} Signatures
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                    />
                  </div>
                  
                  {/* Conditional Action Button based on Status */}
                  {currentStatus === "active" ? (
                    <button 
                      onClick={() => onSignPetition(p._id)}
                      disabled={hasSigned}
                      className={`w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        hasSigned 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95'
                      }`}
                    >
                      {hasSigned ? (
                        <><CheckCircle2 size={16} /> Signed</>
                      ) : (
                        <><PenTool size={16} /> Sign Petition</>
                      )}
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Signature Phase Closed
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};