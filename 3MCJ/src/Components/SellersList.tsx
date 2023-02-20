import { useState, useEffect, useContext } from "react";
import { firebaseDb } from "../main";
import { getDocs, collection, query } from "firebase/firestore";
import { globalContext } from "../Context/Context";
import { NavigateOptions, useNavigate, Link } from "react-router-dom";
import "../Styles/sellerList.scss";
import StarRating from "./StarRating";

function SellersList() {
  const [filteredSellers, setFilteredSellers] = useState<any[]>([]);
  const { spinnerHome,setSpinnerHome, searchingCategory, searchingLocation, sellers, setSellers } =
    useContext(globalContext);
  const navigate = useNavigate();

  const fetchSellers = async () => {
    const q = query(collection(firebaseDb, "Sellers"));
    try {
      const sellersSnapshot = await getDocs(q);
      const fetchedSellers: any[] = [];
      sellersSnapshot.forEach((seller) => {
        fetchedSellers.push({ id: seller.id, ...seller.data() });
      });
      setSellers(fetchedSellers);
      setSpinnerHome(false)
    } catch (error) {
      console.error("Error fetching sellers: ", error);
    }
  };
  
  useEffect(() => {
    fetchSellers();
  }, []);

  const filterSellers = () => {
    const filteredSellers = sellers.filter((seller) => {
      return (
        (searchingLocation === "" || seller.city === searchingLocation) &&
        (searchingCategory === "" || seller.category === searchingCategory)
      );
    });
    setFilteredSellers(filteredSellers);
  };

  useEffect(() => {
    filterSellers();
  }, [searchingCategory, searchingLocation, sellers]);

  const directToShopProfile = (id: string) => {
    navigate("/sellerPage", { sellerId: id } as NavigateOptions);
  };

  return (
    <div className="outer-div">
      {filteredSellers.map((seller) => {
        const {id, sellerPhoto, name, sellerDescription, rating} = seller
        const starRating = rating?.reduce((acc:any, value:number)=> acc + value , 0)/rating?.length
        return <div className="main" key={id}>
          <div className="seller-list">
            <Link to={`/sellerPage/${id}`}>
              <div className="seller-data">
                <img src={sellerPhoto} />
                <div className="seller-description">
                  <h2>{name}</h2>
                  <StarRating rating={starRating} />
                  <p>{sellerDescription}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      })}
    </div>
  );
}

export default SellersList;
