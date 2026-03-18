import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Send, X, MessageSquare, Trash2 } from 'lucide-react';

const CreatePollModal = ({ isOpen, onClose, onPublish }) => {
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
      id: Date.now(),
      title: question,
      category,
      options: options,
      labels: options,
      votes: options.map(() => Math.floor(Math.random() * 5)), 
      status: 'Active',
      voted: false,
      timestamp: "Just now",
      location: "Community"
    };

    if (onPublish) onPublish(pollData);
    
    // Reset form
    setQuestion('');
    setOptions(['', '']);
    setCategory('General');
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Create a Poll</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ask your community</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handlePublish} className="p-8 space-y-6">
                
                {/* Category Selector */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Category</p>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.slice(0, 3).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-3 rounded-xl text-[10px] font-black transition-all border ${
                          category === cat 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Input */}
                <div className="relative group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Your Question</p>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all font-bold text-slate-700 placeholder:text-slate-300 resize-none"
                    placeholder="What would you like to ask your community?"
                    rows="3"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Poll Options</p>
                    <button
                      type="button"
                      onClick={handleAddOption}
                      disabled={options.length >= 5}
                      className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={14} /> Add Option
                    </button>
                  </div>

                  <AnimatePresence>
                    {options.map((option, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative group flex items-center gap-2"
                      >
                        <input 
                          value={option}
                          onChange={(e) => {
                            const newOpt = [...options];
                            newOpt[i] = e.target.value;
                            setOptions(newOpt);
                          }}
                          className="flex-1 h-12 px-5 rounded-xl bg-slate-50 border border-slate-100 outline-none group-hover:border-indigo-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all text-sm font-bold"
                          placeholder={`Option ${i + 1}`} 
                        />
                        {options.length > 2 && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveOption(i)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <p className="text-[9px] text-slate-400 font-bold">
                    {options.length}/5 options • Minimum 2 required
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                  >
                    <Send size={16} /> Publish Poll
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePollModal;
