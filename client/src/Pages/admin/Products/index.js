import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import { getBaseURL } from "../../../apiconfig";

const AdminProducts = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch(`${getBaseURL()}/products/categoryproduct`).then((res) =>
        res.json()
      ),
  });

  console.log(products);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  const navigateToAddProduct = () => {
    window.location.href = "/admin/addproduct";
  };

  return (
    <div className="admin-products p-6 bg-gray-100 min-h-screen">
      <div className="header mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <div className="actions space-x-4">
          <button className="add-category-button bg-green-500 text-white px-4 py-2 rounded-lg">
            Add Category
          </button>
          <button
            className="add-product-button bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={navigateToAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>
      {products.map((category) => (
        <div key={category.categoryID} className="category mb-8">
          <h2 className="category-name text-xl font-semibold mb-4 text-gray-800">
            {category.categoryName}
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-center">Product Name</th>
                <th className="py-2 px-4 text-center">Price</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.products.map((product) => (
                <tr key={product.productId} className="border-b">
                  <td className="py-2 px-4">{product.productName}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="edit-button bg-blue-500 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                    <button className="delete-button bg-red-500 text-white px-4 py-2 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
