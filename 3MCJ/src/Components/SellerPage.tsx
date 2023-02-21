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
  getDoc,
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

  const starRating =
    filteredSeller.rating?.reduce(
      (acc: number, value: number) => acc + value,
      0
    ) / filteredSeller.rating?.length;

  const handleRatingChange = async (value: number) => {
    console.log("value", value);
    // id sellera przypisać do usera (już ocenione)
    // wysłać dane do firebase- seller.rating

    const docRef = doc(firebaseDb, "Sellers", `${sellerId}`);
    console.log(sellerId);

    // const ratingData = [...[rating?], ...[value]];

    // await setDoc(docRef, { rating: ratingData }, { merge: true });
    // console.log(`Seller ${sellerId} rated with ${value} stars.`);

    // //  pobranie aktualnej średniej oceny sprzedawcy z Firebase
    // const docSnap = await getDoc(docRef);
    // const sellerData = docSnap.data();
    // const currentRating = sellerData?.rating?.average ?? 0;
    // const numRatings = sellerData?.rating?.numRatings ?? 0;

    // // obliczenie nowej średniej oceny, uwzględniając klikniętą ilość gwiazdek
    // const newRating = ((currentRating * numRatings) + value) / (numRatings + 1);
    // const newNumRatings = numRatings + 1;

    // // utworzenie obiektu reprezentującego nową ocenę
    // const ratingData = {
    //   average: newRating,
    //   numRatings: newNumRatings,
    //   lastRatedAt: new Date(),
    // };

    // // zapisanie nowej oceny do Firebase
    // await setDoc(docRef, { rating: ratingData }, { merge: true });

    // console.log(`Seller ${sellerId} rated with ${value} stars. New average rating: ${newRating}`);
  };

  // try {
  //   const data = {
  //     rating: starRating
  //   };
  //   await setDoc(docRef, data);
  //   setRating(starRating + value);
  // } catch (error) {
  //   console.log("Error fetching shopping cart data", error);
  // }

  const addToShopping = async (product: Products) => {
    let isNewProduct = true;
    shoppingCartItems.filter((e) => {
      if (e.id === product.id) {
        isNewProduct = false;
        product.quantity = product.quantity + 1;
        console.log(product.quantity);
      }
    });
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);

    try {
      const data = {
        shoppingCartItems: [
          ...shoppingCartItems,
          ...(isNewProduct ? [product] : []),
        ],
        shoppingCartValue: shoppingCartValue + product.price,
      };
      await setDoc(docRef, data);
      setShoppingCartValue(shoppingCartValue + product.price);
      setShoppingCartItems([
        ...shoppingCartItems,
        ...(isNewProduct ? [product] : []),
      ]);
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  console.log(shoppingCartItems);

  return (
    <div>
      <div>
        <h2>{filteredSeller.name}</h2>
        <StarRating rating={starRating} onRateChange={handleRatingChange} />
      </div>
      <div className="outer-product-list" key={sellerId}>
        {filteredSeller.products.map((product: Products) => (
          <div className="product-list" key={product.name}>
            <div className="picture-div">
              <img src={product.photo} />
            </div>
            <div className="product-description">
              <div className="product-data">
                <h2>{product.name}</h2>
              </div>
              <div>
                <p>{product.description}</p>
                <div className="allergens-div">
                  Alergeny: {product.allergens}
                </div>
                <div className="product-price">
                  <h3>
                    {product.price} zł / {product.packing}
                  </h3>
                  <div
                    className="shopping-icon-div"
                    onClick={() => addToShopping(product)}
                  >
                    <img
                      className="shopping-cart-icon-seller-page"
                      src="src/assets/Logo/ShoppingCartLogo.png"
                      alt="shopping cart icon"
                    />
                    {isLogged ? (
                      <p>Dodaj do koszyka</p>
                    ) : (
                      <p>Zaloguj się aby dodać do koszyka</p>
                    )}
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

export default SellerPage;
