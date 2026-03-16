import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Home, 
  MessageSquare, 
  ChevronDown, 
  Settings,
  Menu,
  X 
} from 'lucide-react';

export const DashboardNav = ({ user, page, setPage, handleLogout, showToast }) => {
  const navigate = useNavigate(); // Navigation hook for routing
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "Home", icon: <Home size={18} /> },
    { id: "Petitions", icon: <LayoutDashboard size={18} /> },
    { id: "Polls", icon: <MessageSquare size={18} /> },
    { id: "Reports", icon: <FileText size={18} /> }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* --- 1. LOGO SECTION (Direct to Landing Page) --- */}
        <div className="flex items-center gap-10">
          <div 
            className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tighter flex items-center gap-2 group transition-all" 
            onClick={() => navigate("/")} // Redirects to Landing Page
          >
            <span className="logo">CIVIX</span>
            
          </div>

          {/* --- 2. DESKTOP NAVIGATION --- */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2.5 text-sm font-bold transition-all px-3 py-2 rounded-xl ${
                  page === item.id 
                  ? 'text-indigo-600 bg-indigo-50/50 shadow-sm shadow-indigo-100/20' 
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. RIGHT ACTIONS --- */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Notifications Button */}
          <button 
            onClick={() => showToast?.("📣 2 new notifications")}
            className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-xl transition-all relative group"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 border-2 border-white rounded-full group-hover:animate-ping"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-1 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="h-9 w-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100 uppercase">
                {user?.name ? user.name.charAt(0) : 'C'}
              </div>
              <ChevronDown size={14} className={`text-slate-400 mr-2 transition-transform hidden sm:block ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-60 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-[1100]"
                >
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Citizen Portal</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{user?.name || "Member"}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Account</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                    <Settings size={18} className="text-indigo-500" /> My Profile
                  </button>
                  
                  <button 
                    onClick={async () => {
                      try {
                        setShowProfileDropdown(false); 
                        showToast?.("👋 Signing out safely...");
                        await handleLogout();
                      } catch (err) {
                        showToast?.("❌ Logout failed. Please try again.");
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                  >
                    <div className="p-1.5 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <LogOut size={16} />
                    </div>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
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
                  onClick={() => { setPage(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                    page === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {item.icon} {item.id}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};