import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import useAuth from "./hooks/useAuth";

import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Categories from "./Pages/Categories";
import ContactUs from "./Pages/Contact";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/register";
import ProtectedRoute from "./utils/protectedRoute";
import Admin from "./Pages/admin";

import NotFound from "./Pages/NotFound";
import Provider from "./utils/Provider";
import AdminUsers from "./Pages/admin/Users";
import AdminProducts from "./Pages/admin/Products";
import AddProduct from "./Pages/admin/AddProduct";
import AddCategory from "./Pages/admin/AddCategory";
import Footer from "./components/footer";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // List of routes where Navbar should not appear
  const noNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
    <div className="App">
      <Toaster />
      {shouldShowNavbar && <Navbar />}
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
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />

        <Route element={<ProtectedRoute adminRoute={true} />}>
          {/* put admin routes here */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<p>Dashboard</p>} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcategory" element={<AddCategory />} />
          </Route>
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
      <Footer/>
      </>
  );
}

export default App;
