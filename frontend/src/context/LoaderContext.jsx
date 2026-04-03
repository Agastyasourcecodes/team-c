// frontend/src/context/LoaderContext.js
import React, { createContext, useState, useContext, useRef } from 'react';

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const timerRef = useRef(null);

  const showLoader = (message = 'Loading...') => {
    console.log('🔵 Show Loader:', message);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideLoader = () => {
    console.log('🟢 Hide Loader');
    setLoading(false);
    setLoadingMessage('Loading...');
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  React.useEffect(() => {
    if (loading) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        console.log('⚠️ Auto-hiding loader after 5 seconds');
        setLoading(false);
        setLoadingMessage('Loading...');
        timerRef.current = null;
      }, 800);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [loading]);

  return (
    <LoaderContext.Provider value={{
      loading,
      loadingMessage,
      showLoader,
      hideLoader
    }}>
      {children}
    </LoaderContext.Provider>
  );
};