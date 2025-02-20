import React from "react";
import useCartService from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Card = ({ product, isHome = false }) => {
  const { isAuthenticated, userId } = useAuth();
  const { increase } = useCartService();

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
    increase(
      {
        productId: product.productId,
        image: product.image,
        price: product.price,
        name: product.name,
      },
      userId
    );
  };

  const onClickHandler = () => {
    window.location.href = `/products/${product.productId}`;
  };

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      {/* Image container */}
      <div
        onClick={onClickHandler}
        className={`relative ${isHome ? "pb-[100%]" : "pb-[70%]"} cursor-pointer`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover"
        />
      </div>

      {/* Content section with flex-grow to align labels properly */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer"
          onClick={onClickHandler}
        >
          {product.name}
        </h3>
        <div className="flex flex-col justify-between">
          <span className="text-lg font-bold text-blue-500">
            Rs. {product.price}
          </span>
          <button
            onClick={addToCartHandler}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
