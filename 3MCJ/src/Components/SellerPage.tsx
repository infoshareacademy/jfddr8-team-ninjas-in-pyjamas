import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../main";
// import { update } from "firebase/database";

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

  useEffect(() => {
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);
    try {
      const data = {
        shoppingCartItems: shoppingCartItems,
      };
      setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  }, [shoppingCartItems]);

  const addToShopping = (product: Products) => {
    setShoppingCartItems([product, ...shoppingCartItems]);
  };
  console.log(shoppingCartItems);

  return (
    <div key={sellerId}>
      {filteredSeller.products.map((product: Products) => (
        <div key={product.name}>
          <div>
            {product.name}
            <button onClick={() => addToShopping(product)}>
              Dodaj do koszyka
            </button>
          </div>
          <img src={product.photo} />
          <div>{product.description}</div>
          <div>{product.allergens}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  );
}

export default SellerPage;
