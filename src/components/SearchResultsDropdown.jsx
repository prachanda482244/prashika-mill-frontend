import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultsDropdown = ({ results, isLoading, onResultClick }) => {
      return (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                  {isLoading ? (
                        <div className="p-3 text-center">Searching...</div>
                  ) : results.length > 0 ? (
                        results.map((product) => (
                              <div
                                    key={product._id}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                                    onClick={() => onResultClick(product._id)}
                              >
                                    <div className="font-medium">{product.title}</div>
                                    <div className="text-sm text-gray-600 truncate">{product.description}</div>
                              </div>
                        ))
                  ) : (
                        <div className="p-3 text-gray-500">No products found</div>
                  )}
            </div>
      );
};

export default SearchResultsDropdown;