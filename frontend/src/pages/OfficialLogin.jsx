import { useState, useRef } from "react"; // useRef add kiya
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  CheckCircle2,
  UserPlus
} from "lucide-react";

export default function OfficialLogin() {
  const navigate = useNavigate();
  const cardRef = useRef(null); // Ref for click-outside logic

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Click outside to close logic
  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      navigate("/");
    }
  };

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
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
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

      navigate("/official-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 font-sans cursor-pointer"
    >
      
      {/* Professional Slate Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[120px] -z-10"></div>

      <div 
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 cursor-default"
      >
        
        {/* Top Header Section - No Close Button, No Icon, Straight Join */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
             <Landmark size={180} className="absolute -bottom-10 -right-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white tracking-tight relative z-10">Official Portal</h1>
          <p className="text-slate-400 text-xs mt-2 relative z-10 font-bold tracking-widest uppercase opacity-80">Administrative Access Only</p>
        </div>

        {/* Form Section - Straight Edge with Header */}
        <div className="p-9 bg-white relative">
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="space-y-2 group">
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

            <div className="space-y-2 group">
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
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 animate-shake">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl shadow-slate-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4" 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Authorize & Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Register Option */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              Need administrative access?{" "}
              <span 
                onClick={() => navigate("/official-signup")} 
                className="text-slate-900 font-bold cursor-pointer hover:underline underline-offset-4 inline-flex items-center gap-1"
              >
                <UserPlus size={14} /> Create Official Account
              </span>
            </p>
          </div>
        </div>

        {/* Security Trust Badge */}
        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
            <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
              <CheckCircle2 size={10} className="text-slate-900" /> End-to-End Encrypted Gov-Network
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .official-input-sleek {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3.1rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.3s ease;
          outline: none;
        }
        .official-input-sleek:focus {
          background-color: #fff;
          border-color: #0f172a;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08);
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