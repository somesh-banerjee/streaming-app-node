import React, { createContext, useContext, useState } from 'react';

export interface AppState {
  current_file: string | null;
  current_file_type: string;
  current_directory: string;
}

export const initialState: AppState = {
  current_file: null,
  current_file_type: '',
  current_directory: '',
};

const AppContext = createContext<
  AppState & { updateAppState: (newState: AppState) => void }
>({
  ...initialState,
  updateAppState: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(initialState);

  const updateAppState = (newState: AppState) => {
    setAppState(newState);
  };

  const value: AppState & {
    updateAppState: (newState: AppState) => void;
  } = {
    ...appState,
    updateAppState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
