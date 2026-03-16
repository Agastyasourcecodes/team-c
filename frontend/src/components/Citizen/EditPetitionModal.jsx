import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, MapPin, Target, Layers, MessageSquare, Quote } from 'lucide-react';

export const EditPetitionModal = ({ petition, onClose, onUpdate, onToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: petition.title || '',
    description: petition.description || '',
    category: petition.category || 'Environment',
    location: petition.location || '',
    signatureGoal: petition.signatureGoal || 100
  });

  const categories = ['Environment', 'Education', 'Healthcare', 'Infrastructure', 'Safety', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Backend function call
      await onUpdate(petition._id, formData);
      onToast?.("✅ Changes saved successfully!");
      onClose();
    } catch (err) {
      onToast?.("❌ Update failed. Check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        {/* Header Section - Matched to Create Page */}
        <div className="p-6 pb-2 flex items-center justify-between bg-white">
          <div className="pl-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Edit Petition</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Update your proposal details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-300">
            <X size={20}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Quote size={12}/> Initiative Title
            </label>
            <input 
              name="title" required placeholder="e.g. Better street lights"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm"
              value={formData.title} onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Layers size={12}/> Category
              </label>
              <select 
                name="category"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer"
                value={formData.category} onChange={handleChange}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Support Goal Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Target size={12}/> Support Goal
              </label>
              <input 
                name="signatureGoal" type="number"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm"
                value={formData.signatureGoal} onChange={handleChange}
              />
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MapPin size={12}/> Location
            </label>
            <input 
              name="location" required placeholder="e.g. Muzaffarnagar"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm"
              value={formData.location} onChange={handleChange}
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <MessageSquare size={12}/> Description
            </label>
            <textarea 
              name="description" required rows="3" placeholder="Explain the change..."
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm resize-none font-medium"
              value={formData.description} onChange={handleChange}
            />
          </div>

          {/* Action Buttons - Premium & Wide */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" onClick={onClose}
              className="px-6 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600"
            >
              Cancel
            </button>
            <button 
              type="submit" disabled={isSubmitting}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
            >
              {isSubmitting ? "Saving..." : <><Save size={14} /> Update Petition</>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};