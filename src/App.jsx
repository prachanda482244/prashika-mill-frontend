import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Toaster />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/sign-in" element={<LoginForm />} />

        {/* Protected routes */}
        <Route path="/cart" element={"Cart "} />
      </Routes>
    </div>
  );
};

export default App;
