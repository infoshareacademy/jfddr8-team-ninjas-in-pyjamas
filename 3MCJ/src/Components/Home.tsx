import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import SellersList from "./SellersList";
import StarRating from "./StarRating";

function Home() {
 
  const {
    setIsLogged,
    isLogged,
    searchingLocation,
    setSearchingLocation,
    searchingCategory,
    setSearchingCategory,
    readDivValue,
    setReadDivValue
  } = useContext(globalContext);
  const [locationValue, setLocationValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchingLocation(locationValue);
    setSearchingCategory(categoryValue);
  };

  return (
    <div>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="location">Lokalizacja:</label>
        <select 
          defaultValue={"Wybierz miasto"}
          onChange={(e) => {
            setLocationValue(e.target.value);
          }}
          name="location"
          id="location"
        >
          <option disabled >
            Wybierz miasto
          </option>
          <option value="Gdynia">Gdynia</option>
          <option value="Sopot">Sopot</option>
          <option value="Gdańsk">Gdańsk</option>
        </select>
        <label htmlFor="products">Kategoria produktu:</label>
        <select
        defaultValue={"Wybierz produkt"}
          onChange={(e) => {
            setCategoryValue(e.target.value);
          }}
          name="products"
          id="products"
        >
           <option disabled >
            Wybierz produkt
          </option>
          <option value="Wyroby Mięsne">Wyroby Mięsne</option>
          <option value="Wyroby Rybne">Wyroby Rybne</option>
          <option value="Wyroby Cukiernicze">Wyroby Cukiernicze</option>
          <option value="Nabiał">Nabiał</option>
          <option value="Wyroby Garmażeryjne">Wyroby Garmażeryjne</option>
        </select>
        <input type="submit" value={"Znajdź pyszności"} />
      </form>
   
      <SellersList />
      <StarRating />
    </div>
  );
}

export default Home;
