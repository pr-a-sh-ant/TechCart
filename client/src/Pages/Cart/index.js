import React from "react";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Package,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useCartService from "../../hooks/useCart";
import useAxios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error";

const Cart = () => {
  const { increase, decrease, remove, totalPrice } = useCartService();
  const { userId } = useAuth();
  const api = useAxios();

  const {
    isLoading,
    error,
    data: cartItems,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    },
  });

  const addToCartHandler = (action, product) => {
    if (action === "add") {
      increase(
        {
          productId: product.productId,
          price: product.price,
          name: product.name,
        },
        userId
      );
    } else if (action === "remove") {
      remove(
        {
          productId: product.productId,
          price: product.price,
          name: product.name,
        },
        userId
      );
    } else if (action === "decrease") {
      decrease(
        {
          productId: product.productId,
          price: product.price,
          name: product.name,
        },
        userId
      );
    }
    window.location.reload();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items yet
          </p>
          <button
            onClick={() => {
              window.location.href = "/products";
            }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-blue-600 font-medium flex items-center">
            <Package className="h-5 w-5 mr-1" />
            Cart
          </span>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          <span className="text-gray-400 font-medium flex items-center">
            <MapPin className="h-5 w-5 mr-1" />
            Shipping
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.productId}
                    className="p-6 flex flex-col sm:flex-row"
                  >
                    <div className="flex-shrink-0 rounded-lg overflow-hidden w-24 h-24 bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="sm:ml-6 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          Rs.{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => addToCartHandler("decrease", item)}
                            disabled={item.quantity === 1}
                            className="p-2 hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4 text-gray-500" />
                          </button>
                          <span className="px-4 py-2 text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCartHandler("add", item)}
                            className="p-2 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>

                        <button
                          onClick={() => addToCartHandler("remove", item)}
                          className="text-red-500 hover:text-red-600 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-medium text-gray-900">
                      Rs.{totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  window.location.href = "/shipping";
                }}
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  window.location.href = "/products";
                }}
                className="mt-4 w-full bg-white text-blue-600 py-3 px-4 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium flex items-center justify-center"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
