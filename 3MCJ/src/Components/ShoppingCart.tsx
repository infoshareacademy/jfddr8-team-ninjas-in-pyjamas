import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { getDoc, doc,   collection, query } from "firebase/firestore";
import { firebaseDb } from "../main";

function ShoppingCart() {
  const { shoppingCartValue, setShoppingCartValue } = useContext(globalContext);

  const fetchShoppingCartDetails = async () => {
    const a = doc(firebaseDb, "Users", "ShoppingCartItems" );
    try {
      const shoppingCartDetailsSnapshot = await getDoc(a);
      const fetchShoppingCartDetails: any[] = [];
      if(shoppingCartDetailsSnapshot.exists()){
        shoppingCartDetailsSnapshot.data()
      }
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  useEffect(()=>{
    fetchShoppingCartDetails()
  },[])
  
  console.log(shoppingCartDetailsSnapshot.data())

  return( <div>

  </div> );
}
export default ShoppingCart;
