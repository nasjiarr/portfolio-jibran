import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface PreloaderContextType {
  isReady: boolean;
  triggerReady: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isReady: false,
  triggerReady: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const isReadyRef = useRef(false);

  const triggerReady = useCallback(() => {
    if (isReadyRef.current) return;
    isReadyRef.current = true;
    setIsReady(true);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isReady, triggerReady }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}

