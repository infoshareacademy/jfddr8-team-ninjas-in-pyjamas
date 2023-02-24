import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import SellerPage from "../Components/SellerPage";
import ShoppingCart from "../Components/ShoppingCart";
import OuterPage from "../Components/OuterPage";

function Routing() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/sellerPage/:sellerId" element={<SellerPage />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/outerPage" element={<OuterPage />} />
    </Routes>
  );
}

export default Routing;
