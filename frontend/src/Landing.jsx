import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-left"></div>
        <div className="nav-right">
          <button
            className="nav-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="nav-register"
            onClick={() => navigate("/login")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="brand">CIVIX</h1>

          <h3 className="tagline">
            Empowering Communities Through Digital Participation
          </h3>

          <p className="hero-description">
            Raise petitions, vote in community polls, track government
            responses, and ensure transparent governance — all in one secure
            platform.
          </p>

          <button
            className="primary-cta"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          {/* YOUR ORIGINAL IMAGE HERE */}
          <img
            src="https://images.unsplash.com/photo-1768213022263-0414dc145dfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Government Assembly"
            className="hero-image"
            />
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section" id="stats">
        <div className="stat-card">
          <h3>12,480+</h3>
          <p>Petitions Raised</p>
        </div>

        <div className="stat-card">
          <h3>8,920+</h3>
          <p>Issues Resolved</p>
        </div>

        <div className="stat-card">
          <h3>45,000+</h3>
          <p>Community Votes Cast</p>
        </div>

        <div className="stat-card">
          <h3>92%</h3>
          <p>Citizen Satisfaction</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section" id="features">
        <div className="feature-box">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            alt="Petitions"
          />
          <h3>Raise Petitions</h3>
          <p>Create and support local causes that matter to your community.</p>
        </div>

        <div className="feature-box">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            alt="Polls"
          />
          <h3>Participate in Polls</h3>
          <p>Share your opinion on civic projects and development initiatives.</p>
        </div>

        <div className="feature-box">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="Tracking"
          />
          <h3>Transparent Tracking</h3>
          <p>Monitor verification, actions taken, and resolution progress.</p>
        </div>
      </section>

    </div>
  );
}