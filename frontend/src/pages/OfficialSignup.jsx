import { useState, useRef } from "react"; // useRef add kiya
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  Landmark,
  CheckCircle2,
  UserPlus
} from "lucide-react";

export default function OfficialSignup() {
  const navigate = useNavigate();
  const cardRef = useRef(null); // Ref for click-outside logic

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "official",
          location: "Not Specified"
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert(data.message);
      navigate("/official-login");
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
      
      {/* Background Decorative Element */}
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-slate-800/20 rounded-full blur-[120px] -z-10"></div>

      <div 
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 cursor-default"
      >
        
        {/* Header Section - Straight Cut, No Icons */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Landmark size={200} className="absolute -bottom-10 -left-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white tracking-tight relative z-10">Official Registration</h1>
          <p className="text-slate-400 text-xs mt-2 relative z-10 font-bold tracking-widest uppercase opacity-80">Government Personnel Account</p>
        </div>

        {/* Form Section - Clean Layout */}
        <div className="p-9 bg-white relative">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Officer Name"
                  className="official-input-modern"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gov.in"
                  className="official-input-modern"
                  required
                />
              </div>
            </div>

            {/* Passwords Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••"
                    className="official-input-modern"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••"
                    className="official-input-modern"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-[12px] font-bold bg-red-50 p-3.5 rounded-xl border border-red-100 animate-shake">
                <ShieldCheck size={14} /> {error}
              </div>
            )}

            <button 
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4" 
              disabled={loading}
            >
              {loading ? "Processing..." : "Register Official Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <span 
                onClick={() => navigate("/official-login")} 
                className="text-slate-900 font-bold cursor-pointer hover:underline underline-offset-4"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>

        {/* Security Trust Badge */}
        <div className="bg-slate-50 py-3 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 uppercase tracking-widest">
              <CheckCircle2 size={12} className="text-slate-900" /> Authorized Government Identity Access
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .official-input-modern {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3.2rem;
          background-color: #f8fafc;
          border: 1.5px solid #f1f5f9;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.3s ease;
          outline: none;
        }
        .official-input-modern:focus {
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