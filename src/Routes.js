import React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Cart from "./core/Cart";

const myRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path ="/userdashboard" element={<PrivateRoutes><UserDashboard /> </PrivateRoutes>} />
        <Route path ="/cart" element={<PrivateRoutes><Cart /> </PrivateRoutes>} />
      </Routes>
    </HashRouter>
  );
};

export default myRoutes;
