import { useContext, useEffect } from "react";
import { globalContext } from "../Context/Context";
import { getDocs, collection, query } from "firebase/firestore";
import { firebaseDb } from "../main";

function ShoppingCart() {
  const { shoppingCartValue, setShoppingCartValue } = useContext(globalContext);

  const fetchShoppingCartDetails = async () => {
    const a = query(collection(firebaseDb, "ShoppingCart"));
    try {
      const shoppingCartDetailsSnapshot = await getDocs(a);
      const fetchShoppingCartDetails: any[] = [];
      shoppingCartDetailsSnapshot.forEach((element) => {
        fetchShoppingCartDetails.push({ id: element.id, ...element.data() });
      });
      setShoppingCartValue(fetchShoppingCartDetails);
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };

  useEffect(() => {
    fetchShoppingCartDetails();
  }, []);

  // return (
  //   <div>
  //     {shoppingCartValue}
  //     {shoppingCartValue.map((products) => (
  //       <div key={products.id}>
  //         dasd
  //       </div>
  //     ))}
  //   </div>
  // );
}
export default ShoppingCart;
