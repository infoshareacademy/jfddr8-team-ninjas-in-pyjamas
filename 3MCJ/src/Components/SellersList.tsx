import { useState, useEffect, useContext } from "react";
import { firebaseDb } from "../main";
import { getDocs, collection, query } from "firebase/firestore";
import { globalContext } from "../Context/Context";


function SellersList() {
  const [sellers, setSellers] = useState<any[]>([]);
  const { searchingCategory, searchingLocation } = useContext(globalContext);

  const fetchSellers = async () => {
    const q = collection(firebaseDb, "Sellers");

    }
    try {
      const sellersSnapshot = await getDocs(q);
      const fetchedSellers: any[] = [];
      sellersSnapshot.forEach((seller) => {
        fetchedSellers.push({ id: seller.id, ...seller.data() });
      });
      setSellers(fetchedSellers);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
 
  console.log(sellers)
  useEffect(() => {
    fetchSellers();
  }, []);


  const filterLocation = () => {
    
    if (searchingLocation !== "Wybierz miasto" ) {
      sellers.filter((element)=> element.city === searchingLocation)
    }
  }


  return (
    <div>
      {sellers.map((seller) => (
        <div key={seller.id}>
          <h2>{seller.id}</h2>
          <p>{seller.sellerPhoto}</p>
          <p>{seller.sellerDescription}</p>
        </div>
      ))}
    </div>
  );
}
// function SellersList() {
//   const [products, setProducts] = useState<any[]>([]);
//   const { searchingCategory, searchingLocation } = useContext(globalContext);

//   const fetchSellers = async () => {
//     const q = query(collection(firebaseDb, "Sellers"));
//   };

//   const fetchProducts = async (
//     searchingCategory: string,
//     searchingLocation: string
//   ) => {
//     const q = query(
//       collection(firebaseDb, "Sellers")
//       // where("City", "==", searchingLocation)
//     );
//     try {
//       const productsSnapshot = await getDocs(q);
//       console.log(productsSnapshot);
//       const fetchedProducts: any[] = [];
//       productsSnapshot.forEach((product) => {
//         fetchedProducts.push({ id: product.id, ...product.data() });
//       });
//       console.log(fetchedProducts);
//       setProducts(
//         fetchedProducts.filter(
//           (element) => element.Category === searchingCategory
//         )
//       );
//     } catch (error) {
//       console.error("Error fetching products: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(searchingCategory, searchingLocation);
//   }, [searchingCategory, searchingLocation]);

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product.id}>
//           <h2>{product.id}</h2>
//           <p>{product.sellerPhoto}</p>
//           <p>{product.sellerDescription}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

export default SellersList;
