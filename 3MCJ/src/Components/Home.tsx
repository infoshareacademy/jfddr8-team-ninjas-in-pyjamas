import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";
import SellerPage from "./SellerPage";
import SellersList from "./SellersList";

function Home() {
  const navigate = useNavigate();
  const { setIsLogged, isLogged, searchingLocation, setSearchingLocation, searchingCategory, setSearchingCategory } = useContext(globalContext);
  const [locationValue, setLocationValue] = useState<string>('')
  const [categoryValue, setCategoryValue] = useState<string>('')

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

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setSearchingLocation(locationValue);
    setSearchingCategory(categoryValue);
    
  }

  return (
    <div>
      <div>
        <button onClick={handleLogInOut}>
          {isLogged ? "Wyloguj się" : "Zaloguj się"}
        </button>
        <button onClick={handleRegistration}>Zarejestruj się</button>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <label htmlFor="location">Lokalizacja:</label>
      <select onChange={(e)=>{setLocationValue(e.target.value)}} name="location" id="location">
        <option value="Wszystkie">Wszystkie</option>
        <option value="Gdynia">Gdynia</option>
        <option value="Sopot">Sopot</option>
        <option value="Gdańsk">Gdańsk</option>
      </select>
      <label htmlFor="products">Kategoria produktu:</label>
      <select onChange={(e)=>{setCategoryValue(e.target.value)}} name="products" id="products">
        <option value="Wyroby Mięsne">Wyroby Mięsne</option>
        <option value="Wyroby Rybne">Wyroby Rybne</option>
        <option value="Wyroby Cukiernicze">Wyroby Cukiernicze</option>
        <option value="Nabiał">Nabiał</option>
        <option value="Wyroby Garmażeryjne">Wyroby Garmażeryjne</option>
      </select>
      <input type="submit" value={"Znajdź pyszności"} />
      </form>
      <div>
        <div>Wyroby Mięsne</div>
        <div>Wyroby Rybne</div>
        <div>Wyroby Cuiernicze</div>
        <div>Nabiał</div>
        <div>Wyroby Garmażeryjne</div>
      </div>
      <SellersList/>
    </div>
  );
}

export default Home;
