import { useContext} from "react";
import { globalContext } from "../Context/Context";
import {  doc, setDoc } from "firebase/firestore";
import { firebaseDb, firebaseAuth } from "../main";

function ShoppingCart() {
  const {
    shoppingCartValue,
    setShoppingCartValue,
    isLogged,
    sellers,
    shoppingCartItems,
    setShoppingCartItems,
  } = useContext(globalContext);

  const removeItemFromShoppingCart = (product: any) => {
    shoppingCartItems.filter(async (e) => {
      if (e.id === product.id) {
        
        const { email } = firebaseAuth.currentUser!;
        const docRef = doc(firebaseDb, "Users", `${email}`);
        try {
           setShoppingCartItems(shoppingCartItems.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }
            return item;
            }),)
          const data = {
            shoppingCartItems: shoppingCartItems.map((item) => {
              if (item.id === product.id) {
                return {
                  ...item,
                  quantity: item.quantity - 1
                };
              }
              return item;
              }) ,
            shoppingCartValue: shoppingCartValue - product.price,
          };
          await setDoc(docRef, data);
          setShoppingCartValue(shoppingCartValue - product.price);
        } catch (error) {
          console.log("Error fetching shopping cart data", error);
        }
        if ((product.quantity <= 1)) {
          const { email } = firebaseAuth.currentUser!;
          const docRef = doc(firebaseDb, "Users", `${email}`);
          try {
            const data = {shoppingCartItems: shoppingCartItems.filter(
                (e) => e.id !== product.id
              ),
              shoppingCartValue: shoppingCartValue - product.price,
            };
            await setDoc(docRef, data);
            setShoppingCartValue(shoppingCartValue - product.price);
            setShoppingCartItems(
              shoppingCartItems.filter((e) => e.id !== product.id)
            );
          } catch (error) {
            console.log("Error fetching shopping cart data", error);
          }
        }
       }
    });
  };

  return (
    <div>
      <div>
        {shoppingCartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            {/* <span>{item.photo}</span> */}
            <span>{item.description} </span>
            <span>{item.price} zł </span>
            <div>{item.quantity} szt.</div>
            
            <button onClick={() => removeItemFromShoppingCart(item)}>
              Usuń
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
export default ShoppingCart;
