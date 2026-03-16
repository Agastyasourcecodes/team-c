import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Send, X, Globe, MessageSquare } from 'lucide-react';

const PollForm = ({ onPublish }) => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('General');
  const [options, setOptions] = useState(['', '']);

  const categories = ["Infrastructure", "Education", "Health", "Safety", "Environment"];

  const handlePublish = (e) => {
    e.preventDefault();
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert("Please add a question and all choices!");
      return;
    }

    const pollData = {
      title: question,
      category,
      labels: options,
      votes: options.map(() => Math.floor(Math.random() * 10)), 
      timestamp: "Just now"
    };

    if (onPublish) onPublish(pollData);
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-100/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <MessageSquare className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Ask the Public</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Community Voice Module</p>
        </div>
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        {/* Category Selector */}
        <div className="grid grid-cols-3 gap-2">
          {categories.slice(0, 3).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`py-2 rounded-xl text-[10px] font-black transition-all border ${
                category === cat 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                : 'bg-white/50 text-slate-500 border-slate-100 hover:border-indigo-200'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative group">
          <textarea 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-6 rounded-[1.5rem] bg-white/60 border border-slate-100 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-300 transition-all font-bold text-slate-700 placeholder:text-slate-300 resize-none"
            placeholder="What would you like to ask the citizens?"
            rows="3"
          />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Choices</p>
          <AnimatePresence>
            {options.map((option, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <input 
                  value={option}
                  onChange={(e) => {
                    const newOpt = [...options];
                    newOpt[i] = e.target.value;
                    setOptions(newOpt);
                  }}
                  className="w-full h-14 px-6 rounded-2xl bg-white border border-slate-100 outline-none group-hover:border-indigo-200 focus:border-indigo-400 transition-all text-sm font-bold" 
                  placeholder={`Option ${i + 1}`} 
                />
                {options.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center">
          {options.length < 5 && (
            <button 
              type="button" 
              onClick={() => setOptions([...options, ''])}
              className="flex items-center gap-2 text-[10px] font-black text-indigo-600 hover:tracking-widest transition-all uppercase"
            >
              <Plus size={14} className="bg-indigo-100 rounded-full" /> Add Choice
            </button>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full py-5 bg-slate-900 hover:bg-indigo-600 rounded-[1.8rem] text-white font-black text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-indigo-200 group"
        >
          Publish to Community
          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};

export default PollForm;