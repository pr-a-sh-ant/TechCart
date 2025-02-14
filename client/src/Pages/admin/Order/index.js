import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get("/api/orders");
      return response.data;
    },
    onError: () => {
      toast.error("Failed to fetch orders");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Order ID</th>
              <th className="px-6 py-3 border-b">Customer Name</th>
              <th className="px-6 py-3 border-b">Order Date</th>
              <th className="px-6 py-3 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{order.orderId}</td>
                <td className="px-6 py-4 border-b">{`${order.fname} ${order.lname}`}</td>
                <td className="px-6 py-4 border-b">
                  {new Date(order.createdDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b">${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
