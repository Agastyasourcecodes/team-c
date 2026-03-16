import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users } from 'lucide-react';

const PollSentimentChart = ({ chartData }) => {
  const data = chartData.labels.map((label, index) => ({
    name: label,
    votes: chartData.votes[index],
  }));

  const totalVotes = chartData.votes.reduce((a, b) => a + b, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-[10px] font-black text-indigo-600 uppercase tracking-tighter">
            {chartData.category || 'Live Poll'}
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-2 tracking-tight group-hover:text-indigo-600 transition-colors">
            {chartData.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase">Total Participation</p>
            <p className="text-lg font-black text-slate-900">{totalVotes} Votes</p>
          </div>
          <Users className="text-indigo-500" size={24} />
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 'bold' }}
            />
            <Bar dataKey="votes" radius={[0, 10, 10, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#4F46E5' : '#E2E8F0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-2 text-emerald-500 font-bold text-xs">
        <TrendingUp size={14} />
        Live insights generated from citizen feedback
      </div>
    </motion.div>
  );
};

export default PollSentimentChart;