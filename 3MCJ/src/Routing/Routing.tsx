import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";

function Routing() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Routing;
