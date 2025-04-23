import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import {
  Calendar,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const MyOrder = () => {
  const api = useAxios();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(`/orders/myPastOrders/${userId}`);
      console.log(response.data);
      return response.data;
    },
    onError: () => {
      toast.error("Failed to fetch orders");
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId) => {
      return await api.patch(`/orders/cancelOrder/${orderId}`);
    },
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  // Function to render status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <Truck className="h-4 w-4 mr-1" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="h-4 w-4 mr-1" />,
      },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Function to render payment status badge
  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800" },
      completed: { color: "bg-green-100 text-green-800" },
      failed: { color: "bg-red-100 text-red-800" },
    };

    const config =
      statusConfig[paymentStatus.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <CreditCard className="h-4 w-4 mr-1" />
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  // Function to check if order can be cancelled
  const canBeCancelled = (status, paymentStatus) => {
    // Only show cancel button if order is pending AND payment is not completed
    return (
      status.toLowerCase() === "pending" &&
      paymentStatus.toLowerCase() !== "completed"
    );
  };

  // Group items by orderId
  const groupedOrders = React.useMemo(() => {
    if (!orderItems) return {};
    return orderItems.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          createdDate: item.createdDate,
          status: item.status,
          paymentStatus: item.paymentStatus,
          items: [],
          totalAmount: 0,
        };
      }
      acc[item.orderId].items.push({
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        status: item.status,
        paymentStatus: item.paymentStatus,
      });
      acc[item.orderId].totalAmount += Number(item.totalPrice);
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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-2 text-gray-600">View and track your order history</p>
      </div>

      {Object.keys(groupedOrders).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-16 w-16 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">
            No Orders Found
          </h3>
          <p className="text-gray-500 mt-2">
            You haven't placed any orders yet
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {Object.values(groupedOrders).map((order, index) => (
            <div
              key={order.orderId}
              className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order #{order.orderId}
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
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                  <div className="flex flex-wrap gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Status</p>
                      {getStatusBadge(order.status)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Payment</p>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </div>

                  {canBeCancelled(order.status, order.paymentStatus) && (
                    <button
                      onClick={() => handleCancelOrder(order.orderId)}
                      className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Order
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
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
                      Rs.{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
