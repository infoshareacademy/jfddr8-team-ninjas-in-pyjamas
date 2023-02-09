import { useState, useEffect, useContext } from "react";
import { firebaseDb } from "../main";
import { getDocs, collection, query, where } from "firebase/firestore";
import { globalContext } from "../Context/Context";

function SellersList() {
  const [products, setProducts] = useState<any[]>([]);
  const { searchingCategory, searchingLocation } = useContext(globalContext);
 

  const fetchProducts = async (
    searchingCategory: string,
    searchingLocation: string
  ) => {
    const q = query(
      collection(firebaseDb, "Sellers"),
      where("City", "==", searchingLocation)
    );
    try {
        
      const productsSnapshot = await getDocs(q);
      const fetchedProducts: any[] = [];
      productsSnapshot.forEach((product) => {
        fetchedProducts.push({ id: product.id, ...product.data() });
      });
      console.log(fetchedProducts)
      setProducts(
        fetchedProducts.filter(
          (element) => element.Category === searchingCategory
        )
      );
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts(searchingCategory, searchingLocation);
  }, [searchingCategory, searchingLocation]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.id}</h2>
          <p>{product.sellerPhoto}</p>
          <p>{product.sellerDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default SellersList;
