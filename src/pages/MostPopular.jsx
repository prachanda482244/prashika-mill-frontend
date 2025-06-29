import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartData } from "../store/slices/cartSlice";

const MostPopular = ({ title, sliceStartIndex, sliceEndIndex }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});
  const [productKgQuantities, setProductKgQuantities] = useState({});
  const [productKgSelection, setProductKgSelection] = useState({});

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosInstance.get("/product");
      setProducts(data?.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const handleAddToCart = async (product, quantity, quantityInKg) => {
    try {
      const productId = product._id;
      const isKgSelected = productKgSelection[productId] || false;

      // If no quantity entered, default to 1 of the selected type
      let qty = isKgSelected ? (quantityInKg || 1) : (quantity || 1);
      let qtyInKg = isKgSelected ? qty : 0;
      let qtyNormal = isKgSelected ? 0 : qty;

      await AxiosInstance.post(`/cart/p/${product._id}`, {
        quantity: +qtyNormal,
        quantityInKg: +qtyInKg
      });
      toast.success(`${product.title} added to cart`);
      if (isLoggedIn) {
        dispatch(fetchCartData());
      }

      // Reset quantities after adding to cart
      setProductQuantities(prev => ({ ...prev, [productId]: "" }));
      setProductKgQuantities(prev => ({ ...prev, [productId]: "" }));
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    getAllProducts();
    if (isLoggedIn) {
      dispatch(fetchCartData());
    }
  }, [isLoggedIn, dispatch]);

  const handleQuantityChange = (e, productId, type) => {
    const value = e.target.value;
    if (type === "kg") {
      setProductKgQuantities((prev) => ({
        ...prev,
        [productId]: value
      }));
      // Clear the normal quantity when kg is entered
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: ""
      }));
    } else {
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: value
      }));
      // Clear the kg quantity when normal quantity is entered
      setProductKgQuantities((prev) => ({
        ...prev,
        [productId]: ""
      }));
    }
  };

  const toggleKgSelection = (productId) => {
    setProductKgSelection((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    // Clear both quantities when switching mode
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: ""
    }));
    setProductKgQuantities((prev) => ({
      ...prev,
      [productId]: ""
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 uppercase tracking-wide">
            {title}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.slice(sliceStartIndex, sliceEndIndex)?.map((product) => {
            const productId = product._id;
            const quantity = productQuantities[productId] || "";
            const quantityInKg = productKgQuantities[productId] || "";
            const isKgSelected = productKgSelection[productId] || false;

            return (
              <div
                key={productId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <NavLink to={`/product/${productId}`} className="block">
                  <div className="relative pt-[100%]">
                    <img
                      src={product.images[0]?.url}
                      alt={product.title}
                      className="absolute top-0 left-0 w-full h-full object-cover p-4"
                    />
                  </div>
                </NavLink>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-lg font-semibold text-amber-600">
                      Rs. {product.price}
                    </p>
                  </div>

                  <div className="flex space-x-2 items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleKgSelection(productId)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${!isKgSelected
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        Quantity
                      </button>
                      <button
                        onClick={() => toggleKgSelection(productId)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${isKgSelected
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        Kg
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`font-medium ${isKgSelected ? 'text-blue-600' : 'text-purple-600'}`}>
                        {isKgSelected ? `${product.stockInKg} kg` : `${product.stock}`}
                      </span>
                      <span className="text-sm text-gray-500">in stock</span>
                      {product.stock <= 5 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Low stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-5">
                    <input
                      type="number"
                      min="0"
                      value={isKgSelected ? quantityInKg : quantity}
                      placeholder="1"
                      onChange={(e) =>
                        handleQuantityChange(e, productId, isKgSelected ? "kg" : "number")
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {isKgSelected ? "Kilograms" : "Items"}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product, quantity, quantityInKg)}
                    name="Add to Cart"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;