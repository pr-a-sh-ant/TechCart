import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../utils/axios";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

const Orders = () => {
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
                Customer Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Order Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Total Price
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
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    ${Number(order.totalPrice).toFixed(2)}
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
                    <td colSpan="5" className="px-6 py-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Order Products:
                        </h4>
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
