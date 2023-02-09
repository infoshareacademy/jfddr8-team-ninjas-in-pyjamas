import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";

function Home() {
  const navigate = useNavigate();
  const { setIsLogged, isLogged, searchingLocation, setSearchingLocation, searchingCategory, setSearchingCategory } = useContext(globalContext);

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

  const handleSubmit = (e:React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setSearchingLocation(e.target.location.value);
    setSearchingCategory(e.target.products.value)
    
  }
  console.log(searchingLocation )
  console.log(searchingCategory)
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
      <select name="location" id="location">
        <option disabled>Wybierz miasto</option>
        <option value="Gdynia">Gdynia</option>
        <option value="Sopot">Sopot</option>
        <option value="Gdańsk">Gdańsk</option>
      </select>
      <label htmlFor="products">Kategoria produktu:</label>
      <select name="products" id="products">
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
    </div>
  );
}

export default Home;
