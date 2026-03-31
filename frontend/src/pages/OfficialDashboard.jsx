// frontend/src/pages/OfficialDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageSquare,
  Send,
  Eye,
  ThumbsUp,
  AlertCircle,
  Search,
  Filter,
  ArrowLeft
} from "lucide-react";

export default function OfficialDashboard() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  
  const [petitions, setPetitions] = useState([]);
  const [filteredPetitions, setFilteredPetitions] = useState([]);
  const [selectedPetition, setSelectedPetition] = useState(null);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  });

  // Get official user data
  const [official, setOfficial] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (!token) {
      navigate("/official-login");
      return;
    }
    
    if (user) {
      setOfficial(JSON.parse(user));
    }
    
    fetchPetitions();
  }, []);

  const fetchPetitions = async () => {
    try {
      showLoader("Loading petitions...");
      
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/petitions", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPetitions(data);
        setFilteredPetitions(data);
        calculateStats(data);
      } else {
        console.error("Failed to fetch petitions:", data.message);
        // Mock data for demo
        const mockPetitions = getMockPetitions();
        setPetitions(mockPetitions);
        setFilteredPetitions(mockPetitions);
        calculateStats(mockPetitions);
      }
    } catch (error) {
      console.error("Error fetching petitions:", error);
      // Mock data for demo
      const mockPetitions = getMockPetitions();
      setPetitions(mockPetitions);
      setFilteredPetitions(mockPetitions);
      calculateStats(mockPetitions);
    } finally {
      hideLoader();
    }
  };

  const calculateStats = (petitionsList) => {
    const total = petitionsList.length;
    const pending = petitionsList.filter(p => p.status === "pending").length;
    const inProgress = petitionsList.filter(p => p.status === "in-progress").length;
    const resolved = petitionsList.filter(p => p.status === "resolved").length;
    const rejected = petitionsList.filter(p => p.status === "rejected").length;
    
    setStats({ total, pending, inProgress, resolved, rejected });
  };

  const handleRespond = async () => {
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }
    
    try {
      showLoader("Submitting response...");
      
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/petitions/${selectedPetition._id}/respond`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          officialResponse: response,
          status: status || "in-progress",
          respondedBy: official?.name || "Official",
          respondedAt: new Date()
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Response submitted successfully!");
        setSelectedPetition(null);
        setResponse("");
        setStatus("");
        fetchPetitions(); // Refresh the list
      } else {
        alert(data.message || "Failed to submit response");
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("Error submitting response. Please try again.");
    } finally {
      hideLoader();
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterPetitions(term, filterStatus);
  };

  const handleFilter = (statusFilter) => {
    setFilterStatus(statusFilter);
    filterPetitions(searchTerm, statusFilter);
  };

  const filterPetitions = (term, statusFilter) => {
    let filtered = [...petitions];
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(term.toLowerCase()) ||
        p.description?.toLowerCase().includes(term.toLowerCase()) ||
        p.location?.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredPetitions(filtered);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case "in-progress":
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1"><MessageSquare size={12} /> In Progress</span>;
      case "resolved":
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle size={12} /> Resolved</span>;
      case "rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle size={12} /> Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Mock data for demo
  const getMockPetitions = () => {
    return [
      {
        _id: "1",
        title: "Fix the Downtown Roads",
        description: "The roads in downtown are full of potholes and need immediate repair. This is causing accidents and vehicle damage.",
        location: "Muzaffarnagar, UP",
        signatures: 342,
        goal: 500,
        status: "pending",
        createdAt: new Date("2024-03-01"),
        createdBy: { name: "Rajesh Kumar", email: "rajesh@example.com" }
      },
      {
        _id: "2",
        title: "Improve Public Transport in Delhi",
        description: "We need better and more frequent bus services during peak hours. Current wait times are 30+ minutes.",
        location: "Delhi",
        signatures: 678,
        goal: 999,
        status: "in-progress",
        createdAt: new Date("2024-02-15"),
        createdBy: { name: "Priya Sharma", email: "priya@example.com" },
        officialResponse: "We have submitted a proposal to increase bus frequency. Awaiting budget approval."
      },
      {
        _id: "3",
        title: "New Park for Community",
        description: "Our locality needs a park for children and elderly. There is no open space for recreation.",
        location: "Noida, UP",
        signatures: 892,
        goal: 1000,
        status: "resolved",
        createdAt: new Date("2024-01-10"),
        createdBy: { name: "Amit Verma", email: "amit@example.com" },
        officialResponse: "Park construction approved. Work will start next month."
      }
    ];
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            CIVIX
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 font-medium">Official Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            Welcome, <span className="font-semibold">{official?.name || "Official"}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Petitions</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <FileText className="text-indigo-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <MessageSquare className="text-blue-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by title, description or location..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter("pending")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === "pending" ? "bg-yellow-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                Pending
              </button>
              <button
                onClick={() => handleFilter("in-progress")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === "in-progress" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleFilter("resolved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === "resolved" ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Petitions List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredPetitions.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-100">
              <AlertCircle className="mx-auto text-slate-400 mb-3" size={48} />
              <p className="text-slate-500">No petitions found</p>
            </div>
          ) : (
            filteredPetitions.map((petition) => (
              <div key={petition._id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-800">{petition.title}</h3>
                      {getStatusBadge(petition.status)}
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{petition.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>📍 {petition.location}</span>
                      <span>📅 {new Date(petition.createdAt).toLocaleDateString()}</span>
                      <span>👤 By: {petition.createdBy?.name || "Citizen"}</span>
                      <span>✍️ {petition.signatures || 0} / {petition.goal || 500} signatures</span>
                    </div>
                    {petition.officialResponse && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-600 font-semibold mb-1">📝 Official Response:</p>
                        <p className="text-sm text-slate-700">{petition.officialResponse}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <button
                      onClick={() => setSelectedPetition(petition)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16} /> Respond
                    </button>
                    <button
                      onClick={() => setSelectedPetition(petition)}
                      className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                    >
                      <Eye size={16} /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Response Modal */}
      {selectedPetition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Respond to Petition</h2>
                <button
                  onClick={() => setSelectedPetition(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition"
                >
                  <XCircle size={24} className="text-slate-400" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">{selectedPetition.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{selectedPetition.description}</p>
                <p className="text-xs text-slate-500">From: {selectedPetition.location}</p>
                <p className="text-xs text-slate-500">Signatures: {selectedPetition.signatures || 0} / {selectedPetition.goal || 500}</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending Review</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Official Response</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={5}
                  placeholder="Write your response here..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleRespond}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Submit Response
                </button>
                <button
                  onClick={() => setSelectedPetition(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}