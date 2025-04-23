import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreditCard,
  Lock,
  ChevronRight,
  Calendar,
  Check,
  MapPin,
  Wallet,
} from "lucide-react";
import useCartService from "../../hooks/useCart";
import useAxios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const {
    totalPrice,
    items: orderItems,
    shippingData,
    clear,
  } = useCartService();
  const { userId } = useAuth();
  const api = useAxios();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
  });

  const shipping = 150.0;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      // Different payload based on payment method
      if (paymentMethod === "credit-card") {
        return api.post(`/payments/process/${userId}`, {
          paymentMethod,
          cardDetails: {
            cardNumber: data.cardNumber?.replace(/\s/g, "") || "",
            cardName: data.cardName || "",
            expiry: data.expiry || "",
            cvv: data.cvv || "",
          },
          amount: total,
        });
      } else if (paymentMethod === "khalti") {
        return api.post(`/payments/process/khalti`, {
          paymentMethod,
          khaltiDetails: {
            name: shippingData.fullName, // Replace with actual user name
            email: shippingData.email, // Replace with actual user email
          },
          amount: total,
          purchase_order_id: `order-${Date.now()}`,
          purchase_order_name: `Order for ${userId}`,
        });
      } else {
        api.post(`/cart/buy/${userId}`, {
          phoneNumber: +`${shippingData.phone}`,
          address: shippingData.address,
          paymentMethod: "cashOnDelivery",
          status: "pending",
          transactionID: 0,
          paymentStatus: "pending",
        });
        // Cash on delivery
      }
    },
    onSuccess: (response) => {
      reset();
      clear();
      if (paymentMethod === "khalti") {
        // Redirect to Khalti authorization page or show a success message
        toast.success("Redirecting to Khalti for payment authorization...");
        // In a real app, this might redirect to Khalti's payment page
        window.location.href = response.data.result.payment_url;
      } else {
        toast.success("Payment successful! Your order has been placed.");
        window.location.href = "/";
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Payment failed. Please try again."
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Order Progress */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-gray-500 font-medium flex items-center">
              <MapPin className="h-5 w-5 mr-1" />
              Shipping
            </span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-blue-600 font-medium flex items-center">
              <CreditCard className="h-5 w-5 mr-1" />
              Payment
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Payment Details
            </h2>
            {/* Order Summary */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h3>
              <ul className="divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      Rs.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Payment Method
              </h3>

              <div className="space-y-3">
                {/* Credit/Debit Card Option */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer flex items-center ${paymentMethod === "credit-card" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => handlePaymentMethodClick("credit-card")}
                >
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mr-3">
                    {paymentMethod === "credit-card" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500">
                      Pay securely with your card
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png"
                      alt="Visa"
                      className="h-8"
                    />
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQUEqOUYsae_8J2COsqOexLFDecMA8lz-Ow&s"
                      alt="Mastercard"
                      className="h-8"
                    />
                  </div>
                </div>

                {/* Khalti Option */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer flex items-center ${paymentMethod === "khalti" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => handlePaymentMethodClick("khalti")}
                >
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mr-3">
                    {paymentMethod === "khalti" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Khalti</p>
                    <p className="text-sm text-gray-500">
                      Pay using your Khalti digital wallet
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <img
                      src="https://encdn.ratopati.com/media/news/khalti_ELEhMcPi9q_8KQHgO7gag.png"
                      alt="Khalti"
                      className="h-8"
                    />
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer flex items-center ${paymentMethod === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => handlePaymentMethodClick("cash")}
                >
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mr-3">
                    {paymentMethod === "cash" && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Credit Card Form */}
            {paymentMethod === "credit-card" && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^[\d\s]{16,19}$/,
                        message: "Please enter a valid card number",
                      },
                      onChange: (e) => {
                        e.target.value = formatCardNumber(e.target.value);
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4242 4242 4242 4242"
                    maxLength="19"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    {...register("cardName", {
                      required: "Cardholder name is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      {...register("expiry", {
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Please use MM/YY format",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "CVV must be 3 or 4 digits",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                      maxLength="4"
                      type="password"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-3 rounded-md mt-4">
                  <Lock className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </form>
            )}
            {paymentMethod === "khalti" && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Wallet className="h-5 w-5 text-purple-600 mr-2" />
                    <p className="font-medium text-purple-700">
                      How Khalti works
                    </p>
                  </div>
                  <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
                    <li>Click "Pay with Khalti" to proceed</li>
                    <li>You'll be redirected to the Khalti payment gateway</li>
                    <li>Complete your payment securely</li>
                  </ol>
                </div>
              </div>
            )}

            <div className="border-t pt-6 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    Rs.{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    Rs.{shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">Rs.{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      Rs.{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={
                  paymentMethod === "credit-card"
                    ? handleSubmit(onSubmit)
                    : onSubmit
                }
                disabled={isPending}
                className={`w-full py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center ${
                  paymentMethod === "khalti"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {paymentMethod === "cash" && "Confirm Cash on Delivery"}
                {paymentMethod === "credit-card" && "Pay Now"}
                {paymentMethod === "khalti" && "Pay with Khalti"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <Calendar className="inline-block h-4 w-4 mr-1" />
            Expected delivery within 3-5 business days
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
