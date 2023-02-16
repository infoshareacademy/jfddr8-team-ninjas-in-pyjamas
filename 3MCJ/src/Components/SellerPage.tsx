import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../main";
import uuid from "react-uuid";

type Products = {
  id: string;
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
  quantity: number;
};

function SellerPage() {
  const {
    isLogged,
    sellers,
    setSellers,
    setShoppingCartItems,
    shoppingCartItems,
    setShoppingCartValue,
    shoppingCartValue,
  } = useContext(globalContext);
  const { sellerId } = useParams();
  const filteredSeller = sellers.find((seller) => {
    return seller.id === sellerId;
  });

  const addToShopping = async (product: Products) => {
    let isNewProduct = true   
    shoppingCartItems.filter((e) => {
      if (e.id === product.id) {
        isNewProduct = false
        product.quantity = product.quantity + 1;
        console.log(product.quantity);
      }
    });
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);

    try {
      const data = {
        shoppingCartItems: [ ...shoppingCartItems,...(isNewProduct ? [product] : [])],
        shoppingCartValue: shoppingCartValue + product.price,
      };
      await setDoc(docRef, data);
      setShoppingCartValue(shoppingCartValue + product.price);
      setShoppingCartItems([ ...shoppingCartItems,...(isNewProduct ? [product] : [])]);
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  console.log(shoppingCartItems);
    

  return (
    <div key={sellerId}>
      {filteredSeller.products.map((product: Products) => (
        <div className="seller-list" key={product.name}>
          <img src={product.photo} />
          <div className="seller-data">
            <h2>{product.name }</h2>
            <button onClick={() => addToShopping(product)}>
              Dodaj do koszyka
            </button>
            </div>
          <div className="seller-description">
          <div>{product.description}</div>
          <div>{product.allergens}</div>
          <div>{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerPage;
