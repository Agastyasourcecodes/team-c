import React from 'react';
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight, 
  Edit3, 
  Trash2, 
  MapPin, 
  Users, 
  Trophy,
  Activity
} from 'lucide-react';

export const HomeView = ({ 
  user, 
  petitions = [], 
  polls = [], 
  onSign, 
  onDelete, 
  onEdit, 
  setPage, 
  onToast 
}) => {
  // Logic Calculations
  const userPetitions = petitions.filter(p => p.creator === user?._id).length;
  const totalCommunitySignatures = petitions.reduce((acc, curr) => acc + (curr.signatureCount || 0), 0);
  
  const statusData = [
    { name: "Active", value: 45, color: "#6366f1" },
    { name: "Review", value: 25, color: "#f59e0b" },
    { name: "Finished", value: 30, color: "#94a3b8" }
  ];

  // Action Handlers
  const handleSignAction = async (id) => {
    try {
      await onSign(id);
      onToast?.("✍️ Signed successfully!");
    } catch (err) {
      onToast?.("❌ Failed to sign");
    }
  };

  const handleDeleteAction = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await onDelete(id);
        onToast?.("🗑️ Petition removed");
      } catch (err) {
        onToast?.("❌ Delete failed");
      }
    }
  };

  const handleEditAction = (p) => {
    onEdit?.(p);
    onToast?.("✏️ Opening editor...");
  };

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8">
      
      {/* LEFT COLUMN: Profile & Quick Stats (4 Cols) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        
        {/* Welcome Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Trophy size={80} />
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Citizen Dashboard</span>
          <h2 className="text-3xl font-black text-slate-900 mt-4 mb-2">Hi, {user?.name?.split(' ')[0] || "Vansh"}!</h2>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
            <MapPin size={14} className="text-indigo-500" /> Muzaffarnagar, UP
          </div>
        </motion.section>

        {/* Activity Summary Bento */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={16} className="text-indigo-600" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">My Progress</h3>
          </div>
          <div className="space-y-6">
            {[
              { label: "Created by you", val: userPetitions, color: "bg-indigo-600", max: 10 },
              { label: "Signed by you", val: 12, color: "bg-emerald-500", max: 20 },
              { label: "Polls voted", val: 8, color: "bg-amber-500", max: 15 }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2 px-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-black text-slate-900">{stat.val}</p>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${Math.min((stat.val / stat.max) * 100, 100)}%` }} 
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full ${stat.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Circular Analytics Card */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Global Petition Status</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={statusData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5}
                  dataKey="value" 
                  stroke="none"
                >
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map(e => (
              <div key={e.name} className="flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full mb-1" style={{ background: e.color }} />
                <span className="text-[9px] font-black text-slate-400 uppercase">{e.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN: Community Feed (8 Cols) */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between px-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Updates</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Community Pulse<span className="text-indigo-600">.</span></h2>
          </div>
          <button 
            onClick={() => setPage("Petitions")} 
            className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            See All Petitions <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Petitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {petitions.slice(0, 4).map((p, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              key={p._id} 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-slate-50 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                  {p.category}
                </span>
                
                {p.creator === user?._id && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditAction(p)} 
                      className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"
                    >
                      <Edit3 size={14}/>
                    </button>
                    <button 
                      onClick={() => handleDeleteAction(p._id)} 
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={14}/>
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                {p.title}
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-3 mb-8 flex-grow">
                {p.description}
              </p>
              
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {p.signatureCount} / {p.signatureGoal}
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                    <MapPin size={10} /> {p.location || "Local Area"}
                  </div>
                </div>
                <button 
                  onClick={() => handleSignAction(p._id)} 
                  className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-md shadow-indigo-100 active:scale-95"
                >
                  Sign Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Engagement Dark Section */}
        <section className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -mr-20 -mt-20" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                 <Users size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Active Engagement</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                  {totalCommunitySignatures} Citizens Participated
                </p>
              </div>
            </div>
            <button 
              onClick={() => setPage("Polls")} 
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
            >
              View Recent Polls <ArrowUpRight size={16}/>
            </button>
          </div>

          {/* Corrected Polls Rendering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
             {polls?.slice(0, 2).map(p => {
               // Calculate real total votes from the DB options array
               const totalVotes = p.options?.reduce((sum, opt) => sum + opt.votes, 0) || 0;
               return (
                 <div key={p._id} className="p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group">
                    <h4 className="text-sm font-bold mb-4 group-hover:text-indigo-400 transition-colors">{p.title}</h4>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Users size={10} /> {totalVotes} Votes
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin size={10} /> {p.target_location || "General"}
                        </span>
                      </div>
                      <span 
                        onClick={() => setPage("Polls")} 
                        className="text-[10px] font-black text-indigo-400 hover:text-white uppercase cursor-pointer"
                      >
                        Vote
                      </span>
                    </div>
                 </div>
               )
             })}
          </div>
        </section>
      </div>
    </div>
  );
};