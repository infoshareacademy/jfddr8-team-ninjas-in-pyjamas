import { firebaseAuth } from "../main";
import { useContext } from "react";
import { globalContext } from "../Context/Context";
import { useNavigate, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import ShoppingCart from "./ShoppingCart";
import "../Styles/navbar.scss";

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
    shoppingCartValue,
    setShoppingCartValue,
    setShoppingCartItems,
  } = useContext(globalContext);
  const navigate = useNavigate();
  const handleLogInOut = () => {
    if (!isLogged) {
      navigate("/login");
    } else {
      navigate("/");
      setIsLogged(false);
      signOut(firebaseAuth);
      setShoppingCartValue(0);
      setShoppingCartItems([]);
    }
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div>
      <div className="navbar">
      <img className="nav-bar-logo"
            onClick={() => navigate("/#")}
            src="src/assets/Logo/TCJLogoNavbar.png"
            alt=""
          />
        <div className="div-login-registration">
          
          <div className="navbar-button-div">
            
            <div className="button" onClick={handleLogInOut}>
              {isLogged ? "Wyloguj się" : "Zaloguj się"}
            </div>
            {!isLogged && (
              <div className="button" onClick={handleRegistration}>
                Zarejestruj się
              </div>
            )}
            <div
              className="shopping-cart-icon-div"
              onClick={() => navigate("/shoppingCart")}
              >
              {isLogged && shoppingCartValue + " zł"}
            <img
              className="shopping-cart-icon"
              src="src/assets/Logo/ShoppingCartLogo.png"
              alt="shopping cart icon"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
