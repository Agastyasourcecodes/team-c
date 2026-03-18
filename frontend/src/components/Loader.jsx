// frontend/src/components/Loader.jsx
import React from 'react';
import { useLoader } from '../context/LoaderContext';

const Loader = () => {
  const { loading, loadingMessage } = useLoader();

  console.log('🔥 Loader rendering - loading:', loading, 'message:', loadingMessage);

  if (!loading) {
    console.log('❌ Loader not showing');
    return null;
  }

  console.log('✅ Loader IS showing!');
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#4f46e5', 
          fontSize: '2rem',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          CIVIX
        </h2>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{ 
          marginTop: '20px', 
          color: '#666',
          fontSize: '14px'
        }}>
          {loadingMessage}
        </p>
      </div>
    </div>
  );
};

// Add keyframes animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default Loader;