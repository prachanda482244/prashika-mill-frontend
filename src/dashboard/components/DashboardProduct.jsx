import React, { useEffect, useState, useCallback } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const DashboardProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { search } = useSelector((state) => state.search);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get("/dashboard/get-all-products");
      if (data?.data) {
        setProducts(data.data);
        setFilteredProduct(data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    const deleteProduct = confirm(
      "Are you sure you want to delete this product?"
    );
    if (deleteProduct) {
      try {
        const { data } = await AxiosInstance.delete(
          `/dashboard/product/delete-product/${id}`
        );
        if (data.statusCode === 200) {
          toast.success(data.message);
          setRefresh(!refresh);
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Failed to delete product", error);
        toast.error("Failed to delete product");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh, fetchProducts]);

  const filteredProductItem = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(search?.toLowerCase())
  );

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProduct(products);
    } else {
      setFilteredProduct(filteredProductItem);
    }
  }, [search, products, filteredProductItem]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 border-2 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
          My Products
        </h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm md:text-base">
            Delete Selected
          </button>
          <Link
            to="/dashboard/products/create"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            Add New
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {/* Create New Product Card */}
        <Link
          to="/dashboard/products/create"
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer h-full min-h-[200px]"
        >
          <FiPlus className="text-4xl text-gray-400 mb-2" />
          <span className="text-gray-500 text-center">Create new product</span>
        </Link>

        {/* Product Cards */}
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative  border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow h-full flex  flex-col"
            >
              <input
                type="checkbox"
                className="absolute top-3 left-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <div className="flex-1 flex flex-col">
                {product.images[0]?.url && (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <h2 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-blue-600 font-semibold mb-2">
                  Rs: {product.price}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Stock: {product.stock}
                </p>
              </div>

              <div className="flex justify-between space-x-2 mt-auto">
                <Link
                  to={`/dashboard/products/edit/${product._id}`}
                  className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-2 sm:px-3 rounded-lg transition-colors text-sm w-full"
                >
                  <FiEdit2 className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 sm:px-3 rounded-lg transition-colors text-sm w-full"
                >
                  <FiTrash2 className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-12 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProduct;