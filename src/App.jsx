import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageNoSession from "./pages/HomePageNoSession";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectedRoute from "./ProtectedRoute";

import ProfilePage from "./pages/ProfilePage";
import ShoppingCart from "./pages/ShoppingCart";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageNoSession />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
