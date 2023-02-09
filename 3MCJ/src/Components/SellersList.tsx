import { useState, useEffect, useContext } from "react";
import { firebaseDb } from "../main";
import { getDocs, collection, query } from "firebase/firestore";
import { globalContext } from "../Context/Context";


function SellersList() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<any[]>([]);
  const { searchingCategory, searchingLocation } = useContext(globalContext);

  const fetchSellers = async () => {
    const q = query(collection(firebaseDb, "Sellers"));    
    try {
      const sellersSnapshot = await getDocs(q);
      const fetchedSellers: any[] = [];
      sellersSnapshot.forEach((seller) => {
        fetchedSellers.push({ id: seller.id, ...seller.data() });
      });
      console.log("fetchedSellers", fetchedSellers);
      setSellers(fetchedSellers);
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  const filterSellers = () => {
  const filteredSellers = sellers.filter((seller) => {   
    return  ( searchingLocation === "" || seller.city === searchingLocation) && (searchingCategory === '' || seller.category === searchingCategory)
    }
  );
  setFilteredSellers(filteredSellers); 
  }

  useEffect(() => {    
    filterSellers(); 
  }, [searchingCategory, searchingLocation, sellers])


  return (
    <div>
      {filteredSellers.map((seller) => (
        <div key={seller.id}>
          <h2>{seller.id}</h2>
          <p>{seller.sellerPhoto}</p>
          <p>{seller.sellerDescription}</p>
        </div>
      ))}
    </div>
  );
}


export default SellersList;
