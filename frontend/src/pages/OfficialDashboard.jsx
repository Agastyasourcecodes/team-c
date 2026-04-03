import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  UserCheck, 
  MessageSquareWarning, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronDown,
  Search,
  Settings
} from 'lucide-react';

// Backend logic components
import { StatsCards } from '../components/Official/StatsCards';
import { ApprovalTable } from '../components/Official/ApprovalTable';
import { GrievanceList } from '../components/Official/GrievanceList';
import { fetchPetitions } from '../api'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const OfficialDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingOfficials, setPendingOfficials] = useState([]);
  const [petitions, setPetitions] = useState([]); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    if (activeTab === 'approvals') fetchPendingOfficials();
    else if (activeTab === 'grievances') loadPetitions();
  }, [activeTab]);

  // --- API LOGIC FUNCTIONS ---
  const fetchPendingOfficials = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`${API_URL}/officials/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setPendingOfficials(data);
    } catch (error) {
      console.error("Failed to fetch officials", error);
    }
  };

  const loadPetitions = async () => {
    try {
      const { data } = await fetchPetitions();
      setPetitions(data);
    } catch (error) {
      console.error("Failed to load petitions", error);
    }
  };

  // NEW: Handle Status Update
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/petitions/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Optimistically update the UI
        setPetitions(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
      } else {
        const errorData = await response.json();
        alert(`Failed to update status: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/officials/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setPendingOfficials(pendingOfficials.filter(off => off._id !== id));
      }
    } catch (error) {
      console.error("Error approving official", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/officials/reject/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setPendingOfficials(pendingOfficials.filter(off => off._id !== id));
      }
    } catch (error) {
      console.error("Error rejecting official", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); 
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'approvals', label: 'Verifications', icon: <UserCheck size={18} /> },
    { id: 'grievances', label: 'Complaints', icon: <MessageSquareWarning size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-indigo-100">
      
      {/* --- REFINED NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-10">
            {/* Logo consistent with Global Header */}
            <div 
              className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tighter flex items-center gap-2" 
              onClick={() => navigate("/")}
            >
              CIVIX
              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100 uppercase tracking-widest font-black">
                Official
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 text-sm font-bold transition-all px-2 py-1.5 rounded-lg ${
                    activeTab === item.id 
                    ? 'text-indigo-600 bg-indigo-50/50' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
          
            {/* Notifications */}
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 border-2 border-white rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-1 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="h-9 w-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100">
                  A
                </div>
                <ChevronDown size={14} className={`text-slate-400 mr-2 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-[1100]"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Access</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">administrator@civix.gov</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                      <Settings size={18} className="text-indigo-500" /> Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2.5 bg-slate-100 text-slate-600 rounded-xl"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE NAV MENU --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-32 pb-20 max-w-[1500px] mx-auto px-6 md:px-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Live Governance Control
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {activeTab === 'overview' ? 'Command Centre' : activeTab === 'approvals' ? 'Identity Verifications' : 'Active Grievances'}
            </h1>
          </div>
          
          <div className="relative group sm:hidden">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input type="text" placeholder="Quick search..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:border-indigo-200" />
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && <StatsCards />}
          
          <div className="mt-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm shadow-indigo-100/20 overflow-hidden min-h-[500px]">
            {activeTab === 'approvals' && (
              <ApprovalTable 
                officials={pendingOfficials} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            )}
            {activeTab === 'grievances' && (
               <div className="p-2">
                 {/* PASS DOWN THE UPDATER FUNCTION */}
                 <GrievanceList grievances={petitions} onUpdateStatus={handleUpdateStatus} />
               </div>
            )}
            
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OfficialDashboard;