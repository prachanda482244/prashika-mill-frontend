import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Footer from "./components/Footer";
import SingleProduct from "./components/SingleProduct";
import Dashboard from "./dashboard/Dashboard";
import DashboardProduct from "./dashboard/components/DashboardProduct";
import DashboardUser from "./dashboard/components/DashboardUser";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen">
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/unauthorized" element={"Unauthorized"} />
        <Route path="/product/:id" element={<SingleProduct />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoutes requiredRole="admin" />}>
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="products" element={<DashboardProduct/>} />
              <Route path="customers" element={<DashboardUser/>} />
              <Route path="orders" element={"Orders"} />
            </Route>
          </Route>
</Routes>
      {!hideNavbar && <Footer />}

    </div>
  );
};

export default App;
