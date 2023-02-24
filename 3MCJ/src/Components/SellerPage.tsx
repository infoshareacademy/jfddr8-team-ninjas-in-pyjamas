import { useContext, useEffect, useState } from "react";
import { globalContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteField,
  getDoc,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../main";
import uuid from "react-uuid";
import "../Styles/sellerPage.scss";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCartLogo from "../assets/Logo/ShoppingCartLogo.png";

type Products = {
  id: string;
  name: string;
  photo: string;
  description: string;
  allergens: string;
  price: number;
  quantity: number;
  packing: string;
};

type Seller = {
  id: string;
  name: string;
  address: string;
  photo: string;
  products: Products[];
  rating: number[];
};

function SellerPage() {
  const {
    isLogged,
    sellers,
    setSellers,
    setShoppingCartItems,
    shoppingCartItems,
    setShoppingCartValue,
    shoppingCartValue,
  } = useContext(globalContext);
  const { sellerId } = useParams();
  const filteredSeller = sellers.find((seller) => {
    return seller.id === sellerId;
  });

  const [filteredSellerState, setFilteredSeller] = useState<Seller | undefined>(
    filteredSeller
  );
  const navigate = useNavigate();

  const [comment, setComment] = useState<string>("");

  const [getComments, setGetComments] = useState<string[]>([]);

  const fetchComments = async () => {
    const docRef = doc(firebaseDb, "Sellers", `${sellerId}`);
    try {
      const docData = await getDoc(docRef);
      const sellerData = docData.data();
      setGetComments(sellerData?.comments);
    } catch (error) {
      console.log("Error updating seller rating", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [comment]);

  const addToShopping = async (product: Products) => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    let isNewProduct = true;
    shoppingCartItems.filter((e) => {
      if (e.id === product.id) {
        isNewProduct = false;
        product.quantity = product.quantity + 1;
      }
    });
    const { email } = firebaseAuth.currentUser!;
    const docRef = doc(firebaseDb, "Users", `${email}`);

    try {
      const data = {
        shoppingCartItems: [
          ...shoppingCartItems,
          ...(isNewProduct ? [product] : []),
        ],
        shoppingCartValue: shoppingCartValue + product.price,
      };
      await setDoc(docRef, data);
      setShoppingCartValue(shoppingCartValue + product.price);
      setShoppingCartItems([
        ...shoppingCartItems,
        ...(isNewProduct ? [product] : []),
      ]);
    } catch (error) {
      console.log("Error fetching shopping cart data", error);
    }
  };

  const handleRatingChange = async (value: number) => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    const docRef = doc(firebaseDb, "Sellers", `${sellerId}`);
    try {
      // Fetch the current seller data from Firebase
      const docData = await getDoc(docRef);
      const sellerData = docData.data();

      // Update the seller's rating with the new value
      const newRating = [...(sellerData?.rating || []), value];
      const newRatingAverage =
        newRating.reduce((acc, rating) => acc + rating, 0) / newRating.length;

      // Update the seller data in Firebase with the new rating
      await updateDoc(docRef, {
        rating: newRating,
        ratingAverage: newRatingAverage,
      });

      // Update the local state with the new rating average
      setFilteredSeller({
        ...filteredSeller,
        rating: newRating,
        ratingAverage: newRatingAverage,
      });
    } catch (error) {
      console.log("Error updating seller rating", error);
    }
  };

  const handleCommentChange = async (e: any) => {
    e.preventDefault();
    if (!isLogged) {
      navigate("/login");
      return;
    }
    const docRef = doc(firebaseDb, "Sellers", `${sellerId}`);
    try {
      const docData = await getDoc(docRef);
      const sellerData = docData.data();
      const newComment = [comment, ...(sellerData?.comments || [])];
      await updateDoc(docRef, { comments: newComment });
      setFilteredSeller({
        ...filteredSeller,
        comments: newComment,
      });
      setGetComments(newComment);
      setComment("");
      toast.success("Dziękujemy za Twój komentarz", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "toast-message",
      });
    } catch (error) {
      console.log("Error updating seller rating", error);
    }
  };

  return (
    <div>
      <div className="seller-name-seller-page">
        <h2>{filteredSeller?.name}</h2>
      </div>
      <div className="outer-product-list" key={sellerId}>
        {filteredSeller &&
          filteredSeller.products.map((product: Products) => (
            <div className="product-list" key={product.name}>
              <div className="picture-div">
                <img src={product.photo} />
              </div>
              <div className="product-description">
                <div className="product-data">
                  <h2>{product.name}</h2>
                  <div
                    className="add-to-shopping"
                    onClick={() => addToShopping(product)}
                  >
                    <img
                      className="shopping-cart-icon-seller-page"
                      src={ShoppingCartLogo}
                      alt="shopping cart icon"
                    />
                    {isLogged ? (
                      <p>Dodaj do koszyka</p>
                    ) : (
                      <p>Zaloguj się aby dodać do koszyka</p>
                    )}
                  </div>
                </div>
                <div>
                  <p>{product.description}</p>
                  <div className="product-price">
                    <h3>
                      {product.price} zł / {product.packing}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="comment-title">
        <h3>Oceń Sprzedającego:</h3>
        <StarRating
          onRateChange={handleRatingChange}
          rating={filteredSeller?.rating}
        />
      </div>
      <div className="comments-container">
        <form>
          <textarea
            className="text-area"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={(e) => {
              handleCommentChange(e);
            }}
          >
            Wyślij komentarz
          </button>
        </form>
        <div className="comments-2nd-tittle">
          <h3>Opinie: </h3>
        </div>
        <div>
          {getComments.map((comment: string, index: number) => (
            <div className="comment" key={index}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
