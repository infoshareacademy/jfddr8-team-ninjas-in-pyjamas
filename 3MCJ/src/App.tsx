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
