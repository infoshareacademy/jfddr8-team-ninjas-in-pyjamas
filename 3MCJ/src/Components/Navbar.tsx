import { firebaseAuth } from "../main";
import { useContext } from "react";
import { globalContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import ShoppingCart from './ShoppingCart';

function Navbar() {
    const {
        setIsLogged,
        isLogged,
        searchingLocation,
        setSearchingLocation,
        searchingCategory,
        setSearchingCategory,
        readDivValue,
        setReadDivValue,
      } = useContext(globalContext);
    const navigate = useNavigate();
    const handleLogInOut = () => {
        if (!isLogged) {
          navigate("/login");
        } else {
          navigate("/");
          setIsLogged(!isLogged);
          signOut(firebaseAuth);
        }
      };
    
      const handleRegistration = () => {
        navigate("/registration");
      };
  
  
    return (
    <div>
      <div>
      {/* {!isLogged&& */}
      <button onClick={handleLogInOut}>
          {isLogged ? "Wyloguj się" : "Zaloguj się"}
        </button>
        {!isLogged&&<button onClick={handleRegistration}>Zarejestruj się</button>}
        <ShoppingCart/>
      </div>
    </div>
  )
}

export default Navbar
