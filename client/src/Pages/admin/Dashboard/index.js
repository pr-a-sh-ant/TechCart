import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import useAxios from "../../../utils/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ErrorPage from "../../../components/error";

const AdminDashboard = () => {
  const api = useAxios();

  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      if (response.status !== 200) throw new Error("Failed to fetch orders");
      return response.data;
    },
  });

  // Process and group data
  const dashboardData = React.useMemo(() => {
    if (!orderItems) return null;

    // Group orders by ID to avoid duplicates
    const groupedOrders = orderItems.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          customerName: `${item.fname} ${item.lname}`,
          createdDate: item.createdDate,
          totalPrice: parseFloat(item.totalPrice),
          products: [],
        };
      }
      acc[item.orderId].products.push({
        name: item.name,
        category: item.category,
      });
      return acc;
    }, {});

    const orders = Object.values(groupedOrders);

    // Calculate metrics
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map((order) => order.customerName))
      .size;

    // Daily sales data
    const salesByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdDate).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, orders: 0 };
      }
      acc[date].revenue += order.totalPrice;
      acc[date].orders += 1;
      return acc;
    }, {});

    // Category data
    const categoryData = orders.reduce((acc, order) => {
      order.products.forEach((product) => {
        if (!acc[product.category]) {
          acc[product.category] = 0;
        }
        acc[product.category] += 1;
      });
      return acc;
    }, {});

    return {
      totalRevenue,
      totalOrders,
      uniqueCustomers,
      salesByDate: Object.values(salesByDate),
      categoryData: Object.entries(categoryData).map(([name, value]) => ({
        name,
        value,
      })),
    };
  }, [orderItems]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-red-600">Error loading dashboard data</div>
      </div>
    );
  }

  if (!dashboardData) return <ErrorPage message="No data found" />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold">
                  Rs.{dashboardData.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold">
                  {dashboardData.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Customers</p>
                <p className="text-2xl font-semibold">
                  {dashboardData.uniqueCustomers}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-orange-100 p-3">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-semibold">
                  {dashboardData.categoryData.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Revenue Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.salesByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Category Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
