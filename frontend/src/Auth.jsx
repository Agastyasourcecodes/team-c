import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // 🔐 LOGIN - Connected to Backend
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      // Save token to localStorage for future authenticated requests
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Route based on role
      if (data.user.role === 'official') {
        navigate('/official-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER - Connected to Backend
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName, 
          email: formData.email,
          password: formData.password,
          role: selectedRole,
          location: "Not Specified"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      alert(data.message); // Shows dynamic success or pending verification message
      toggleMode(); // Switch to login view

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setSelectedRole(null);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-card">
          {isLogin ? (
            <>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your account</p>

              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="auth-divider">
                <span>Don't have an account?</span>
              </div>

              <button className="toggle-button" onClick={toggleMode}>
                Create an Account
              </button>
            </>
          ) : (
            <>
              <h1 className="auth-title">Join Our Platform</h1>
              <p className="auth-subtitle">Choose your role</p>

              {!selectedRole ? (
                <div className="role-selection-container">
                  <p className="role-question" style={{ marginBottom: '20px' }}>Select your role:</p>

                  {/* ✅ FIX: Replaced CardSwap with a standard flexbox layout */}
                  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    
                    {/* Citizen Card */}
                    <div className="role-card-content" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', flex: '1 1 200px', textAlign: 'center' }}>
                      <div className="role-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>👤</div>
                      <h3 style={{ marginBottom: '10px' }}>Citizen</h3>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px', opacity: 0.8 }}>Create and sign petitions<br />voice your concerns</p>
                      <button
                        className="select-role-btn"
                        onClick={() => setSelectedRole('citizen')}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Select
                      </button>
                    </div>

                    {/* Official Card */}
                    <div className="role-card-content" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', flex: '1 1 200px', textAlign: 'center' }}>
                      <div className="role-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>🏛️</div>
                      <h3 style={{ marginBottom: '10px' }}>Government Official</h3>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px', opacity: 0.8 }}>Review and respond to<br />citizen petitions</p>
                      <button
                        className="select-role-btn"
                        onClick={() => setSelectedRole('official')}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Select
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleRegister} className="auth-form">
                    <div className="selected-role">
                      <span className="role-badge">
                        {selectedRole === 'citizen'
                          ? '👤 Citizen'
                          : '🏛️ Government Official'}
                      </span>

                      <button
                        type="button"
                        className="change-role-btn"
                        onClick={() => setSelectedRole(null)}
                      >
                        Change Role
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                      type="submit"
                      className="auth-button"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>

                  <div className="auth-divider">
                    <span>Already have an account?</span>
                  </div>

                  <button className="toggle-button" onClick={toggleMode}>
                    Sign In
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}