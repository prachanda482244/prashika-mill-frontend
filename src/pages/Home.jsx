import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await AxiosInstance.get("/product/get-all-products");
      setProducts(data?.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="flex  items-center border-2 p-4">
      {products?.map((product) => (
        <div className="flex flex-col border-2  gap-2" key={product._id}>
          Title: {product.title}
          price:{product.price}
          quantity:{product.quantity}
          {product.images.map((image) => (
            <img height={100} width={200} src={image.url} alt="product" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
