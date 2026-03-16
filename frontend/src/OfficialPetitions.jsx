import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/OfficialPetitions.css";

const mockPetitions = [
  { id: 1, title: "Improve Public Transportation Infrastructure", desc: "Requesting expansion of metro lines to underserved neighborhoods and increased bus frequency during peak hours to accommodate growing commuter needs.", category: "Infrastructure", location: "Downtown District", status: "active", signatureCount: 1247 },
  { id: 2, title: "Establish Community Recreation Centers", desc: "Proposal to build modern recreation facilities with sports courts, libraries, and community meeting spaces to promote healthy living and social interaction.", category: "Community", location: "North Ward", status: "under_review", signatureCount: 892 },
  { id: 3, title: "Install Solar-Powered Street Lighting", desc: "Replace aging streetlights with energy-efficient solar panels to reduce electricity costs and improve road safety at night.", category: "Environment", location: "East District", status: "active", signatureCount: 2103 },
  { id: 4, title: "Affordable Housing Development Plan", desc: "Proposal to allocate 15 acres of city-owned land for affordable housing units for low-income families.", category: "Housing", location: "South Ward", status: "closed", signatureCount: 4521 },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f0f2f7; }
  .app { display: flex; height: 100vh; overflow: hidden; }
  .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; height: 60px; background: #fff; border-bottom: 1px solid #e8eaf0; box-shadow: 0 1px 12px rgba(0,0,0,0.06); }
  .navbar-brand { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #111144; letter-spacing: -0.5px; cursor: pointer; }
  .navbar-links { display: flex; gap: 4px; }
  .navbar-links button { background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #555; padding: 6px 16px; border-radius: 8px; transition: all 0.18s; position: relative; }
  .navbar-links button:hover { color: #111144; background: #f0f2f7; }
  .navbar-links button.active { color: #111144; font-weight: 600; }
  .navbar-links button.active::after { content: ''; position: absolute; bottom: -2px; left: 16px; right: 16px; height: 2px; background: #223382; border-radius: 2px; }
  .navbar-right { display: flex; align-items: center; gap: 16px; }
  .avatar-btn { width: 36px; height: 36px; border-radius: 50%; background: #223382; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; }
  .main-content { margin-top: 60px; flex: 1; overflow-y: auto; padding: 28px 40px; background: #f0f2f7; }
  .petitions-layout { display: grid; grid-template-columns: 270px 1fr; gap: 28px; }
  .filter-panel { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); height: fit-content; }
  .filter-panel h2 { font-size: 16px; font-weight: 700; color: #111144; margin-bottom: 20px; }
  .filter-label { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .filter-select { width: 100%; padding: 9px 12px; border: 1.5px solid #e0e4ef; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #333; background: #fafbff; outline: none; cursor: pointer; margin-bottom: 14px; }
  .filter-select:focus { border-color: #223382; }
  .petitions-list h1 { font-family: 'Playfair Display', serif; font-size: 28px; color: #111144; margin-bottom: 4px; }
  .petitions-count { font-size: 13px; color: #888; margin-bottom: 20px; }
  .petition-card-list { background: #fff; border-radius: 14px; padding: 22px 26px; box-shadow: 0 2px 14px rgba(0,0,0,0.06); margin-bottom: 16px; border: 1px solid #eaecf2; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; transition: box-shadow 0.2s, transform 0.2s; }
  .petition-card-list:hover { box-shadow: 0 6px 28px rgba(34,51,130,0.12); transform: translateY(-2px); }
  .petition-card-list h3 { font-size: 16px; font-weight: 700; color: #111144; margin-bottom: 8px; }
  .petition-card-list p { font-size: 13px; color: #666; line-height: 1.55; margin-bottom: 12px; }
  .petition-list-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #888; }
  .petition-list-meta span { display: flex; align-items: center; gap: 4px; }
  .tag { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
  .tag-cat { background: #e8edff; color: #223382; }
  .tag-active { background: #d4f5ec; color: #1a7a65; }
  .tag-review { background: #fff3d4; color: #b97a00; }
  .tag-closed { background: #ffe8e8; color: #c0392b; }
  .status-select { padding: 8px 10px; border-radius: 8px; border: 1.5px solid #e0e4ef; background: #fafbff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #333; cursor: pointer; outline: none; }
  .petition-actions { display: flex; gap: 8px; flex-shrink: 0; }
`;

function statusTag(status) {
  const map = { active: "tag-active", under_review: "tag-review", closed: "tag-closed" };
  const labels = { active: "Active", under_review: "Under Review", closed: "Closed" };
  return <span className={`tag ${map[status] || "tag-active"}`}>{labels[status] || status}</span>;
}

export default function OfficialPetitions() {
  const navigate = useNavigate();
  const [petitions, setPetitions] = useState(mockPetitions);
  const [filterLocation, setFilterLocation] = useState("All Locations");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const filteredPetitions = petitions.filter(p => {
    if (filterLocation !== "All Locations" && p.location !== filterLocation) return false;
    if (filterCategory !== "All Categories" && p.category !== filterCategory) return false;
    if (filterStatus !== "All Statuses" && p.status !== filterStatus) return false;
    return true;
  });

  const updateStatus = (id, status) => {
    setPetitions(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`/api/petitions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      }).catch(err => console.warn('Failed to sync status with backend', err));
    }
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">CIVIX — Official Panel</div>
          <div className="navbar-links">
            <button className="active">Manage Petitions</button>
          </div>
          <div className="navbar-right">
            <button className="avatar-btn" onClick={() => navigate('/')}>O</button>
          </div>
        </nav>

        <div className="main-content">
          <div className="petitions-layout">
            <div className="filter-panel">
              <h2>Filter Petitions</h2>
              <div className="filter-label">Location</div>
              <select className="filter-select" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                <option>All Locations</option>
                <option>Downtown District</option>
                <option>North Ward</option>
                <option>East District</option>
                <option>South Ward</option>
              </select>
              <div className="filter-label">Category</div>
              <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option>All Categories</option>
                <option>Infrastructure</option>
                <option>Community</option>
                <option>Environment</option>
                <option>Housing</option>
              </select>
              <div className="filter-label">Status</div>
              <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option>All Statuses</option>
                <option value="active">Active</option>
                <option value="under_review">Under Review</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="petitions-list">
              <h1>Manage Petitions</h1>
              <div className="petitions-count">{filteredPetitions.length} petitions found</div>
              {filteredPetitions.map(p => (
                <div className="petition-card-list" key={p.id}>
                  <div style={{ flex: 1 }}>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="petition-list-meta">
                      <span>Category: <span className="tag tag-cat" style={{ marginLeft: 4 }}>{p.category}</span></span>
                      <span>📍 {p.location}</span>
                      {statusTag(p.status)}
                      <span>📄 {p.signatureCount} signatures</span>
                    </div>
                  </div>
                  <div className="petition-actions">
                    <select className="status-select" value={p.status} onChange={(e) => updateStatus(p.id, e.target.value)}>
                      <option value="active">Active</option>
                      <option value="under_review">Under Review</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
              {filteredPetitions.length === 0 && <div style={{ color: '#888', padding: '20px 0' }}>No petitions match your filters.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
