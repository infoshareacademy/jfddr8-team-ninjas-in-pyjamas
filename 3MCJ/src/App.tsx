import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "./main";
import Routing from "./Routing/Routing";
import { globalContext } from "./Context/Context";
import  Navbar  from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./Styles/app.scss";
import { useLocation } from "react-router-dom";

function App() {
  const { setShoppingCartItems, setShoppingCartValue, isLogged, setIsLogged} = useContext(globalContext);
  const {pathname} = useLocation();

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const email = user.email;
        setIsLogged(true);
        const docRef = doc(firebaseDb, "Users", `${email}`);
        try {
          const shoppingCartDetailsSnapshot = await getDoc(docRef);
          if(shoppingCartDetailsSnapshot.exists()){
            setShoppingCartItems(shoppingCartDetailsSnapshot.data().shoppingCartItems);
            setShoppingCartValue(shoppingCartDetailsSnapshot.data().shoppingCartValue);
          }} catch (error) {
            console.log("Error fetching shopping cart data", error);
          }
      } else {
        setIsLogged(false);
        setShoppingCartItems([]);
        setShoppingCartValue(0);
      }
    });
  }, [setShoppingCartItems, setShoppingCartValue, setIsLogged]);

  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="App">
      <Navbar/>
      <Routing />
      <Footer/>
    </div>
  );
}

export default App;
