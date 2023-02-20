import { useContext, useEffect, useState } from "react";
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
import "../Styles/sellerPage.scss";
import StarRating from "./StarRating";

type Products = {
  id: string;
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
  quantity: number;
  packing: string;
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

  const starRating = filteredSeller.rating?.reduce((acc:number, value:number)=> acc + value , 0)/filteredSeller.rating?.length

  const handleRatingChange = (value) => {
    console.log(value);
    // id sellera przypisać do usera (już ocenione)
    // wysłać dane do firebase- seller.rating
      }

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
    <div>
      <div>
        <h2>{filteredSeller.name}</h2>
        <StarRating rating={starRating} onRateChange={handleRatingChange}/>
      </div>
      <div className="outer-product-list" key={sellerId}>
        {filteredSeller.products.map((product: Products) => (
          <div className="product-list" key={product.name}>
            <img src={product.photo} />
            <div className="product-description">
              <div className="product-data">
                <h2>{product.name }</h2>
                <button onClick={() => addToShopping(product)}>
               {isLogged? <p>Dodaj do koszyka</p>: <p>Zaloguj się aby dodać do koszyka</p> } 
                </button>
              </div>
              <div>
              <p>{product.description}</p>
              <div>Alergeny: {product.allergens}</div>
              <div className="product-price">
                <h3>{product.price} zł / {product.packing}</h3>            
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerPage;
