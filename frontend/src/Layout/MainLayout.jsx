// frontend/src/Layout/MainLayout.jsx
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import { useLoader } from "../context/LoaderContext";

export default function MainLayout({ children }) {
  const { showLoader } = useLoader();

  // This will be passed to Header component for navigation
  const navigateWithLoader = (path, message) => {
    console.log(`🚀 Navigating to ${path} with message: ${message}`);
    showLoader(message);
    
    setTimeout(() => {
      console.log(`➡️ Now navigating to ${path}`);
      // The actual navigation will happen in Header component
      // We just handle the loader here
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Pass the navigation function to Header */}
      <Header navigateWithLoader={navigateWithLoader} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}