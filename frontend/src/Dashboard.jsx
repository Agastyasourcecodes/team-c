import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { usePetitions } from './PetitionContext';
import CreatePetition from './CreatePetition';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; background: #f0f2f7; }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 60px;
    background: #fff; border-bottom: 1px solid #e8eaf0;
    box-shadow: 0 1px 12px rgba(0,0,0,0.06);
  }
  .navbar-brand {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700; color: #111144;
    letter-spacing: -0.5px; cursor: pointer;
  }
  .navbar-links { display: flex; gap: 4px; }
  .navbar-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    color: #555; padding: 6px 16px; border-radius: 8px;
    transition: all 0.18s; position: relative;
  }
  .navbar-links button:hover { color: #111144; background: #f0f2f7; }
  .navbar-links button.active {
    color: #111144; font-weight: 600;
  }
  .navbar-links button.active::after {
    content: ''; position: absolute; bottom: -2px; left: 16px; right: 16px;
    height: 2px; background: #223382; border-radius: 2px;
  }
  .navbar-right { display: flex; align-items: center; gap: 16px; }
  .notif-btn {
    background: none; border: none; cursor: pointer;
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 18px; position: relative;
    transition: background 0.15s;
  }
  .notif-btn:hover { background: #f0f2f7; }
  .notif-dot {
    position: absolute; top: 4px; right: 4px;
    width: 8px; height: 8px; background: #e53e3e; border-radius: 50%;
    border: 1.5px solid #fff;
  }
  .avatar-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: #223382; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 15px; font-weight: 600;
  }

  /* ── Main layout ── */
  .main-content {
    margin-top: 60px; flex: 1; overflow-y: auto;
    padding: 28px 40px; background: #f0f2f7;
  }

  /* ── HOME PAGE ── */
  .home-grid {
    display: grid;
    grid-template-columns: 240px 1fr 240px;
    gap: 20px;
    align-items: start;
  }
  .left-col { display: flex; flex-direction: column; gap: 16px; }
  .card {
    background: #fff; border-radius: 14px;
    padding: 16px 18px; box-shadow: 0 2px 14px rgba(0,0,0,0.06);
  }
  .card h2 { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: #111144; margin-bottom: 4px; }
  .card p { font-size: 12.5px; color: #777; line-height: 1.4; }

  .location-row { display: flex; align-items: center; gap: 6px; margin: 10px 0 3px; color: #223382; font-size: 13px; font-weight: 500; }
  .location-row span { font-size: 14px; }
  .location-sub { font-size: 11.5px; color: #999; }
  .divider { height: 1px; background: #eee; margin: 10px 0; }

  .participation-summary h2 { font-family: 'Playfair Display', serif; font-size: 15px; color: #111144; margin-bottom: 12px; }
  .stat-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .stat-bar { width: 3px; height: 30px; border-radius: 4px; background: #223382; flex-shrink: 0; }
  .stat-bar.teal { background: #2a9d8f; }
  .stat-bar.indigo { background: #6c63ff; }
  .stat-num { font-size: 20px; font-weight: 700; color: #111144; line-height: 1; }
  .stat-label { font-size: 11.5px; color: #888; margin-top: 2px; }

  .petitions-col h2 { font-family: 'Playfair Display', serif; font-size: 22px; color: #111144; margin-bottom: 4px; }
  .petitions-col .sub { font-size: 13px; color: #888; margin-bottom: 20px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .view-all-btn { background: none; border: 1.5px solid #223382; color: #223382; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
  .view-all-btn:hover { background: #223382; color: #fff; }

  .petition-card-home {
    background: #fff; border-radius: 14px; padding: 20px 24px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.07); margin-bottom: 16px;
    border: 1px solid #eaecf2; transition: box-shadow 0.2s, transform 0.2s;
  }
  .petition-card-home:hover { box-shadow: 0 6px 28px rgba(34,51,130,0.13); transform: translateY(-2px); }
  .petition-card-home h3 { font-size: 15px; font-weight: 600; color: #111144; margin-bottom: 8px; }
  .petition-card-home p { font-size: 13px; color: #666; line-height: 1.55; margin-bottom: 12px; }
  .tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .tag {
    font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px;
    letter-spacing: 0.3px;
    text-transform: capitalize;
  }
  .tag-cat { background: #e8edff; color: #223382; }
  .tag-active { background: #d4f5ec; color: #1a7a65; }
  .tag-review { background: #fff3d4; color: #b97a00; }
  .tag-closed { background: #ffe8e8; color: #c0392b; }
  .petition-meta { display: flex; align-items: center; gap: 18px; margin-bottom: 14px; font-size: 12px; color: #888; }
  .petition-meta span { display: flex; align-items: center; gap: 4px; }
  .view-btn-card {
    background: #223382; color: #fff; border: none;
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: background 0.15s;
  }
  .view-btn-card:hover { background: #1a2760; }

  /* Right column */
  .engagement-card {
    background: linear-gradient(145deg, #223382, #111144);
    border-radius: 14px; padding: 18px 20px; color: #fff; margin-bottom: 16px;
    box-shadow: 0 6px 24px rgba(34,51,130,0.3);
  }
  .engagement-icon { font-size: 20px; margin-bottom: 10px; color: #6ee7b7; }
  .engagement-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
  .engagement-card p { font-size: 12px; color: rgba(255,255,255,0.75); margin-bottom: 10px; line-height: 1.4; }
  .engagement-pct { font-size: 28px; font-weight: 800; color: #6ee7b7; }
  .engagement-vs { font-size: 11px; color: rgba(255,255,255,0.6); margin-top: 2px; }

  .polls-side-card { background: #fff; border-radius: 14px; padding: 16px 18px; box-shadow: 0 2px 14px rgba(0,0,0,0.06); }
  .polls-side-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .polls-side-header h3 { font-size: 14px; font-weight: 700; color: #111144; }
  .view-all-sm { background: none; border: none; color: #223382; font-size: 12px; font-weight: 600; cursor: pointer; }
  .poll-mini { padding: 9px 0; border-bottom: 1px solid #f0f0f0; }
  .poll-mini:last-child { border-bottom: none; padding-bottom: 0; }
  .poll-mini h4 { font-size: 12.5px; font-weight: 500; color: #222; margin-bottom: 5px; line-height: 1.35; }
  .poll-mini-meta { display: flex; gap: 10px; font-size: 11px; color: #aaa; }
  .poll-mini-meta span { display: flex; align-items: center; gap: 4px; }

  /* ── PETITIONS PAGE ── */
  .petitions-layout { display: grid; grid-template-columns: 270px 1fr; gap: 28px; }
  .filter-panel { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); height: fit-content; }
  .filter-panel h2 { font-size: 16px; font-weight: 700; color: #111144; margin-bottom: 20px; }
  .filter-tab {
    display: block; width: 100%; padding: 10px 14px;
    background: none; border: none; text-align: left;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    color: #555; border-radius: 10px; cursor: pointer; transition: all 0.15s;
    margin-bottom: 4px;
  }
  .filter-tab:hover { background: #f0f2f7; color: #111144; }
  .filter-tab.active-tab { background: #223382; color: #fff; font-weight: 600; }
  .filter-divider { height: 1px; background: #eee; margin: 16px 0; }
  .filter-label { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .filter-select {
    width: 100%; padding: 9px 12px; border: 1.5px solid #e0e4ef;
    border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #333;
    background: #fafbff; outline: none; cursor: pointer; margin-bottom: 14px;
    appearance: none;
  }
  .filter-select:focus { border-color: #223382; }
  .create-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 12px; background: #2a9d8f; color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s;
    margin-top: 16px;
  }
  .create-btn:hover { background: #228880; }

  .petitions-list h1 { font-family: 'Playfair Display', serif; font-size: 28px; color: #111144; margin-bottom: 4px; }
  .petitions-count { font-size: 13px; color: #888; margin-bottom: 20px; }
  .petition-card-list {
    background: #fff; border-radius: 14px; padding: 22px 26px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.06); margin-bottom: 16px;
    border: 1px solid #eaecf2; display: flex; align-items: flex-start;
    justify-content: space-between; gap: 20px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .petition-card-list:hover { box-shadow: 0 6px 28px rgba(34,51,130,0.12); transform: translateY(-2px); }
  .petition-card-list h3 { font-size: 16px; font-weight: 700; color: #111144; margin-bottom: 8px; }
  .petition-card-list p { font-size: 13px; color: #666; line-height: 1.55; margin-bottom: 12px; }
  .petition-list-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #888; }
  .petition-list-meta span { display: flex; align-items: center; gap: 4px; }

  /* ── POLLS PAGE ── */
  .polls-page, .reports-page {
    width: 90vw !important;
    max-width: 1600px !important;
    margin: 0 auto !important;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
  }
  .polls-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .polls-header h1 { font-family: 'Playfair Display', serif; font-size: 28px; color: #111144; }
  .polls-header p { font-size: 13px; color: #888; margin-top: 4px; }
  .polls-tabs { display: flex; gap: 0; margin-bottom: 20px; border-bottom: 2px solid #eee; }
  .poll-tab {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    color: #888; padding: 10px 20px; position: relative; transition: color 0.15s;
  }
  .poll-tab.active { color: #111144; font-weight: 700; }
  .poll-tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #223382; }
  .poll-card {
    background: #fff; border-radius: 14px; padding: 20px 26px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.06); margin-bottom: 14px;
    border: 1px solid #eaecf2; display: flex; align-items: center;
    justify-content: space-between; gap: 20px; width: 100%;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .poll-card:hover { box-shadow: 0 6px 28px rgba(34,51,130,0.12); transform: translateY(-2px); }
  .poll-card h3 { font-size: 15px; font-weight: 600; color: #111144; margin-bottom: 10px; }
  .poll-card-meta { display: flex; gap: 16px; font-size: 12px; color: #888; }
  .poll-card-meta span { display: flex; align-items: center; gap: 4px; }
  .vote-btn {
    background: #223382; color: #fff; border: none;
    padding: 10px 22px; border-radius: 9px; font-size: 13px; font-weight: 600;
    cursor: pointer; white-space: nowrap; transition: background 0.15s;
  }
  .vote-btn:hover { background: #1a2760; }
  .results-btn {
    background: #fff; color: #223382; border: 1.5px solid #223382;
    padding: 10px 22px; border-radius: 9px; font-size: 13px; font-weight: 600;
    cursor: pointer; white-space: nowrap; transition: all 0.15s;
  }
  .results-btn:hover { background: #223382; color: #fff; }
  .poll-tags { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }

  /* ── REPORTS PAGE ── */
  .reports-page { width: 100%; }
  .reports-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .reports-header h1 { font-family: 'Playfair Display', serif; font-size: 28px; color: #111144; }
  .reports-header p { font-size: 13px; color: #888; margin-top: 4px; }
  .download-btn {
    display: flex; align-items: center; gap: 8px;
    background: #2a9d8f; color: #fff; border: none;
    padding: 11px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.15s;
  }
  .download-btn:hover { background: #228880; }
  .stat-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
  .stat-big-card {
    background: #fff; border-radius: 14px; padding: 24px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.06); border: 1px solid #eaecf2;
  }
  .stat-big-icon { font-size: 22px; color: #223382; margin-bottom: 14px; }
  .stat-big-num { font-size: 36px; font-weight: 800; color: #111144; }
  .stat-big-label { font-size: 13px; color: #888; margin-top: 4px; }
  .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .chart-card { background: #fff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 14px rgba(0,0,0,0.06); }
  .chart-card h3 { font-size: 16px; font-weight: 700; color: #111144; margin-bottom: 20px; }
  .pie-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    background: #111144; color: #fff; padding: 14px 20px;
    border-radius: 12px; font-size: 14px; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  /* Scroll */
  .main-content::-webkit-scrollbar { width: 6px; }
  .main-content::-webkit-scrollbar-track { background: transparent; }
  .main-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
`;

// Hardcoded polls keep until you make a poll backend
const polls = [
  { id: 1, title: "Should the city allocate additional funds for parks maintenance?", location: "Citywide", votes: "3,421", ends: "February 20, 2026", status: "Active", voted: false },
  { id: 2, title: "Preferred approach for downtown parking management", location: "Downtown District", votes: "1,876", ends: "February 18, 2026", status: "Active", voted: true },
  { id: 3, title: "New zoning policy for mixed-use developments", location: "North Ward", votes: "2,210", ends: "February 25, 2026", status: "Active", voted: false },
  { id: 4, title: "Bike lane expansion on major thoroughfares", location: "Citywide", votes: "987", ends: "January 31, 2026", status: "Closed", voted: true },
];

// Re-added the hardcoded chart data for Reports tab
const petitionPieData = [
  { name: "Active", value: 45, color: "#2a9d8f" },
  { name: "Under Review", value: 28, color: "#F98513" },
  { name: "Approved", value: 17, color: "#223382" },
  { name: "Closed", value: 10, color: "#9ca3af" },
];

const pollPieData = [
  { name: "Voted", value: 70, color: "#223382" },
  { name: "Not Voted", value: 30, color: "#2a9d8f" },
];

function statusTag(status) {
  const formattedStatus = status ? status.replace('_', ' ') : 'active';
  const map = { active: "tag-active", "under review": "tag-review", closed: "tag-closed" };
  return <span className={`tag ${map[formattedStatus] || "tag-active"}`}>{formattedStatus}</span>;
}

export default function CivixDashboard() {
  const navigate = useNavigate();
  
  // 👉 PETITIONS ARE NOW ONLY COMING FROM YOUR BACKEND HERE:
  const { petitions, fetchPetitions, signExistingPetition } = usePetitions();
  
  const [page, setPage] = useState("Home");
  const [pollTab, setPollTab] = useState("Active");
  const [petitionFilter, setPetitionFilter] = useState("All Petitions");
  const [toast, setToast] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token) {
      navigate('/');
      return;
    }
    
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch REAL petitions from backend
    fetchPetitions();
    // eslint-disable-next-line
  }, [navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSignPetition = async (id) => {
    const result = await signExistingPetition(id);
    if (result.success) {
      showToast("✅ Successfully signed the petition!");
    } else {
      showToast("❌ " + (result.error || "Failed to sign petition"));
    }
  };

  const navItems = ["Home", "Petitions", "Polls", "Reports"];

  // Filter actual petitions from DB
  const filteredPetitions = petitions.filter(p => {
    if (petitionFilter === "All Petitions") return true;
    if (petitionFilter === "My Petitions") return p.creator === user?._id;
    return true; 
  });

  const filteredPolls = polls.filter(p => {
    if (pollTab === "Active") return p.status === "Active";
    if (pollTab === "Voted") return p.voted;
    if (pollTab === "My Polls") return p.id === 2;
    if (pollTab === "Closed") return p.status === "Closed";
    return true;
  });

  return (
    <>
      <style>{style}</style>

      {toast && <div className="toast">{toast}</div>}

      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand" onClick={() => setPage("Home")}>CIVIX</div>
          <div className="navbar-links">
            {navItems.map(n => (
              <button key={n} className={page === n ? "active" : ""} onClick={() => setPage(n)}>{n}</button>
            ))}
          </div>
          <div className="navbar-right">
            <button className="notif-btn" onClick={() => showToast("📣 2 new notifications")}>
              🔔<span className="notif-dot" />
            </button>
            <button className="avatar-btn" onClick={handleLogout} title="Logout">
              {user && user.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </button>
          </div>
        </nav>

        <div className="main-content">

          {/* ── HOME ── */}
          {page === "Home" && (
            <div className="home-grid">
              <div className="left-col">
                <div className="card">
                  <h2>Hello, {user && user.name ? user.name : "Citizen"}</h2>
                  <p>Here's what's happening in your locality</p>
                  <div className="divider" />
                  <div className="location-row"><span>📍</span>Downtown District</div>
                  <div className="location-sub">Showing petitions and polls relevant to your area</div>
                </div>
                
                {/* RESTORED PARTICIPATION SUMMARY */}
                <div className="card participation-summary">
                  <h2>Participation Summary</h2>
                  <div className="stat-row">
                    <div className="stat-bar" />
                    <div><div className="stat-num">{petitions.filter(p => p.creator === user?._id).length}</div><div className="stat-label">Petitions Created</div></div>
                  </div>
                  <div className="stat-row">
                    <div className="stat-bar teal" />
                    {/* Hardcoded 12 for UI visualization, you can connect this to backend later */}
                    <div><div className="stat-num">12</div><div className="stat-label">Petitions Signed</div></div>
                  </div>
                  {/* Restored Polls Voted row */}
                  <div className="stat-row">
                    <div className="stat-bar indigo" />
                    <div><div className="stat-num">8</div><div className="stat-label">Polls Voted</div></div>
                  </div>
                </div>
              </div>

              <div className="petitions-col">
                <div className="section-header">
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#111144" }}>Petitions Near You</h2>
                  </div>
                  <button className="view-all-btn" onClick={() => setPage("Petitions")}>View All Petitions</button>
                </div>

                {petitions.slice(0, 3).map(p => (
                  <div className="petition-card-home" key={p._id}>
                    <h3>{p.title}</h3>
                    <div className="tags">
                      <span className="tag tag-cat">{p.category}</span>
                      {statusTag(p.status)}
                    </div>
                    <p>{p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description}</p>
                    <div className="petition-meta">
                      <span>📄 {p.signatureCount} / {p.signatureGoal} signatures</span>
                      <span>📍 {p.location}</span>
                    </div>
                    <button className="view-btn-card" onClick={() => handleSignPetition(p._id)}>Sign Petition</button>
                  </div>
                ))}
                {petitions.length === 0 && <p style={{color: '#888'}}>No petitions available yet. Create one!</p>}
              </div>

              <div className="left-col">
                <div className="engagement-card">
                  <div className="engagement-icon">📈</div>
                  <h3>Active Engagement</h3>
                  <p>Your community has signed {petitions.reduce((acc, curr) => acc + curr.signatureCount, 0)} petitions</p>
                </div>

                <div className="polls-side-card">
                  <div className="polls-side-header">
                    <h3>Recent Polls</h3>
                    <button className="view-all-sm" onClick={() => setPage("Polls")}>View All</button>
                  </div>
                  {polls.slice(0, 3).map(p => (
                    <div className="poll-mini" key={p.id}>
                      <h4>{p.title}</h4>
                      <div className="poll-mini-meta">
                        <span>📍 {p.location}</span>
                        <span>📊 {p.votes} votes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PETITIONS ── */}
          {page === "Petitions" && (
            <div className="petitions-layout">
              <div className="filter-panel">
                <h2>Filter Petitions</h2>
                {["All Petitions", "My Petitions", "Signed by Me"].map(f => (
                  <button key={f} className={`filter-tab ${petitionFilter === f ? "active-tab" : ""}`} onClick={() => setPetitionFilter(f)}>{f}</button>
                ))}
                <div className="filter-divider" />
                <button className="create-btn" onClick={() => setShowCreateModal(true)}>＋ Create New Petition</button>
              </div>

              <div className="petitions-list">
                <h1>Browse Petitions</h1>
                <div className="petitions-count">{filteredPetitions.length} petitions found</div>
                
                {filteredPetitions.map(p => (
                  <div className="petition-card-list" key={p._id}>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="petition-list-meta">
                        <span>Category: <span className="tag tag-cat" style={{ marginLeft: 4 }}>{p.category}</span></span>
                        <span>📍 {p.location}</span>
                        {statusTag(p.status)}
                        <span>📄 {p.signatureCount} / {p.signatureGoal} signatures</span>
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <button className="view-btn-card" onClick={() => handleSignPetition(p._id)}>Sign Petition</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── POLLS ── */}
          {page === "Polls" && (
            <div className="polls-page">
              <div className="polls-header">
                <div>
                  <h1>Public Polls</h1>
                  <p>Share your opinion on local governance matters</p>
                </div>
                <button className="create-btn" style={{ width: "auto", marginTop: 0 }} onClick={() => showToast("📊 Create Poll form opening...")}>＋ Create Poll</button>
              </div>

              <div className="polls-tabs">
                {["Active", "Voted", "My Polls", "Closed"].map(t => (
                  <button key={t} className={`poll-tab ${pollTab === t ? "active" : ""}`} onClick={() => setPollTab(t)}>{t}</button>
                ))}
              </div>

              {filteredPolls.length === 0 && <div style={{ color: "#888", fontSize: 14, padding: "20px 0" }}>No polls in this category.</div>}
              {filteredPolls.map(p => (
                <div className="poll-card" key={p.id}>
                  <div>
                    <div className="poll-tags">
                      <span className="tag tag-active">Active</span>
                      {p.voted && <span className="tag" style={{ background: "#e8edff", color: "#223382" }}>You Voted</span>}
                    </div>
                    <h3>{p.title}</h3>
                    <div className="poll-card-meta">
                      <span>📍 {p.location}</span>
                      <span>📊 {p.votes} votes</span>
                      <span>📅 Ends {p.ends}</span>
                    </div>
                  </div>
                  {p.voted
                    ? <button className="results-btn" onClick={() => showToast(`📊 Viewing results for: ${p.title}`)}>View Results</button>
                    : <button className="vote-btn" onClick={() => showToast(`✅ Vote recorded for: ${p.title}`)}>Vote Now</button>
                  }
                </div>
              ))}
            </div>
          )}

          {/* ── FULLY RESTORED REPORTS PAGE ── */}
          {page === "Reports" && (
            <div className="reports-page">
              <div className="reports-header">
                <div>
                  <h1>My Participation Report</h1>
                  <p>Summary of petitions and polls you have participated in</p>
                </div>
                <button className="download-btn" onClick={() => showToast("⬇️ Downloading report summary...")}>⬇ Download Summary</button>
              </div>

              <div className="stat-cards-row">
                {[
                  { icon: "📄", num: 7, label: "Petitions Participated" },
                  { icon: "📊", num: 5, label: "Polls Voted In" },
                  { icon: "💬", num: 3, label: "Official Responses Received" },
                ].map(s => (
                  <div className="stat-big-card" key={s.label}>
                    <div className="stat-big-icon">{s.icon}</div>
                    <div className="stat-big-num">{s.num}</div>
                    <div className="stat-big-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="charts-row">
                <div className="chart-card">
                  <h3>Status of Your Petitions</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={petitionPieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${value}%`}>
                        {petitionPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-legend">
                    {petitionPieData.map(e => (
                      <div className="legend-item" key={e.name}>
                        <div className="legend-dot" style={{ background: e.color }} />
                        {e.name} — {e.value}%
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <h3>Your Poll Participation Overview</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pollPieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${value}%`}>
                        {pollPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-legend">
                    {pollPieData.map(e => (
                      <div className="legend-item" key={e.name}>
                        <div className="legend-dot" style={{ background: e.color }} />
                        {e.name} — {e.value}%
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* ── MODAL MOUNTED HERE ── */}
      {showCreateModal && (
        <CreatePetition onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}