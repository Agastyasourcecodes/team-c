import './App.css';
import Auth from './Auth';
import Aurora from './Aurora';

function App() {
  return (
    <div className="App">
      
      {/* Aurora Background */}
      <div className="app-background">
        <Aurora
          colorStops={['#1E40AF', '#3B82F6', '#1E40AF']}
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      {/* Login Content */}
      <div className="app-content">
        <Auth />
      </div>

    </div>
  );
}

export default App;
