import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData: { _id: userId } } = useSelector(state => state.user)

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityType, setQuantityType] = useState("quantity");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await AxiosInstance.get(`/product/${id}`);
      if (data.statusCode === 200) {
        setProduct(data.data);
        await fetchReviews();
      } else {
        toast.error("Failed to load product");
      }
    } catch (error) {
      toast.error("Error loading product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await AxiosInstance.get(`/review/${id}`);
      if (data.success) {
        setReviews(data?.data?.reviews || []);
        setAverageRating(data?.data?.averageRating || 0);
      }
    } catch (error) {
      toast.error("Error loading reviews");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      const payload = {
        productId: product._id,
        [quantityType === 'kg' ? 'quantityInKg' : 'quantity']: quantity,
        [quantityType === 'kg' ? 'quantity' : 'quantityInKg']: 0
      };

      const { data } = await AxiosInstance.post(`/cart/p/${product._id}`, payload);
      if (data.statusCode === 200) {
        toast.success("Added to cart successfully");
        navigate('/cart');
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    const maxValue = quantityType === 'kg' ? product.stockInKg : product.stock;
    const newValue = Math.max(1, Math.min(numValue, maxValue));
    setQuantity(newValue);
  };

  const incrementQuantity = () => {
    const maxValue = quantityType === 'kg' ? product.stockInKg : product.stock;
    setQuantity(prev => Math.min(prev + 1, maxValue));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }

    setReviewLoading(true);
    try {
      let response;
      if (editingReviewId) {
        response = await AxiosInstance.put(`/review/${editingReviewId}`, {
          rating: newReview.rating,
          comment: newReview.comment
        });
      } else {
        response = await AxiosInstance.post('/review', {
          product: id,
          rating: newReview.rating,
          comment: newReview.comment
        });
      }

      if (response.data.success) {
        toast.success(`Review ${editingReviewId ? 'updated' : 'submitted'} successfully!`);
        setShowReviewForm(false);
        setNewReview({ rating: 5, comment: "" });
        setEditingReviewId(null);
        await fetchReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setNewReview({
      rating: review.rating,
      comment: review.comment
    });
    setShowReviewForm(true);
    window.scrollTo({
      top: document.getElementById("reviews-section").offsetTop - 100,
      behavior: "smooth"
    });
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const { data } = await AxiosInstance.delete(`/review/${reviewId}`);
        if (data.success) {
          toast.success("Review deleted successfully");
          await fetchReviews();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting review");
      }
    }
  };

  const cancelEdit = () => {
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "" });
    setEditingReviewId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.images[0]?.url}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-amber-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600 text-sm">
                ({reviews.length} reviews)
              </span>
            </div>
            <span className="text-2xl font-semibold text-amber-600">
              Rs. {quantityType === 'kg' ? product.pricePerKg : product.price}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              per {quantityType === 'kg' ? 'kg' : 'unit'}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setQuantityType('quantity')}
                className={`px-4 py-2 rounded-md ${quantityType === 'quantity' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Quantity
              </button>
              <button
                onClick={() => setQuantityType('kg')}
                className={`px-4 py-2 rounded-md ${quantityType === 'kg' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Kilograms
              </button>
            </div>

            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-4">
                Available: {quantityType === 'kg' ? product.stockInKg : product.stock} {quantityType === 'kg' ? 'kg' : ''}
              </span>
              {quantityType === 'kg' && product.kgPerUnit && (
                <span className="text-sm text-gray-500">
                  ({product.kgPerUnit}kg per unit)
                </span>
              )}
            </div>

            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={quantityType === 'kg' ? product.stockInKg : product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-16 px-3 py-1 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                disabled={quantity >= (quantityType === 'kg' ? product.stockInKg : product.stock)}
              >
                +
              </button>
              <span className="ml-2 text-sm text-gray-500">
                {quantityType === 'kg' ? 'kg' : 'units'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Total Price</h2>
            <p className="text-2xl font-bold text-amber-600">
              Rs. {(quantity * (quantityType === 'kg' ? product.pricePerKg : product.price)).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-md shadow-sm font-medium transition-colors mb-12"
          >
            {addingToCart ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Adding to Cart...
              </div>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews-section" className="mt-16 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          {userId && (
            <button
              onClick={() => {
                setShowReviewForm(!showReviewForm);
                if (showReviewForm) cancelEdit();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md shadow-sm font-medium transition-colors"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          )}
        </div>

        {/* Average Rating Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:border-r md:border-gray-200 pr-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-5xl font-bold mr-2">{averageRating}</span>
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= Math.round(averageRating) ? 'text-amber-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingReviewId ? 'Edit Your Review' : 'Write a Review'}
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none mr-1 transform hover:scale-110 transition-transform"
                    >
                      <svg
                        className={`w-8 h-8 ${star <= newReview.rating ? 'text-amber-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your thoughts about this product..."
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md shadow-sm font-medium transition-colors flex items-center"
                >
                  {reviewLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingReviewId ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    editingReviewId ? 'Update Review' : 'Submit Review'
                  )}
                </button>
                {editingReviewId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                        {review.user?.avatar ? (
                          <img
                            src={review.user.avatar}
                            alt={review.user.username || 'User'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {review.user?.username?.charAt(0).toUpperCase() || 'A'}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {review.user?.username || 'Anonymous'}
                        </h4>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-600 mt-3 pl-13">{review.comment}</p>

                {userId && review.user?._id === userId && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-gray-500">
                Be the first to share your thoughts about this product!
              </p>
              {userId && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Write a Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;