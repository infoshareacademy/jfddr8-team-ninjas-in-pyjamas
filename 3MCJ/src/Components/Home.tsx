import { useNavigate } from "react-router-dom";
import { globalContext } from "../Context/Context";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../main";

function Home() {
  
  const navigate = useNavigate();
  const { setIsLogged, isLogged } = useContext(globalContext);

  const handleLogInOut = () => {
    if (!isLogged){
      navigate('/login')
    setIsLogged(!isLogged)
    } else {
      navigate('/')
      setIsLogged(!isLogged)
      signOut(firebaseAuth)
    }  
  }

  const handleRegistration = () => {
    navigate('/registration')
  }

  return (
    <div>
      <div>
        <button onClick={handleLogInOut}>{isLogged? "Wyloguj się": "Zaloguj się"}</button> 
        <button onClick={handleRegistration}>Zarejestruj się</button>
      </div>
      <label htmlFor="location">Lokalizacja:</label>
      <select name="location" id="location">
        <option value="Gdynia">Gdynia</option>
        <option value="Sopot">Sopot</option>
        <option value="Gdańsk">Gdańsk</option>
      </select>
      <label htmlFor="products">Kategoria produktu:</label>
      <select name="products" id="products">
        <option value="Wyroby-Miesne">Wyroby Mięsne</option>
        <option value="Wyroby-Rybne">Wyroby Rybne</option>
        <option value="nabiał">Nabiał</option>
        <option value="miód">Miód</option>
        <option value="Wyroby Alkoholowe">Wyroby Alkoholowe</option>
      </select>
    </div>
  );
}

export default Home;
