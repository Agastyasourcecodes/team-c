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
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
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
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        
        {message && <div className="success-message" style={{ color: "green", marginBottom: "10px" }}>{message}</div>}
        {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button" style={{ marginTop: "15px" }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <div className="auth-links" style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;