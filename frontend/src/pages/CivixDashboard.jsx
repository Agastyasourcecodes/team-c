import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePetitions } from '../context/PetitionContext';

// Modular Components
import { DashboardNav } from "../components/Citizen/DashboardNav";
import { HomeView } from "../components/Citizen/HomeView";
import { PetitionList } from "../components/Citizen/PetitionList";
import Polls from "../components/Citizen/Polls";
import { ReportsView } from "../components/Citizen/ReportsView";
import { EditPetitionModal } from "../components/Citizen/EditPetitionModal";
import CreatePetition from '../components/Citizen/CreatePetition';

export default function CivixDashboard() {
    const navigate = useNavigate();
    const { petitions, fetchPetitions, signExistingPetition, deleteExistingPetition, editExistingPetition } = usePetitions();

    // UI States
    const [page, setPage] = useState("Home");
    const [toast, setToast] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingPetition, setEditingPetition] = useState(null);
    const [user, setUser] = useState(null);

    // Filter States
    const [petitionFilter, setPetitionFilter] = useState("All Petitions");
    const [pollTab, setPollTab] = useState("Active");

    const showToast = useCallback((msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token) {
            navigate('/');
            return;
        }

        if (storedUser) setUser(JSON.parse(storedUser));
        fetchPetitions();
    }, [navigate]);

    // Mock Polls Logic
    const polls = [
        { id: 1, title: "Should the city allocate funds for parks?", location: "Citywide", votes: "3,421", ends: "March 20, 2026", status: "Active", voted: false },
        { id: 2, title: "Downtown parking management", location: "Downtown", votes: "1,876", ends: "March 18, 2026", status: "Active", voted: true },
        { id: 3, title: "Public Wi-Fi expansion in Market area", location: "Market Dist", votes: "945", ends: "Jan 10, 2026", status: "Closed", voted: true },
    ];

    const filteredPolls = polls.filter(p => {
        if (pollTab === "Active") return p.status === "Active";
        if (pollTab === "Voted") return p.voted;
        if (pollTab === "Closed") return p.status === "Closed";
        if (pollTab === "My Polls") return p.id === 2; 
        return true;
    });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    // --- CRITICAL FIX: Filtering Logic for PetitionList ---
    const getFilteredPetitions = () => {
        const currentUserId = user?._id?.toString() || user?.id?.toString();
        
        return (petitions || []).filter(p => {
            if (petitionFilter === "All Petitions") return true;
            
            if (petitionFilter === "My Petitions") {
                const creatorId = (p.creator?._id || p.creator)?.toString();
                return creatorId === currentUserId;
            }
            
            if (petitionFilter === "Signed by Me") {
                const voterList = p.voters || [];
                return voterList.some(v => (v._id || v).toString() === currentUserId);
            }
            
            return true;
        });
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] bg-[radial-gradient(at_top_right,_#EEF2FF,_#F1F5F9)] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-600">
            <DashboardNav
                user={user}
                page={page}
                setPage={setPage}
                handleLogout={handleLogout}
                showToast={showToast}
            />

            <main className="pt-28 pb-20 px-4 md:px-10 max-w-[1500px] mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {page === "Home" && (
                            <HomeView
                                user={user}
                                petitions={petitions}
                                onSign={signExistingPetition}
                                onToast={showToast}
                                setPage={setPage}
                                onEdit={setEditingPetition}
                                onDelete={deleteExistingPetition}
                            />
                        )}

                        {page === "Petitions" && (
                            <PetitionList
                                // Pass the FILTERED list here
                                petitions={getFilteredPetitions()} 
                                user={user}
                                onSign={signExistingPetition}
                                onDelete={deleteExistingPetition}
                                onEdit={setEditingPetition}
                                onToast={showToast}
                                onCreateClick={() => setShowCreateModal(true)}
                                petitionFilter={petitionFilter}
                                setPetitionFilter={setPetitionFilter}
                            />
                        )}

                        {page === "Polls" && (
                            <Polls
                                pollTab={pollTab}
                                setPollTab={setPollTab}
                                filteredPolls={filteredPolls}
                                showToast={showToast}
                            />
                        )}

                        {page === "Reports" && (
                            <ReportsView
                                petitions={petitions}
                                user={user}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Overlays & Modals */}
            <AnimatePresence>
                {showCreateModal && (
                    <CreatePetition
                        onClose={() => setShowCreateModal(false)}
                        onToast={showToast}
                    />
                )}

                {editingPetition && (
                    <EditPetitionModal
                        petition={editingPetition}
                        onClose={() => setEditingPetition(null)}
                        onUpdate={editExistingPetition}
                        onToast={showToast}
                    />
                )}

                {toast && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, x: "-50%" }}
                        animate={{ y: 0, opacity: 1, x: "-50%" }}
                        exit={{ y: 50, opacity: 0, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 z-[5000] px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/10"
                    >
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}