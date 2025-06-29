const ProductCardSkeleton = () => {
      return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                        <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                        <div className="flex justify-between mt-4">
                              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                  </div>
            </div>
      );
};

export default ProductCardSkeleton;