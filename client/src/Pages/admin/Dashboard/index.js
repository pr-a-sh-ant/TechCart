import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, ShoppingCart } from "lucide-react";
import useAxios from "../../../utils/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const api = useAxios();

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders/");
      if (response.status !== 200) throw new Error("Failed to fetch orders");
      return response.data;
    },
  });

  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">{ordersError.message}</div>
      </div>
    );
  }

  const safeOrders = orders || [];

  // Process data for chart
  const ordersByDate = safeOrders.reduce((acc, order) => {
    const date = new Date(order.createdDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.totalPrice;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(ordersByDate),
    datasets: [
      {
        label: "Sales",
        data: Object.values(ordersByDate),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const totalRevenue = safeOrders
    .reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0)
    .toFixed(2);
  const totalOrders = safeOrders.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold">${totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold">{totalOrders}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
