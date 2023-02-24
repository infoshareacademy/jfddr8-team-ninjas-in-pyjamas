import React, { useState, useEffect } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../main";

type GlobalVariablesType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  searchingCategory: string;
  setSearchingCategory: (searchingCategory: string) => void;
  searchingLocation: string;
  setSearchingLocation: (searchingLocation: string) => void;
  readDivValue: string;
  setReadDivValue: (readDivValue: string) => void;
  sellers: any[];
  setSellers: (sellers: any[]) => void;
  shoppingCartValue: number;
  setShoppingCartValue: (shoppingCartValue: number) => void;
  shoppingCartItems: any[];
  setShoppingCartItems: (shoppingCartItems: any[]) => void;
  rating: number;
  setRating: (rating: number) => void;
  spinnerHome: boolean;
  setSpinnerHome: (spinnerHome: boolean) => void;
};

type PropsWithChildren = {
  children: JSX.Element;
};

export const globalContext = React.createContext<GlobalVariablesType>(
  {} as GlobalVariablesType
);

function Context(props: PropsWithChildren): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [searchingCategory, setSearchingCategory] = useState<string>("");
  const [searchingLocation, setSearchingLocation] = useState<string>("");
  const [readDivValue, setReadDivValue] = useState<string>("");
  const [sellers, setSellers] = useState<any[]>([]);
  const [shoppingCartValue, setShoppingCartValue] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [shoppingCartItems, setShoppingCartItems] = useState<any[]>([]);
  const [spinnerHome, setSpinnerHome] = useState<boolean>(true);

  const fetchSellers = async () => {
    const q = query(collection(firebaseDb, "Sellers"));
    try {
      const sellersSnapshot = await getDocs(q);
      const fetchedSellers: any[] = [];
      sellersSnapshot.forEach((seller) => {
        fetchedSellers.push({ id: seller.id, ...seller.data() });
      });
      setSellers(fetchedSellers);
      setSpinnerHome(false);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <globalContext.Provider
      value={{
        spinnerHome,
        setSpinnerHome,
        setShoppingCartItems,
        shoppingCartItems,
        rating,
        setRating,
        shoppingCartValue,
        setShoppingCartValue,
        sellers,
        setSellers,
        isLogged,
        setIsLogged,
        searchingCategory,
        setSearchingCategory,
        searchingLocation,
        setSearchingLocation,
        readDivValue,
        setReadDivValue,
      }}
    >
      {props.children}
    </globalContext.Provider>
  );
}

export default Context;
