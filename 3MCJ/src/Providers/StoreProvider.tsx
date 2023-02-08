import React, { createContext, useState } from "react";

type StoreContextState = {
  username: string | null;
  setUsername: (username: string | null) => void;
  cartValue: number;
  setCartValue: (value: number) => void;
}

type StoreProviderProps = {
  children: React.ReactNode;
}

export const StoreContext = createContext<StoreContextState>({} as StoreContextState);

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const [username, setUsername] = useState<string | null>('');
  const [cartValue, setCartValue] = useState<number>(0);

  return (
    <StoreContext.Provider value={{username, setUsername, cartValue, setCartValue}}>
      {children}
    </StoreContext.Provider>
  );
};
