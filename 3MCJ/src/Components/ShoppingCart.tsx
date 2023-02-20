import { useContext} from "react";
import { globalContext } from "../Context/Context";
import {  doc, setDoc } from "firebase/firestore";
import { firebaseDb, firebaseAuth } from "../main";
import "../Styles/shoppingCart.scss";

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


  const addItemToShoppingCart = (product: any) => {
    const updatedItems = shoppingCartItems.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    const updatedValue = shoppingCartValue + product.price;
    setShoppingCartItems(updatedItems);
    setShoppingCartValue(updatedValue);
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);
    const data = {
      shoppingCartItems: updatedItems,
      shoppingCartValue: updatedValue
    };
    setDoc(docRef, data);
  };
  
  return (
    <div className="container">
      <div>
        {shoppingCartItems.map((item) => (
          <div key={item.id}>          
            <div className="shopping-cart-product-list">              
              <img src={item.photo}/>
              <div className="shopping-cart-product-description">
                <div className="shopping-cart-product-data">
                  <h2>{item.name}</h2>
                  <h3>{item.price} zł / {item.packing} </h3>
                  <div className="shopping-cart-quantity">
                    <h4>{item.quantity} szt.</h4>
                    <button className="button" onClick={() => removeItemFromShoppingCart(item)}>
                      Usuń produkt
                    </button>
                    <button className="button" onClick={() => addItemToShoppingCart(item)}>
                      +
                    </button>
                  </div>               
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }

export default ShoppingCart;
