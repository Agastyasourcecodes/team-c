import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Trash2, Edit3, MapPin, Layers, Fingerprint, Flame } from 'lucide-react';

export const PetitionList = ({ 
    petitions = [], 
    user, 
    onSign, 
    onDelete, 
    onEdit, 
    onCreateClick,
    petitionFilter,
    setPetitionFilter,
    onToast 
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPetitions = (petitions || []).filter(p => {
        let matchesFilter = true;
        const currentUserId = user?._id?.toString() || user?.id?.toString();

        if (petitionFilter === "My Petitions") {
            const creatorId = (p.creator?._id || p.creator)?.toString();
            matchesFilter = creatorId === currentUserId;
        } else if (petitionFilter === "Signed by Me") {
            const voterList = p.voters || [];
            matchesFilter = voterList.some(v => (v._id || v).toString() === currentUserId);
        }
        
        const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSignAttempt = (p, hasSigned) => {
        if (hasSigned) {
            onToast?.("✨ You've already supported this!");
        } else {
            onSign(p._id);
            onToast?.("✍️ Thank you for your support!");
        }
    };

    return (
        <div className="space-y-10 pb-20 px-4 lg:px-8 max-w-7xl mx-auto">
            
            {/* --- TOP HEADER & SEARCH --- */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="px-2">
        <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Public Advocacy Platform</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Community Pulse<span className="text-indigo-600">.</span>
        </h2>
        <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
            A space for every voice, every cause, and every change.
        </p>
    </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-bold outline-none placeholder:text-slate-300"
                            placeholder="Find a cause to support..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={onCreateClick} 
                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 font-black text-[10px] uppercase tracking-widest active:scale-95"
                    >
                        <Plus size={18}/> Start Your Movement
                    </button>
                </div>
            </div>

            {/* --- FILTER TABS --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-sm">
                    {["All Petitions", "My Petitions", "Signed by Me"].map(f => (
                        <button 
                            key={f} 
                            onClick={() => setPetitionFilter(f)} 
                            className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                petitionFilter === f 
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {filteredPetitions.length} Local Issues
                </div>
            </div>

            {/* --- CARDS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredPetitions.map((p, index) => {
                        const currentUserId = user?._id?.toString() || user?.id?.toString();
                        const voterArray = p.voters || [];
                        const hasSigned = voterArray.some(v => (v._id || v).toString() === currentUserId);
                        const isCreator = (p.creator?._id || p.creator)?.toString() === currentUserId;
                        const progress = Math.min((p.signatureCount / p.signatureGoal) * 100, 100);

                        return (
                            <motion.div 
                                layout 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                key={p._id} 
                                className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex flex-col h-full relative"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                                        {p.category}
                                    </span>
                                    
                                    {isCreator && (
                                        <div className="flex gap-2">
                                            <button onClick={() => onEdit(p)} className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"><Edit3 size={14}/></button>
                                            <button onClick={() => onDelete(p._id)} className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"><Trash2 size={14}/></button>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight min-h-[3rem]">
                                    {p.title}
                                </h3>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-3 mb-8 flex-grow">
                                    {p.description}
                                </p>
                                
                                <div className="pt-6 border-t border-slate-50 space-y-5">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                                                <Flame size={14} className={progress > 70 ? "text-orange-500" : "text-indigo-500"} /> 
                                                {p.signatureCount} / {p.signatureGoal} Support
                                            </div>
                                            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                                                <MapPin size={10} /> {p.location || "Local Area"}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                className={`h-full rounded-full ${progress > 70 ? 'bg-orange-500' : 'bg-indigo-600'}`}
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleSignAttempt(p, hasSigned)}
                                        className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 ${
                                            hasSigned 
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default" 
                                            : "bg-indigo-600 text-white hover:bg-slate-900 shadow-md shadow-indigo-100"
                                        }`}
                                    >
                                        {hasSigned ? (
                                            <>✓ Already Supported</>
                                        ) : (
                                            <>
                                                <Fingerprint size={16} /> Support Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* --- EMPTY STATE --- */}
            {filteredPetitions.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                        <Layers className="text-slate-200" size={40} />
                    </div>
                    <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs">Nothing here yet</h3>
                    <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">Be the first one to start a movement!</p>
                </motion.div>
            )}
        </div>
    );
};