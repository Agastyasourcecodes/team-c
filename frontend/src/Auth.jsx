import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import CardSwap, { Card } from './CardSwap';

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
      if (data.user.role === 'government_official') {
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

      alert("Registration successful! Please sign in.");
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
                <p className="role-question">Swipe to select your role:</p>

                <CardSwap
                  delay={10000}
                  pauseOnHover={true}
                  cardDistance={60}
                  verticalDistance={40}
                >
                  <Card>
                    <div className="role-card-content">
                      <div className="role-icon">👤</div>
                      <h3>Citizen</h3>
                      <p>Create and sign petitions<br />voice your concerns</p>
                      <button
                        className="select-role-btn"
                        onClick={() => setSelectedRole('citizen')}
                      >
                        Select
                      </button>
                    </div>
                  </Card>

                  <Card>
                    <div className="role-card-content">
                      <div className="role-icon">🏛️</div>
                      <h3>Government Official</h3>
                      <p>Review and respond to<br />citizen petitions</p>
                      <button
                        className="select-role-btn"
                        onClick={() => setSelectedRole('government_official')}
                      >
                        Select
                      </button>
                    </div>
                  </Card>
                </CardSwap>
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