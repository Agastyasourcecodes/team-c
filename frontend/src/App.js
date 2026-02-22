import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './Auth';
import Aurora from './Aurora';
import Dashboard from './Dashboard';
import Landing from './Landing';

function App() {
  const location = useLocation();

  return (
    <div className="App">

      <div className="app-background">
        <Aurora
          colorStops={['#223382', '#9BACD8', '#223382']}
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      <div className={`app-content ${location.pathname !== "/login" ? "scrollable" : ""}`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/official-dashboard" element={<Dashboard />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;