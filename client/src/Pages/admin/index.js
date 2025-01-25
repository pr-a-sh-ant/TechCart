import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <nav className="bg-gray-800 text-white w-64 p-4">
          <ul>
            <li className="mb-2">
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/users" className="hover:underline">
                Users
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/products" className="hover:underline">
                Products
              </a>
            </li>
            <li className="mb-2">
              <a href="/admin/orders" className="hover:underline">
                Orders
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
