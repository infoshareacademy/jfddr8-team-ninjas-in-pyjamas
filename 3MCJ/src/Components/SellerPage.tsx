import { useContext } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";

function SellerPage() {
  const { sellers, setSellers } = useContext(globalContext); 
  const {sellerId} = useParams();
  const filteredSeller = sellers.find((seller)=>{
    return seller.id === sellerId
   
  })
  console.log(filteredSeller)
  return (
    <div>
      {filteredSeller.products.map((products) => (
        <div key={products.id}>
          <div>{products.name}</div>
          <img src={products.photo}/>
          <div>{products.description}</div>
          <div>{products.allergens}</div>
        </div>
      ))
      }
      
    </div>
  );

}



  export default SellerPage;
  
 