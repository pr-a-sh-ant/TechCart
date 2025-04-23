import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../utils/axios";
import {
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Phone,
  User,
  DollarSign,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Orders = () => {
  const queryClient = useQueryClient();
  const api = useAxios();
  const [expandedOrders, setExpandedOrders] = React.useState(new Set());

  const { data: orderItems, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response.data;
    },
    onError: () => {
      toast.error("Failed to fetch orders");
    },
  });

  const { mutate: deleteOrder } = useMutation({
    mutationFn: async (id) => await api.delete(`/orders/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: markAsDelivered } = useMutation({
    mutationFn: async (orderId) => {
      return await api.patch(`/orders/updateOrderStatus/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order marked as delivered successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });

  // New mutation for marking payment as completed
  const { mutate: markAsPaid } = useMutation({
    mutationFn: async (orderId) => {
      return await api.patch(`/orders/updatePaymentStatus/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Payment marked as completed");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update payment status");
    },
  });

  // Group items by orderId
  const groupedOrders = React.useMemo(() => {
    if (!orderItems) return {};
    return orderItems.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          customerName: `${item.fname} ${item.lname}`,
          createdDate: item.createdDate,
          totalPrice: item.totalPrice,
          status: item.status,
          paymentStatus: item.paymentStatus,
          paymentMethod: item.paymentMethod,
          phoneNumber: item.phoneNumber,
          transactionId: item.transactionId,
          products: [],
        };
      }
      acc[item.orderId].products.push({
        name: item.name,
        category: item.category,
      });
      return acc;
    }, {});
  }, [orderItems]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Function to render status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
      },
      processing: {
        color: "bg-blue-100 text-blue-800",
        icon: <Package className="h-4 w-4 mr-1" />,
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        icon: <Truck className="h-4 w-4 mr-1" />,
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-4 w-4 mr-1" />,
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

  // Function to check if order can be marked as delivered
  const canBeDelivered = (status, paymentStatus) => {
    const lowerStatus = status.toLowerCase();
    const lowerPaymentStatus = paymentStatus.toLowerCase();

    // Only allow delivery if payment is completed and status is not delivered or cancelled
    return (
      lowerPaymentStatus === "completed" &&
      lowerStatus !== "delivered" &&
      lowerStatus !== "cancelled"
    );
  };

  // Function to check if payment can be marked as paid
  const canBeMarkedAsPaid = (status, paymentStatus) => {
    const lowerStatus = status.toLowerCase();
    const lowerPaymentStatus = paymentStatus.toLowerCase();

    // Only allow payment if status is not cancelled and payment is pending
    return lowerPaymentStatus === "pending" && lowerStatus !== "cancelled";
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        <p className="mt-2 text-gray-600">Manage and track customer orders</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.values(groupedOrders).map((order) => (
              <React.Fragment key={order.orderId}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4">
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    Rs.{Number(order.totalPrice).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    {/* Show Mark as Paid button only if payment is pending and status is not cancelled */}
                    {canBeMarkedAsPaid(order.status, order.paymentStatus) && (
                      <button
                        onClick={() => markAsPaid(order.orderId)}
                        className="flex items-center rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <DollarSign className="mr-1 h-4 w-4" />
                        Paid
                      </button>
                    )}

                    {/* Show Deliver button only if payment is completed and order status allows */}
                    {canBeDelivered(order.status, order.paymentStatus) && (
                      <button
                        onClick={() => markAsDelivered(order.orderId)}
                        className="flex items-center rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <Truck className="mr-1 h-4 w-4" />
                        Deliver
                      </button>
                    )}

                    <button
                      className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => deleteOrder(order.orderId)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleOrderExpansion(order.orderId)}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      {expandedOrders.has(order.orderId) ? (
                        <>
                          Hide <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                {expandedOrders.has(order.orderId) && (
                  <tr className="bg-gray-50">
                    <td colSpan="8" className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Order Details:
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3 text-sm">
                              <User className="h-4 w-4 text-blue-500" />
                              <span className="text-gray-600">Customer:</span>
                              <span className="text-gray-900">
                                {order.customerName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <Phone className="h-4 w-4 text-blue-500" />
                              <span className="text-gray-600">Phone:</span>
                              <span className="text-gray-900">
                                {order.phoneNumber}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <CreditCard className="h-4 w-4 text-blue-500" />
                              <span className="text-gray-600">
                                Payment Method:
                              </span>
                              <span className="text-gray-900 capitalize">
                                {order.paymentMethod}
                              </span>
                            </div>
                            {order.transactionId && (
                              <div className="flex items-center space-x-3 text-sm">
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-600">
                                  Transaction ID:
                                </span>
                                <span className="text-gray-900">
                                  {order.transactionId}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Order Products:
                          </h4>
                          <div className="space-y-2">
                            {order.products.map((product, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-3 text-sm"
                              >
                                <Package className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-900">
                                  {product.name}
                                </span>
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                  {product.category}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
