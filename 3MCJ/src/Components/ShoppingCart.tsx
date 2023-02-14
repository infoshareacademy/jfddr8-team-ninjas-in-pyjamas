import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { getDoc, doc, collection, query} from "firebase/firestore";
import { firebaseDb, firebaseAuth } from "../main";


function ShoppingCart() {
const { shoppingCartValue, setShoppingCartValue, isLogged, sellers, shoppingCartItems, setShoppingCartItems } = useContext(globalContext);
const fetchShoppingCartDetails = async () => {
    const {email} = firebaseAuth.currentUser!;
    console.log(email)
    const docRef = doc(firebaseDb, "Users", `${email}`);
    try {
      const shoppingCartDetailsSnapshot = await getDoc(docRef);
      if(shoppingCartDetailsSnapshot.exists()){
        setShoppingCartItems(shoppingCartDetailsSnapshot.data().shoppingCartItems);
        setShoppingCartValue(shoppingCartDetailsSnapshot.data().shoppingCartValue);
      }
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  // const removeItemFromShoppingCart = (id:string) => {
  //   setShoppingCartItems(shoppingCartItems.filter((item) => item.id !== id));
  //   setShoppingCartValue(shoppingCartValue-product.price )
    
  // }
  const removeItemFromShoppingCart = (product:any) => {
    setShoppingCartItems(shoppingCartItems.filter((item) => item.id !== product.id));
    setShoppingCartValue(shoppingCartValue-product.price)
      }
  console.log("po usunięciu", shoppingCartItems)
  

  
  useEffect(()=>{
    if (isLogged){
      fetchShoppingCartDetails()
    }
  },[isLogged])
  

  

  return( <div>
    <div >
      {shoppingCartItems.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <span>{item.photo}</span>
          <span>{item.description} </span>
          <span>{item.price} zł </span>
          <button onClick={()=> removeItemFromShoppingCart(item) }>Usuń</button>
          {/* <button onClick={()=> removeItemFromShoppingCart(item.id) }>Usuń</button> */}
      </div>
      ))}
    </div>
  </div> );
}
export default ShoppingCart;
