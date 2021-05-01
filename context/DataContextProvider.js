import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const [hasFirebaseUser, setHasFirebaseUser] = useState(false);
  const [pastWeight, setPastWeight] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [windowSize, setWindowSize] = useState(null);
  useEffect(() => {
    setWindowSize({
      height: window.innerHeight,
      width: Math.min(500, window.innerWidth),
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        hasFirebaseUser,
        setHasFirebaseUser,
        pastWeight,
        setPastWeight,
        currentView,
        setCurrentView,
        windowSize,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
