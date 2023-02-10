import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import SellersList from "./SellersList";

function Home() {
  const navigate = useNavigate();
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

  const handleLogInOut = () => {
    if (!isLogged) {
      navigate("/login");
      setIsLogged(!isLogged);
    } else {
      navigate("/");
      setIsLogged(!isLogged);
      signOut(firebaseAuth);
    }
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchingLocation(locationValue);
    setSearchingCategory(categoryValue);
  };

  // const directToCategorySellers = (event:React.MouseEvent<HTMLButtonElement>) =>{
  //   let a = event.currentTarget.textContent
  //   console.log(a)
  // }


  return (
    <div>
      <div>
        <button onClick={handleLogInOut}>
          {isLogged ? "Wyloguj się" : "Zaloguj się"}
        </button>
        <button onClick={handleRegistration}>Zarejestruj się</button>
      </div>
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
      {/* <div>
        <div onClick={directToCategorySellers}>Wyroby Mięsne</div>
        <div onClick={directToCategorySellers}>Wyroby Rybne</div>
        <div onClick={directToCategorySellers}>Wyroby Cukiernicze</div>
        <div onClick={directToCategorySellers}>Nabiał</div>
        <div onClick={directToCategorySellers}>Wyroby Garmażeryjne</div>
      </div> */}
      <SellersList />
    </div>
  );
}

export default Home;
