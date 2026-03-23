import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, BarChart3, Calendar, ArrowRight, Inbox, Vote, CheckCircle2, Plus, Trash2, Edit2, X } from "lucide-react";
import CreatePollModal from "./CreatePollModal";
import { submitVote, deletePoll, updatePoll } from "../../services/pollService";

const Polls = ({ pollTab, setPollTab, filteredPolls, fetchPolls, showToast }) => {
  const tabs = ["Active", "Voted", "Closed"];
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mainTab, setMainTab] = useState("Browse");
  
  // Edit State
  const [editingPoll, setEditingPoll] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", description: "" });

  const currentUserId = localStorage.getItem("userId");

  const handleSelectOption = (pollId, optionIndex) => {
    setSelectedOptions(prev => ({ ...prev, [pollId]: optionIndex }));
  };

  const handleSubmitVote = async (poll) => {
    try {
      const selectedOptionText = poll.options[selectedOptions[poll._id]].text;
      await submitVote(poll._id, { selected_option: selectedOptionText });
      
      showToast(`Success! Your vote for "${selectedOptionText}" has been recorded.`);
      setSelectedOptions(prev => ({ ...prev, [poll._id]: undefined }));
      fetchPolls(); // Refresh to get updated real vote counts from backend
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to submit vote");
    }
  };

  const handleDeletePoll = async (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      try {
        await deletePoll(pollId);
        showToast("Poll deleted successfully");
        fetchPolls();
      } catch (error) {
        showToast(error.response?.data?.message || "Not authorized to delete");
      }
    }
  };

  const openEdit = (poll) => {
    setEditingPoll(poll);
    setEditFormData({ title: poll.title, description: poll.description || "" });
  };

  const handleUpdateSubmit = async () => {
    try {
      await updatePoll(editingPoll._id, { title: editFormData.title, description: editFormData.description });
      showToast("Poll updated successfully");
      setEditingPoll(null);
      fetchPolls();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update poll");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/5 p-10 rounded-[40px] border border-white backdrop-blur-md">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Community Polls<span className="text-indigo-600">.</span></h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Ask & Vote on Community Topics</p>
        </div>
        <div className="inline-flex p-2 bg-white/60 backdrop-blur-lg rounded-[24px] border border-white shadow-sm gap-2">
          {["Browse", "Create"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setMainTab(tab); if (tab === "Create") setIsCreateModalOpen(true); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                mainTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105" : "bg-transparent text-slate-600 hover:bg-white/50"
              }`}
            >
              {tab === "Create" && <Plus size={14} />} {tab}
            </button>
          ))}
        </div>
      </div>

      {mainTab === "Browse" && (
        <>
          <div className="inline-flex p-2 bg-slate-200/60 backdrop-blur-lg rounded-[24px] border border-slate-200/50">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setPollTab(t)}
                className={`relative px-10 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  pollTab === t ? "bg-slate-900 text-white shadow-2xl scale-105" : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPolls.map((p, index) => {
                const totalVotes = p.options.reduce((sum, opt) => sum + opt.votes, 0);
                const isCreator = p.created_by && (p.created_by._id === currentUserId || p.created_by === currentUserId);

                return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={p._id}
                  className="group bg-white/70 border border-slate-200/50 p-10 rounded-[48px] shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-500 flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-2">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          p.status !== 'closed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {p.status || 'Active'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {isCreator && (
                          <>
                            <button onClick={() => openEdit(p)} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeletePoll(p._id)} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </>
                        )}
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                          <Vote size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-3xl font-black text-slate-900 leading-[1.15] mb-4">{p.title}</h3>
                    {p.description && <p className="text-sm text-slate-500 mb-8">{p.description}</p>}

                    <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-slate-100">
                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={12} className="text-indigo-500" /> Region</p>
                        <p className="text-[12px] font-bold text-slate-700">{p.target_location || "General"}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BarChart3 size={12} className="text-indigo-500" /> Stats</p>
                        <p className="text-[12px] font-bold text-slate-700">{totalVotes} Votes</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={12} className="text-indigo-500" /> Ends</p>
                        <p className="text-[12px] font-bold text-slate-700">{p.closes_at ? new Date(p.closes_at).toLocaleDateString() : "Ongoing"}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-10">
                      {p.options && p.options.map((option, i) => (
                        <button
                          key={i}
                          disabled={p.status === 'closed'}
                          onClick={() => handleSelectOption(p._id, i)}
                          className={`w-full py-5 px-8 rounded-3xl text-[12px] font-black text-left transition-all flex items-center justify-between border ${
                            selectedOptions[p._id] === i ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]" : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50"
                          } ${p.status === 'closed' ? "opacity-60 cursor-not-allowed border-slate-200" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            <span>{option.text}</span>
                            <span className={`text-[10px] px-2 py-1 rounded-full ${selectedOptions[p._id] === i ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                              {option.votes} votes
                            </span>
                          </div>
                          {selectedOptions[p._id] === i && <CheckCircle2 size={18} className="text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={selectedOptions[p._id] === undefined || p.status === 'closed'}
                    onClick={() => handleSubmitVote(p)}
                    className={`flex items-center justify-center gap-3 w-full py-6 rounded-[28px] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
                      p.status === 'closed' ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : selectedOptions[p._id] !== undefined ? "bg-slate-900 text-white hover:bg-black shadow-2xl" : "bg-indigo-600 text-white hover:bg-indigo-700 opacity-90 shadow-lg"
                    }`}
                  >
                    {p.status === 'closed' ? "Poll Closed" : "Cast Your Vote"}
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              )})}
            </AnimatePresence>
          </div>

          {filteredPolls.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-40 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-white rounded-[32px] shadow-sm flex items-center justify-center mb-8 border border-slate-100"><Inbox className="text-indigo-200" size={40} /></div>
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">No <span className="text-indigo-600">{pollTab}</span> polls available</p>
            </motion.div>
          )}
        </>
      )}

      {/* Inline Edit Modal */}
      {editingPoll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setEditingPoll(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200"><X size={18}/></button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Edit Poll</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Title</label>
                <input type="text" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                <textarea value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700" />
              </div>
              <button onClick={handleUpdateSubmit} className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-indigo-700 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Poll Modal */}
      <CreatePollModal 
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); setMainTab("Browse"); }}
        onPublish={() => { setIsCreateModalOpen(false); fetchPolls(); showToast("Poll published!"); }}
      />
    </div>
  );
};

export default Polls;