import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";


function Routing() {
  return (
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
  );
}

export default Routing;
