import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  X, 
  UserPlus, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

export default function CitizenSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "citizen" 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Citizen account created successfully");
      navigate("/citizen-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 font-sans">
      
      {/* Subtle Indigo Glow */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="relative w-full max-w-[460px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(79,70,229,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top-Right Close Button */}
        <button 
          onClick={() => navigate("/")} 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all z-20"
        >
          <X size={20} />
        </button>

        {/* Header - Reduced Padding */}
        <div className="bg-indigo-600 p-8 pb-10 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl mb-3 relative z-10">
             <UserPlus className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight relative z-10">Citizen Signup</h1>
          <p className="text-indigo-100 text-xs mt-1 relative z-10 opacity-90 font-medium">Create your account to track issues</p>
        </div>

        {/* Form Section - Compact Spacing */}
        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="citizen-input-compact"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="citizen-input-compact"
                  required
                />
              </div>
            </div>

            {/* Passwords Grid - Same as Official */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••"
                    className="citizen-input-compact"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••"
                    className="citizen-input-compact"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2" 
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-6 text-center pt-4 border-t border-slate-50">
            <p className="text-xs text-slate-500 font-medium">
              Already a member?{" "}
              <span 
                onClick={() => navigate("/citizen-login")} 
                className="text-indigo-600 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-slate-50 py-2.5 text-center border-t border-slate-100">
           <p className="text-[9px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
             <CheckCircle2 size={10} className="text-indigo-500" /> Secure Citizen Connection
           </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .citizen-input-compact {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background-color: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 1.1rem;
          font-size: 0.85rem;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }
        .citizen-input-compact:focus {
          background-color: #fff;
          border-color: #6366f1;
          box-shadow: 0 8px 15px -5px rgba(99, 102, 241, 0.1);
        }
      `}} />
    </div>
  );
}