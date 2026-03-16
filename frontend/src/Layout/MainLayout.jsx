import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">

      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />

    </div>
  );
}