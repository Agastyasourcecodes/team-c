import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="text-sm font-bold text-indigo-600 animate-pulse uppercase tracking-widest">
              Processing...
            </p>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

// Is line ko add karne se App.js ka error chala jayega agar bina {} ke import karoge
export default LoaderProvider;