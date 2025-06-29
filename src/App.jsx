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
import CreateProduct from "./dashboard/components/CreateProduct";
import DashboardBLog from "./dashboard/pages/DashBoardBlog";
import EditBlogAndProduct from "./dashboard/components/EditBlogAndProduct";
import Order from "./pages/Order";
import Products from "./pages/Products";
import MostPopular from "./pages/MostPopular";
import DashboardOrder from "./dashboard/components/DashboardOrder";
import DashboardOrderDetails from "./dashboard/pages/DashboardOrderDetails";
import ProfileSettings from "./pages/ProfileSettings";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import OurStory from "./pages/OurStory";
import OrderSuccess from "./pages/OrderSuccess";
import SearchPage from "./pages/SearchPage";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen">
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/sign-in" element={<LoginForm />} />
        <Route
          path="/products"
          element={<MostPopular title="All Products" />}
        />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<div>404 Not Found</div>} />

        {/* Unprotected routes */}
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<OurStory />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/forgot-password/:token"
          element={<div>Forgot Password</div>}
        />

        {/* Protected routes for logged-in users */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        {/* Protected routes for admin users */}
        <Route element={<ProtectedRoutes requiredRole="admin" />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<DashboardProduct />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route
              path="products/edit/:id"
              element={<EditBlogAndProduct isProduct={true} />}
            />
            <Route path="customers" element={<DashboardUser />} />
            <Route path="orders" element={<DashboardOrder />} />
            <Route path="orders/:id" element={<DashboardOrderDetails />} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="blogs" element={<DashboardBLog />} />
            <Route path="blogs/story/:id" element={<div>Blog Story</div>} />
            <Route path="blog/create" element={<CreateProduct />} />
            <Route
              path="blog/edit/:id"
              element={<EditBlogAndProduct isProduct={false} />}
            />
          </Route>
        </Route>
      </Routes>
      {!hideNavbar && <Footer />}
    </div>
  );
};

export default App;
