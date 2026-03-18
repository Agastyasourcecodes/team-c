import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, BarChart3, Calendar, ArrowRight, 
  Inbox, Vote, CheckCircle2, ShieldCheck, Plus
} from "lucide-react";
import CreatePollModal from "./CreatePollModal";

const Polls = ({ pollTab, setPollTab, filteredPolls, showToast }) => {
  const tabs = ["Active", "Voted", "Closed"];
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mainTab, setMainTab] = useState("Browse");
  const [citizenPolls, setCitizenPolls] = useState([]);

  const handleSelectOption = (pollId, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionIndex
    }));
  };

  const handleSubmitVote = (poll) => {
    const selectedText = poll.options[selectedOptions[poll.id]];
    showToast(`Success! Your vote for "${selectedText}" has been recorded.`);
  };

  const handlePublishPoll = (pollData) => {
    setCitizenPolls(prev => [pollData, ...prev]);
    setIsCreateModalOpen(false);
    showToast("✅ Your poll has been published!");
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header with Main Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/5 p-10 rounded-[40px] border border-white backdrop-blur-md">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Community Polls<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">
            Ask & Vote on Community Topics
          </p>
        </div>

        <div className="inline-flex p-2 bg-white/60 backdrop-blur-lg rounded-[24px] border border-white shadow-sm gap-2">
          {["Browse", "Create"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMainTab(tab);
                if (tab === "Create") {
                  setIsCreateModalOpen(true);
                }
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                mainTab === tab
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                  : "bg-transparent text-slate-600 hover:bg-white/50"
              }`}
            >
              {tab === "Create" && <Plus size={14} />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Browse Polls Section */}
      {mainTab === "Browse" && (
        <>
      <div className="inline-flex p-2 bg-slate-200/60 backdrop-blur-lg rounded-[24px] border border-slate-200/50">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setPollTab(t)}
            className={`relative px-10 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              pollTab === t
                ? "bg-slate-900 text-white shadow-2xl scale-105"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="inline-flex p-2 bg-slate-200/60 backdrop-blur-lg rounded-[24px] border border-slate-200/50">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setPollTab(t)}
            className={`relative px-10 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              pollTab === t
                ? "bg-slate-900 text-white shadow-2xl scale-105"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {/* Show citizen polls first if in Browse */}
          {citizenPolls.length > 0 && citizenPolls.map((p, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={p.id || index}
              className="group bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 p-10 rounded-[48px] shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(99,102,241,0.1)] hover:bg-white transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    <span className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700 border border-indigo-200">
                      Your Poll
                    </span>
                    <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center border border-indigo-200 group-hover:bg-indigo-50 transition-colors">
                    <Vote size={20} className="text-indigo-600" />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-slate-900 leading-[1.15] mb-8">
                  {p.title}
                </h3>

                <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-indigo-100">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} className="text-indigo-500" /> Category
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.category || "General"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <BarChart3 size={12} className="text-indigo-500" /> Responses
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.votes?.reduce((a, b) => a + b, 0) || 0} Total</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} className="text-indigo-500" /> Created
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.timestamp}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  {p.options && p.options.map((option, i) => (
                    <div
                      key={i}
                      className="w-full py-4 px-6 rounded-2xl text-[12px] font-bold text-left flex items-center justify-between border bg-white border-slate-100 text-slate-600"
                    >
                      {option}
                      <span className="text-indigo-600 font-black">{p.votes[i]} votes</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center py-3 rounded-lg bg-indigo-50 border border-indigo-100">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Your poll is live!</p>
              </div>
            </motion.div>
          ))}

          {/* Show official polls */}
          {filteredPolls.map((p, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={p.id || index}
              className="group bg-white/70 border border-slate-200/50 p-10 rounded-[48px] shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-2">
                    <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {p.status}
                    </span>
                    {p.voted && (
                      <span className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100">
                        Voted
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                    <Vote size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-slate-900 leading-[1.15] mb-8">
                  {p.title}
                </h3>

                <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-slate-100">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} className="text-indigo-500" /> Region
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.location || "General"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <BarChart3 size={12} className="text-indigo-500" /> Stats
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.votes || 0} Votes</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} className="text-indigo-500" /> Ends
                    </p>
                    <p className="text-[12px] font-bold text-slate-700">{p.ends || "Ongoing"}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  {p.options && p.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={p.voted || p.status === 'Closed'}
                      onClick={() => handleSelectOption(p.id, i)}
                      className={`w-full py-5 px-8 rounded-3xl text-[12px] font-black text-left transition-all flex items-center justify-between border ${
                        selectedOptions[p.id] === i
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]"
                          : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50"
                      } ${p.voted ? "opacity-60 cursor-not-allowed border-slate-200" : ""}`}
                    >
                      {option}
                      {selectedOptions[p.id] === i && <CheckCircle2 size={18} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={p.voted || selectedOptions[p.id] === undefined || p.status === 'Closed'}
                onClick={() => handleSubmitVote(p)}
                className={`flex items-center justify-center gap-3 w-full py-6 rounded-[28px] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
                  p.voted
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : selectedOptions[p.id] !== undefined
                    ? "bg-slate-900 text-white hover:bg-black shadow-2xl"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 opacity-90 shadow-lg"
                }`}
              >
                {p.voted ? "Submission Received" : p.status === 'Closed' ? "Poll Closed" : "Cast Your Vote"}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPolls.length === 0 && citizenPolls.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-40 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200">
          <div className="w-24 h-24 bg-white rounded-[32px] shadow-sm flex items-center justify-center mb-8 border border-slate-100">
            <Inbox className="text-indigo-200" size={40} />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">
            No <span className="text-indigo-600">{pollTab}</span> polls available
          </p>
        </motion.div>
      )}
        </>
      )}

      {/* Create Poll Modal */}
      <CreatePollModal 
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setMainTab("Browse");
        }}
        onPublish={handlePublishPoll}
      />
    </div>
  );
};

export default Polls;