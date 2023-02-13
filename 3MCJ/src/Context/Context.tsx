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
  shoppingCartValue:number;
  setShoppingCartValue:(shoppingCartValue:number)=> void;
  shoppingCartItems:any[];
  setShoppingCartItems:(shoppingCartItems:any[])=>void;
  rating:number;
  setRating:(rating:number)=> void;
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
  const [shoppingCartValue,setShoppingCartValue] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [shoppingCartItems, setShoppingCartItems] = useState<any[]>([])
  return (
    <globalContext.Provider value={{ setShoppingCartItems, shoppingCartItems ,rating, setRating, shoppingCartValue, setShoppingCartValue, sellers, setSellers, isLogged, setIsLogged, searchingCategory, setSearchingCategory, searchingLocation, setSearchingLocation, readDivValue, setReadDivValue  }}>
      {props.children}
    </globalContext.Provider>
  );
}

export default Context;
