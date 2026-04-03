import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f7f6", 
        zIndex: 9999 // Forces it to sit above any existing navbars or footers
      }}
    >
      <div 
        style={{
          width: "90%", // Responsive width
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center", 
        }}
      >
        <h2 style={{ marginBottom: "10px", marginTop: "0" }}>Forgot Password</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Enter your email to receive a password reset link.
        </p>
        
        {message && <div style={{ color: "green", marginBottom: "15px", fontWeight: "bold" }}>{message}</div>}
        {error && <div style={{ color: "red", marginBottom: "15px", fontWeight: "bold" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box" 
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginTop: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <div style={{ marginTop: "20px" }}>
          <Link to="/" style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;