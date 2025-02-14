import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import { getBaseURL } from "../../../apiconfig";
import { toast } from "react-hot-toast";
import useAxios from "../../../utils/axios";
import { Plus, Pencil, Trash, Package } from "lucide-react";

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const api = useAxios();

  const {
    isLoading,
    error,
    data: categoryData,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch(`${getBaseURL()}/products/categoryproduct`).then((res) =>
        res.json()
      ),
  });

  const { mutate: delteCategory } = useMutation({
    mutationFn: async (id) => await api.delete(`/categories/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: delteProduct } = useMutation({
    mutationFn: async (id) => await api.delete(`/products/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const navigateToAddProduct = () => {
    window.location.href = "/admin/addproduct";
  };

  const navigateToAddCategory = () => {
    window.location.href = "/admin/addcategory";
  };

  const navigateToEditCategory = (id) => {
    window.location.href = `/admin/addproduct?edit=true&productId=${id}`;
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your products and categories
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={navigateToAddCategory}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
          <button
            onClick={navigateToAddProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categoryData?.map((category) => (
          <div
            key={category.categoryID}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {category.categoryName}
                </h2>
                <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {category?.products?.length || 0} products
                </span>
              </div>
              <button
                onClick={() => delteCategory(category.categoryID)}
                disabled={category?.products?.length > 0}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {category?.products?.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            navigateToEditCategory(product.productId)
                          }
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => delteProduct(product.productId)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
