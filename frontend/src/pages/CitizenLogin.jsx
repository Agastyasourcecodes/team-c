// frontend/src/pages/CitizenLogin.jsx
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { Link } from "react-router-dom";
import { 
  User, Mail, Lock, X, ArrowRight,
  ShieldCheck, CheckCircle2
} from "lucide-react";

export default function CitizenLogin() {
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
    setLoading(true);
    setError("");
    
    showLoader("Authenticating your credentials...");

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
      
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showLoader("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/dashboard");
        hideLoader(); // Hide loader after navigation
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
      hideLoader(); // Hide loader after navigation
    }, 500);
  };

  const handleRegister = () => {
    showLoader("Loading registration...");
    setTimeout(() => {
      navigate("/citizen-signup");
      hideLoader(); // Hide loader after navigation
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 font-sans">
      
      <div className="absolute top-[-5%] right-[-5%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="relative w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(79,70,229,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all z-20"
        >
          <X size={20} />
        </button>

        <div className="bg-indigo-600 p-8 pb-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl mb-3 relative z-10">
             <User className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight relative z-10">Welcome Back</h1>
          <p className="text-indigo-100 text-xs mt-1 relative z-10 opacity-90 font-medium">Citizen Portal Login</p>
        </div>

        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative">
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={17} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@email.com"
                  className="citizen-login-input"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <span className="text-[10px] text-indigo-600 font-bold cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={17} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="citizen-login-input"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                <ShieldCheck size={14} /> {error}
              </div>
            )}
            <div style={{ textAlign: "right", marginBottom: "15px" }}>
  <Link to="/forgot-password" style={{ fontSize: "14px", color: "#007bff", textDecoration: "none" }}>
    Forgot Password?
  </Link>
</div>

            <button 
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2" 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center pt-5 border-t border-slate-50">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an account?{" "}
              <span 
                onClick={handleRegister}
                className="text-indigo-600 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Register here
              </span>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 py-2.5 text-center border-t border-slate-100">
           <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
             <CheckCircle2 size={10} className="text-indigo-500" /> Secure Encryption Active
           </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .citizen-login-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3.1rem;
          background-color: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 1.1rem;
          font-size: 0.9rem;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }
        .citizen-login-input:focus {
          background-color: #fff;
          border-color: #6366f1;
          box-shadow: 0 8px 15px -5px rgba(99, 102, 241, 0.12);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}} />
    </div>
  );
}