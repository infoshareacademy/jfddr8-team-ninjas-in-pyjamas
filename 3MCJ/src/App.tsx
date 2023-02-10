import "./App.css";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "./main";
import Routing from "./Routing/Routing";
import { globalContext } from "./Context/Context";

function App() {
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

  return (
    <div className="App">
      
      <Routing />
    </div>
  );
}

export default App;
