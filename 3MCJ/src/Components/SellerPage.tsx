import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import { doc, setDoc, addDoc, collection, updateDoc, deleteField } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../main";
import uuid from 'react-uuid';


type Products = {
  id: string;
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
  quantity:number;
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
      setDoc(docRef, data);
      // updateDoc(docRef, {
      //   shoppingCartItems: shoppingCartItems
        
      // });
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  }, [shoppingCartItems]);

  const addToShopping = (product: Products) => { 
    product.id=uuid();
       shoppingCartItems.filter((e)=>{
        if (e.id === product.id){
          
          product.quantity = product.quantity+1
          console.log(product.quantity);
          
        }
       })

      //  if (product.id === shoppingCartItems.forEach((e)=>{e.id})){
      //   console.log("jest")
      //  }
    
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
          <img style={{width:"50px"}} src={product.photo} />
          <div>{product.description}</div>
          <div>{product.allergens}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  );
}

export default SellerPage;
