import React, { useState } from "react";

type GlobalVariablesType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  searchingCategory: string;
  setSearchingCategory: (searchingCategory: string) => void;
  searchingLocation: string;
  setSearchingLocation: (searchingLocation: string) => void;
};

type PropsWithChildren = {
  children: JSX.Element;
};

export const globalContext = React.createContext<GlobalVariablesType>(
  {} as GlobalVariablesType
);

function Context(props: PropsWithChildren): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [searchingCategory, setSearchingCategory] = useState<string>('')
  const [searchingLocation, setSearchingLocation] = useState<string>('')
  return (
    <globalContext.Provider value={{ isLogged, setIsLogged, searchingCategory, setSearchingCategory, searchingLocation, setSearchingLocation }}>
      {props.children}
    </globalContext.Provider>
  );
}

export default Context;
