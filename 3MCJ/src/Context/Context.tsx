import React, { useState } from "react";

type GlobalVariablesType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  searchingCategory: string;
  setSearchingCategory: (searchingCategory: string) => void;
  searchingLocation: string;
  setSearchingLocation: (searchingLocation: string) => void;
  readDivValue:string;
  setReadDivValue: (readDivValue:string) => void;
  sellers:any[];
  setSellers:(sellers:any[]) => void;
  shoppingCartValue:any[];
  setShoppingCartValue:(shoppingCartValue:any[])=> void;

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
  const [readDivValue, setReadDivValue] = useState<string>('')
  const [sellers, setSellers] = useState<any[]>([]);
  const [shoppingCartValue,setShoppingCartValue] = useState<any[]>([]);
  return (
    <globalContext.Provider value={{ shoppingCartValue, setShoppingCartValue, sellers, setSellers, isLogged, setIsLogged, searchingCategory, setSearchingCategory, searchingLocation, setSearchingLocation, readDivValue, setReadDivValue  }}>
      {props.children}
    </globalContext.Provider>
  );
}

export default Context;
