import { firebaseAuth } from "../main";
import { useContext } from "react";
import { globalContext } from "../Context/Context";
import { useNavigate, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../Styles/navbar.scss";
import { Dna } from "react-loader-spinner";

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
        <img
          className="nav-bar-logo"
          onClick={() => navigate("/#")}
          src="src/assets/Logo/TCJLogoNavbar.png"
          alt=""
        />
        <div className="div-login-registration">
          <div className="navbar-button-div">
            <div className="shopping-cart-icon-div" onClick={handleLogInOut}>
              <img
                className="shopping-cart-icon"
                src="src/assets/Logo/log-out.png"
                alt="shopping cart icon"
              />
              {isLogged ? <p>Wyloguj się</p> : <p>Zaloguj się</p>}
            </div>
            {!isLogged && (
              <div
                className="shopping-cart-icon-div"
                onClick={handleRegistration}
              >
                <img
                  className="shopping-cart-icon"
                  src="src/assets/Logo/registration.png"
                  alt="shopping cart icon"
                />
                {!isLogged && <p>Zarejestruj się</p>}
              </div>
            )}

            {isLogged && (
              <div
                className="shopping-cart-icon-div shopping-cart-icon-cart"
                onClick={() => navigate("/shoppingCart")}
              >
                <img
                  className="shopping-cart-icon"
                  src="src/assets/Logo/ShoppingCartLogo.png"
                  alt="shopping cart icon"
                />
                {isLogged && shoppingCartValue + " zł"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
