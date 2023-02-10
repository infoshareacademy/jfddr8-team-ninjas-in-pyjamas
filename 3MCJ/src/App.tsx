import "./App.css";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "./main";
import Routing from "./Routing/Routing";
import { globalContext } from "./Context/Context";
import ShoppingCart from "./Components/ShoppingCart";
import  Navbar  from "./Components/Navbar";

function App() {


  return (
    <div className="App">
      <Navbar/>
      <Routing />
    </div>
  );
}

export default App;
  // const { username, setUsername } = useContext(globalContext);

  // useEffect((): void => {
  //   onAuthStateChanged(firebaseAuth, async (user) => {
  //     if (user) {
  //       const userEmail = user.email;
  //       setUsername(userEmail);

  //       try {
  //         const docRef = doc(firebaseDb, "cart", `${userEmail}`);
  //         const cartValueSnapshot = await getDoc(docRef);
  //         console.log(cartValueSnapshot);
  //         if (cartValueSnapshot.exists()) {
  //           const data = cartValueSnapshot.data();
  //           setCartProducts(data.products);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       setUsername("");
  //       setCartProducts([]);
  //     }
  //   });
  // }, [setCartProducts, setUsername]);