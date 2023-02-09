import { useState, useEffect, useContext } from "react";
import { firebaseDb } from "../main";
import { getDocs, collection, query, where } from "firebase/firestore";
import { globalContext } from "../Context/Context";

function SellerPage() {
  // const [products, setProducts] = useState([]);
  // const { searchingCategory, setSearchingCategory, searchingLocation, setSearchingLocation } = useContext(globalContext);

  
  // const fetchProducts = async (searchingCategory:string,searchingLocation:string ) => {
  //   const q = query(
  //     collection(firebaseDb, "Sellers"),
  //     where("Category", "==", searchingCategory) && where("City", "==", searchingLocation));
  //   try {
  //     const productsSnapshot = await getDocs(q);
  //     const fetchProducts = [];
  //     productsSnapshot.forEach((product) =>
  //       fetchProducts.push({ id: product.id, ...product.data() })
  //     );
  //     setProducts(fetchProducts);
  //     console.log(products);
  //   } catch (error) {
  //     console.error("Error fetching products: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts(searchingCategory, searchingLocation);
  // }, [searchingCategory, searchingLocation]);

  // return (
  //   <div>
  //     {products.map((product) => (
  //       <div key={product.id}>
  //         <h2>{product.Opis}</h2>
  //         <p>Cena: {product.Cena}</p>
  //         <p>Opakowanie: {product.Opakowanie}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
}

// function SellerPage() {

// useEffect(() =>  {
// const q = query(
//     collection(firebaseDb, "Sellers"),
//     where("Category", "==", "Wyroby Mięsne")
//   );
//   const fetchProducts = async()=>{
//     const productsSnapshot = await getDocs(q)
//     return productsSnapshot.forEach((product)=>console.log(product.id, product.data()))
//   };
// const results = fetchProducts()
// }, []);

// return <div></div>;
// }

export default SellerPage;
