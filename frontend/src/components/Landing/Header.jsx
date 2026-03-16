import { useState } from "react"; // Mobile menu toggle ke liye
import { useNavigate } from "react-router-dom";
import { Menu, X, Landmark, User, ChevronRight } from "lucide-react"; // Icons add kiye

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const role = localStorage.getItem("role");
  const isOfficialLoggedIn = role === "OFFICIAL";
  const isCitizenLoggedIn = role === "CITIZEN";

  const handleOfficialAction = () => {
    setIsMenuOpen(false);
    if (isOfficialLoggedIn) {
      navigate("/official-dashboard");
    } else {
      navigate("/official-login");
    }
  };

  const handleCitizenLogin = () => {
    setIsMenuOpen(false);
    if (isCitizenLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/citizen-login");
    }
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 bg-white/90 backdrop-blur-md z-[100] border-b border-slate-100">

        {/* Logo */}
        {/* Logo */}
        <div
          className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tight"
          onClick={() => navigate("/")}
        >
          CIVIX
        </div>
        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {["home", "features", "stats"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition capitalize"
            >
              {item === "stats" ? "Our Impact" : item === "features" ? "Petitions" : item}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Desktop Only Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleOfficialAction}
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 border-r border-slate-200 pr-4 transition"
            >
              {isOfficialLoggedIn ? "Official Dashboard" : "Official Portal"}
            </button>
            <button
              onClick={handleCitizenLogin}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition active:scale-95 text-sm"
            >
              {isCitizenLoggedIn ? "Dashboard" : "Citizen Login"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Overlay) */}
      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"}`}>
        {/* Dark Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Drawer Content */}
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 pt-24 space-y-8">

            {/* Nav Links */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Menu</p>
              <button onClick={() => scrollToSection("home")} className="mobile-nav-link">Home <ChevronRight size={14} /></button>
              <button onClick={() => scrollToSection("features")} className="mobile-nav-link">Petitions <ChevronRight size={14} /></button>
              <button onClick={() => scrollToSection("stats")} className="mobile-nav-link">Our Impact <ChevronRight size={14} /></button>
            </div>

            {/* Auth Actions */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <button
                onClick={handleCitizenLogin}
                className="w-full flex items-center justify-between p-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100"
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  {isCitizenLoggedIn ? "Go to Dashboard" : "Citizen Login"}
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={handleOfficialAction}
                className="w-full flex items-center justify-between p-4 bg-slate-50 text-slate-700 rounded-2xl font-bold border border-slate-100"
              >
                <div className="flex items-center gap-3 text-sm">
                  <Landmark size={18} />
                  {isOfficialLoggedIn ? "Official Panel" : "Official Portal"}
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .mobile-nav-link {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          border-bottom: 1px solid #f8fafc;
        }
        .mobile-nav-link:active {
          color: #4f46e5;
          background-color: #f5f3ff;
        }
      `}} />
    </>
  );
}