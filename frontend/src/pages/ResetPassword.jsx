import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/"); 
        }, 3000);
      } else {
        setError(data.message || data.error || "Invalid or expired token.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Set New Password</h2>
        
        {message && <div className="success-message" style={{ color: "green", marginBottom: "10px" }}>{message}</div>}
        {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="input-group" style={{ marginTop: "10px" }}>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button" style={{ marginTop: "20px" }}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-links" style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;