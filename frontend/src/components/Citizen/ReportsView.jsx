import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, Tooltip 
} from 'recharts';
import { 
  Heart, 
  MessageSquare, 
  MousePointer2, 
  Download, 
  CheckCircle2,
  TrendingUp 
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

export const ReportsView = ({ petitions = [], polls = [] }) => {
  // Logic Calculations
  const totalSignatures = petitions.reduce((acc, p) => acc + (p.signatureCount || 0), 0);
  const myPetitionsCount = petitions.length;
  const myPollsCount = polls.length;

  // Your Activities Data
  const petitionStatusData = [
    { name: 'Active', value: 60, color: '#6366f1' },
    { name: 'Under Review', value: 25, color: '#f59e0b' },
    { name: 'Completed', value: 15, color: '#10b981' },
  ];

  const participationData = [
    { name: 'Petitions', value: 70, color: '#818cf8' },
    { name: 'Polls', value: 30, color: '#c7d2fe' },
  ];

  // PDF Generation Function
  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // 1. Header Section
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); 
    doc.text('Civix - Full Activity Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); 
    doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 30);

    // 2. Summary Statistics
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`Total Petitions: ${myPetitionsCount}`, 14, 45);
    doc.text(`Total Signatures Gathered: ${totalSignatures}`, 14, 53);
    doc.text(`Total Polls: ${myPollsCount}`, 14, 61);

    // 3. Petitions Table
    doc.setFontSize(16);
    doc.text('Petitions Overview', 14, 75);
    
    const petitionData = petitions.map(p => [
      p.title || 'Untitled Petition', 
      p.category || 'General', 
      p.signatureCount || 0, 
      p.status || 'Active'
    ]);

    autoTable(doc, {
      startY: 80,
      head: [['Title', 'Category', 'Signatures', 'Status']],
      body: petitionData,
      theme: 'striped',
      headStyles: { fillColor: [99, 102, 241] }, 
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    // 4. Polls Table
    const finalY = doc.lastAutoTable.finalY || 80; 
    
    doc.setFontSize(16);
    doc.text('Polls Overview', 14, finalY + 15);
    
    const pollData = polls.map(poll => {
      const totalVotes = poll.options ? poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0) : 0;
      return [
        poll.title || 'Untitled Poll', 
        totalVotes,
        poll.status || 'Active'
      ];
    });

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Poll Title', 'Total Votes', 'Status']],
      body: pollData,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] }, 
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    doc.save('Civix_Activity_Report.pdf');
  };

  return (
    <div className="space-y-10 pb-10">
      
      {/* --- HEADER & DOWNLOAD --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
            My Activity Report<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">
            See how your voice is making a difference
          </p>
        </div>
        
        <button 
          onClick={generatePDFReport}
          className="flex items-center gap-2 bg-white text-slate-900 border-2 border-slate-100 px-6 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all active:scale-95"
        >
          <Download size={18} className="text-indigo-600" />
          Download Summary
        </button>
      </div>

      {/* --- BIG STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <Heart size={24} fill="white" />
            </div>
            <h3 className="text-5xl font-black tracking-tighter mb-2">{totalSignatures}</h3>
            <p className="text-indigo-100/80 font-bold text-[11px] uppercase tracking-wider">Total Support Gathered</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
             <TrendingUp size={150} />
          </div>
        </motion.div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="text-4xl font-black text-slate-900 mb-1">{myPetitionsCount}</h4>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Petitions</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <h4 className="text-4xl font-black text-slate-900 mb-1">{myPollsCount}</h4>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Polls</p>
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart Card 1 */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-indigo-600 rounded-full" />
            Your Petitions Status
          </h3>
          
          <div className="w-full flex justify-center">
            {/* FIX: Removed ResponsiveContainer, hardcoded dimensions on PieChart directly */}
            <PieChart width={300} height={250}>
              <Pie
                data={petitionStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
              >
                {petitionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
            </PieChart>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {petitionStatusData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="text-xs font-black text-slate-400 uppercase mb-1">{item.name}</div>
                <div className="text-lg font-black text-slate-800">{item.value}%</div>
                <div className="h-1 w-8 bg-slate-100 rounded-full mx-auto mt-2 overflow-hidden">
                   <div className="h-full" style={{ width: '100%', background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Card 2 */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full" />
            How You Participated
          </h3>
          
          <div className="w-full flex justify-center">
            {/* FIX: Removed ResponsiveContainer, hardcoded dimensions on PieChart directly */}
            <PieChart width={300} height={250}>
              <Pie
                data={participationData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {participationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              />
            </PieChart>
          </div>

          <div className="flex justify-center gap-8 mt-6">
            {participationData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
                <span className="text-[11px] font-black text-slate-500 uppercase">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- RECENT ACHIEVEMENTS --- */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
               <MousePointer2 size={32} className="text-indigo-400" />
            </div>
            <div>
              <h4 className="text-2xl font-black">Community Hero!</h4>
              <p className="text-indigo-200/60 font-medium">You are in the top 5% of active citizens this month.</p>
            </div>
          </div>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            View Badges
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      </div>

    </div>
  );
};