import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";

const Admin = () => {
  const location = useLocation();
  const navigationItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-[92vh] flex flex-col bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`translate-x-0 fixed lg:static inset-y-0 left-0 w-64 transform 
          transition-transform duration-200 ease-in-out lg:translate-x-0
          bg-white shadow-lg z-20
        `}
        >
          <nav className="h-full py-4">
            <div className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    ${
                      isActivePath(item.path)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
