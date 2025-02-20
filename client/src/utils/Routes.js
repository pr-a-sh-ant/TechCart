import { Navigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Navbar from "../components/Navbar";
import About from "../Pages/About";
import Categories from "../Pages/Categories";
import ContactUs from "../Pages/Contact";
import Products from "../Pages/Products";
import ShippingPolicy from "../Pages/Policy";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/register";
import ProtectedRoute from "../utils/protectedRoute";
import Admin from "../Pages/admin";
import Cart from "../Pages/Cart";
import ProductDetail from "../Pages/ProductDetail";

import NotFound from "../Pages/NotFound";
import AdminUsers from "../Pages/admin/Users";
import AdminProducts from "../Pages/admin/Products";
import AddProduct from "../Pages/admin/AddProduct";
import AddCategory from "../Pages/admin/AddCategory";
import ConfirmOrder from "../Pages/shipping/index.js";
import AdminDashboard from "../Pages/admin/Dashboard/index.js";
import Orders from "../Pages/admin/Order/index.js";
import MyOrder from "../Pages/MyOrder/index.js";
import Footer from "../components/footer.js";

const Routers = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // List of routes where Navbar and Footer should not appear
  const noNavbarFooterRoutes = ["/login", "/register", "/admin"];
  const shouldShowNavbarFooter = !noNavbarFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        )}
        <Route element={<ProtectedRoute />}>
          {/* put protected routes here */}
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/shoppingCart" element={<Cart />} />
          <Route path="/shipping" element={<ConfirmOrder />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="policy" element={<ShippingPolicy />} />

        <Route element={<ProtectedRoute adminRoute={true} />}>
          {/* put admin routes here */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowNavbarFooter && <Footer />}
    </>
  );
};

export default Routers;
