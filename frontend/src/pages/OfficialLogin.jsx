// frontend/src/pages/OfficialLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext"; 
import { Link } from "react-router-dom";
import { 
  Building2, 
  Mail, 
  Lock, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  CheckCircle2,
  UserPlus
} from "lucide-react";

export default function OfficialLogin() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader(); 

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    showLoader("Authenticating official credentials...");
    
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showLoader("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/official-dashboard");
        hideLoader();
      }, 1000);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
      hideLoader();
    }
  };

  const handleClose = () => {
    showLoader("Returning to home...");
    setTimeout(() => {
      navigate("/");
      hideLoader();
    }, 500);
  };

  const handleSignup = () => {
    showLoader("Loading signup page...");
    setTimeout(() => {
      navigate("/official-signup");
      hideLoader();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 font-sans">
      
      {/* Professional Slate Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[120px] -z-10"></div>

      <div className="relative w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top-Right Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all z-20"
        >
          <X size={20} />
        </button>

        {/* Top Header Section with Dark Theme */}
        <div className="bg-slate-900 p-9 pb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
             <Landmark size={180} className="absolute -bottom-10 -right-10 text-white" />
          </div>
          
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mb-4 relative z-10">
             <Building2 className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight relative z-10">Official Portal</h1>
          <p className="text-slate-400 text-xs mt-1 relative z-10 font-medium tracking-wide uppercase">Administrative Access Only</p>
        </div>

        {/* Form Section */}
        <div className="p-9 -mt-6 bg-white rounded-t-[2.5rem] relative">
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={17} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="official@gov.in"
                  className="official-input-sleek"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key / Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={17} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="official-input-sleek"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                <ShieldCheck size={14} /> {error}
              </div>
            )}
            <div style={{ textAlign: "right", marginBottom: "15px" }}>
  <Link to="/forgot-password" style={{ fontSize: "14px", color: "#007bff", textDecoration: "none" }}>
    Forgot Password?
  </Link>
</div>

            <button 
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2" 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Authorize & Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* New Register Option */}
          <div className="mt-6 text-center pt-5 border-t border-slate-50">
            <p className="text-xs text-slate-500 font-medium">
              Need administrative access?{" "}
              <span 
                onClick={handleSignup} 
                className="text-slate-900 font-bold cursor-pointer hover:underline underline-offset-4 inline-flex items-center gap-1"
              >
                <UserPlus size={14} /> Create Official Account
              </span>
            </p>
          </div>
        </div>

        {/* Security Trust Badge */}
        <div className="bg-slate-50 py-2.5 text-center border-t border-slate-100">
           <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
             <CheckCircle2 size={10} className="text-slate-900" /> End-to-End Encrypted Gov-Network
           </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .official-input-sleek {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3.1rem;
          background-color: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 1.1rem;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.3s ease;
          outline: none;
        }
        .official-input-sleek:focus {
          background-color: #fff;
          border-color: #0f172a;
          box-shadow: 0 8px 15px -5px rgba(15, 23, 42, 0.1);
        }
      `}} />
    </div>
  );
}