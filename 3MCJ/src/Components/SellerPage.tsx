import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../main";

type Products = {
  id: string;
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
};

function SellerPage() {
  const { sellers, setSellers, setShoppingCartItems, shoppingCartItems } =
    useContext(globalContext);
  const { sellerId } = useParams();
  const filteredSeller = sellers.find((seller) => {
    return seller.id === sellerId;
  });

  const addToShopping = async (products: Products) => {
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, `Users/${email}`, "shoppingCartItems");
    


    
    try {
      setShoppingCartItems([...shoppingCartItems, products]);
      await setDoc(docRef, shoppingCartItems);

      
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };
  console.log(shoppingCartItems)
  


  return (
    <div key={sellerId}>
      {filteredSeller.products.map((products: Products) => (
        <div key={products.name}>
          <div>
            {products.name}
            <button onClick={() => addToShopping(products)}>
              Dodaj do koszyka
            </button>
          </div>
          <img src={products.photo} />
          <div>{products.description}</div>
          <div>{products.allergens}</div>
          <div>{products.price}</div>
        </div>
      ))}
    </div>
  );
}

export default SellerPage;
