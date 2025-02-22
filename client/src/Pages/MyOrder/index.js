import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { Calendar, Package } from "lucide-react";
import toast from "react-hot-toast";

const MyOrder = () => {
  const api = useAxios();
  const { userId } = useAuth();

  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(`/orders/myPastOrders/${userId}`);
      return response.data;
    },
    onError: () => {
      toast.error("Failed to fetch orders");
    },
  });

  // Group items by orderId
  const groupedOrders = React.useMemo(() => {
    if (!orderItems) return {};
    return orderItems.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          createdDate: item.createdDate,
          items: [],
          totalAmount: 0,
        };
      }
      acc[item.orderId].items.push({
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      });
      console.log(acc);
      acc[item.orderId].totalAmount += Number(item.totalPrice);
      console.log(acc);
      return acc;
    }, {});
  }, [orderItems]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center space-y-4">
        <Package className="h-16 w-16 text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900">
          Error Loading Orders
        </h3>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[58vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-2 text-gray-600">View and track your order history</p>
      </div>

      <div className="grid gap-6">
        {Object.values(groupedOrders).map((order, index) => (
          <div
            key={order.orderId}
            className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{index + 1}
                </h2>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium">
                      Rs.{item.totalPrice}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Total Amount
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    Rs.{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
