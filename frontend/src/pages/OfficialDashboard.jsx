import React, { useState, useEffect } from 'react';
import { StatsCards } from '../components/OfficialDashboard/StatsCards';
import { ApprovalTable } from '../components/OfficialDashboard/ApprovalTable';
import { GrievanceList } from '../components/OfficialDashboard/GrievanceList';

const OfficialDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingOfficials, setPendingOfficials] = useState([]);

  // Fetch pending officials when the approvals tab is opened
  useEffect(() => {
    if (activeTab === 'approvals') {
      fetchPendingOfficials();
    }
  }, [activeTab]);

  const fetchPendingOfficials = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming you store the JWT here
      const response = await fetch("http://localhost:5000/api/officials/pending", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPendingOfficials(data);
      }
    } catch (error) {
      console.error("Failed to fetch officials", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/officials/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        // Remove the approved user from the pending list
        setPendingOfficials(pendingOfficials.filter(off => off._id !== id));
      }
    } catch (error) {
      console.error("Error approving official", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/officials/reject/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        // Remove the rejected user from the pending list
        setPendingOfficials(pendingOfficials.filter(off => off._id !== id));
      }
    } catch (error) {
      console.error("Error rejecting official", error);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full max-w-[1400px] mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-slate-100 font-sans mt-4">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-black/20 border-r border-white/10 p-6 flex flex-col z-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>CIV<span className="text-blue-400">IX</span></span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
              GOVT
            </span>
          </h2>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
          >
            <i className="bi bi-grid-1x2-fill mr-3 text-lg"></i> Overview
          </button>
          <button 
            onClick={() => setActiveTab('approvals')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'approvals' ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
          >
            <i className="bi bi-shield-check mr-3 text-lg"></i> Verification
          </button>
          <button 
            onClick={() => setActiveTab('grievances')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'grievances' ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
          >
            <i className="bi bi-chat-right-dots-fill mr-3 text-lg"></i> Complaints
          </button>
        </nav>

        <button className="flex items-center px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-all mt-auto">
          <i className="bi bi-box-arrow-left mr-3 text-lg"></i> Sign Out
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
        <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
              {activeTab === 'overview' ? 'Command Centre' : activeTab === 'approvals' ? 'Official Approvals' : 'Active Grievances'}
            </h1>
            <p className="text-blue-200 text-sm font-medium opacity-80">Ministry of Urban Development</p>
          </div>
          <div className="flex items-center gap-3 bg-black/20 p-2 pr-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Government Official</span>
              <span className="text-xs text-blue-300 opacity-80">Admin Role</span>
            </div>
          </div>
        </header>

        {/* CONTENT SWITCHER */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'overview' && <StatsCards />}
          {activeTab === 'approvals' && (
            <ApprovalTable 
              officials={pendingOfficials} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
          )}
          {activeTab === 'grievances' && <GrievanceList />}
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboard;