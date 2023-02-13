import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { getDoc, doc, collection, query } from "firebase/firestore";
import { firebaseDb, firebaseAuth } from "../main";

function ShoppingCart() {
const { shoppingCartValue, setShoppingCartValue, isLogged, sellers, shoppingCartItems, setShoppingCartItems } = useContext(globalContext);
const fetchShoppingCartDetails = async () => {
    const {email} = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);
    try {
      const shoppingCartDetailsSnapshot = await getDoc(docRef);
      const fetchShoppingCartDetails: any[] = [];
      if(shoppingCartDetailsSnapshot.exists()){
        setShoppingCartItems(shoppingCartDetailsSnapshot.data().shoppingCartItems)
      }
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  useEffect(()=>{
    fetchShoppingCartDetails()
  },[isLogged,sellers])
  
  

  return( <div>
    {shoppingCartValue}
  </div> );
}
export default ShoppingCart;
