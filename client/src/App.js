import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./utils/protectedRoute";
import Admin from "./Pages/admin";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

import NotFound from "./Pages/NotFound";
import Provider from "./utils/Provider";
import AdminUsers from "./Pages/admin/Users";
import AdminProducts from "./Pages/admin/Products";
import AddProduct from "./Pages/admin/AddProduct";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Provider>
      <div className="App">
        <Toaster />
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<p>Register</p>} />
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
            <Route element={<ProtectedRoute adminRoute={true} />}>
              {/* put admin routes here */}
              <Route path="/admin" element={<Admin />}>
                <Route index element={<p>Dashboard</p>} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="addproduct" element={<AddProduct />} />
              </Route>
            </Route>
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
