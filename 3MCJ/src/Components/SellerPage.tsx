import { useContext } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";

type Products = {
  id:string; 
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
}

function SellerPage() {
  const { sellers, setSellers } = useContext(globalContext); 
  const {sellerId} = useParams();
  const filteredSeller = sellers.find((seller)=>{
    return seller.id === sellerId
   
  })

  const addToShopping = (product:Products) => {
    console.log(product);

  }

  return (
    <div key={sellerId}>
      {filteredSeller.products.map((products:Products) => (
        <div key={products.name}>
          <div>{products.name}
          <button onClick={()=>addToShopping(products)}>Dodaj do koszyka</button>
          </div>
          <img src={products.photo}/>
          <div>{products.description}</div>
          <div>{products.allergens}</div>
          <div>{products.price}</div>
        </div>
      ))
      }
      
    </div>
  );

}


  export default SellerPage;
  
 