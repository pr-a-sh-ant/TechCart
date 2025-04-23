import { CheckCircle, Home, Mail, Package } from "lucide-react";
import useAxios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCartService from "../../hooks/useCart";
import { useSearchParams } from "react-router-dom";

const Confirmation = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("transaction_id"));

  const { shippingData } = useCartService();
  const { userId } = useAuth();
  const api = useAxios();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      api.post(`/cart/buy/${userId}`, {
        phoneNumber: +`${shippingData.phone}`,
        address: shippingData.address,
        paymentMethod: "khalti",
        status: "pending",
        transactionID: searchParams.get("transaction_id"),
        paymentStatus: "completed",
      }),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      window.location.href = "/";
    },
  });

  const onConfirm = () => {
    mutate();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <CheckCircle
            className="text-green-500 mb-4"
            size={64}
            strokeWidth={1.5}
          />
          <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center text-gray-700">
            <Package className="mr-2 text-blue-500" size={20} />
            <p className="text-lg">Your order has been successfully placed.</p>
          </div>

          <div className="flex items-center justify-center text-gray-600">
            <Mail className="mr-2 text-blue-500" size={20} />
            <p>
              We appreciate your business and will send you a confirmation email
              shortly.
            </p>
          </div>
        </div>

        <button
          disabled={isPending}
          onClick={onConfirm}
          className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Home className="mr-2" size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
