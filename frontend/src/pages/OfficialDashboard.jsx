import React, { useState } from 'react';
import { StatsCards } from '../components/OfficialDashboard/StatsCards';
import { ApprovalTable } from '../components/OfficialDashboard/ApprovalTable';
import { GrievanceList } from '../components/OfficialDashboard/GrievanceList';

const OfficialDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const pendingOfficials = [
    { id: 1, name: 'Rahul Chaudhary', empId: 'GOV-IND-992', email: 'rahul@civix.gov' },
    { id: 2, name: 'Priya Mehra', empId: 'GOV-IND-401', email: 'priya@civix.gov' }
  ];

  return (
    <div className="flex h-screen w-full bg-slate-950/60 backdrop-blur-md overflow-hidden text-white font-sans">
      {/* SIDEBAR */}
      <div className="w-72 bg-black/60 backdrop-blur-3xl border-r border-white/10 p-8 flex flex-col shadow-2xl">
        <h2 className="text-2xl font-black tracking-tighter italic mb-12">
          CIV<span className="text-blue-500">IX</span> <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md align-middle ml-2 not-italic">GOVT</span>
        </h2>
        
        <nav className="space-y-4 flex-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'overview' ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="bi bi-grid-1x2-fill mr-3"></i> Overview
          </button>
          <button onClick={() => setActiveTab('approvals')} className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'approvals' ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="bi bi-shield-check mr-3"></i> Verification
          </button>
          <button onClick={() => setActiveTab('grievances')} className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'grievances' ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="bi bi-chat-right-dots-fill mr-3"></i> Complaints
          </button>
        </nav>

        <button className="text-left px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all mt-auto border border-red-500/20">
          <i className="bi bi-box-arrow-left mr-3"></i> Sign Out
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-gradient-to-br from-blue-900/5 to-transparent">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">
              {activeTab === 'overview' ? 'Command Centre' : activeTab === 'approvals' ? 'Official Approvals' : 'Active Grievances'}
            </h1>
            <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.4em] opacity-70">Ministry of Urban Development</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-full border border-white/10 shadow-inner hover:bg-white/10 transition-all cursor-pointer">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center font-black">A</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest">Government Official</span>
              <span className="text-[9px] text-blue-400 font-bold uppercase"></span>
            </div>
          </div>
        </header>

        {/* CONTENT SWITCHER */}
        <div className="max-w-6xl">
          {activeTab === 'overview' && <StatsCards />}
          {activeTab === 'approvals' && <ApprovalTable officials={pendingOfficials} />}
          {activeTab === 'grievances' && <GrievanceList />}
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboard;