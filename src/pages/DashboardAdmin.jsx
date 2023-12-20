import React, { useState, useEffect } from "react";
import ProductSection from "../components/ProductSection";
import OrderSection from "../components/OrderSection";
import UserSection from "../components/UserSection";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../api/auth";

const MobileNav = ({
  isOpen,
  handleSectionClick,
  hasNewOrder,
}) => (
  <nav
    className={`bg-primary p-4 text-white md:hidden ${
      isOpen ? "block fixed inset-0 z-40" : "hidden"
    } transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform ease-in-out duration-300 overflow-y-auto`}
  >
    <div className="text-3xl font-extrabold mb-4">Dashboard</div>
    <div>
      <div
        className="flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleSectionClick("productos")}
      >
        <i className="fas fa-box mr-2"></i>
        Productos
      </div>
      <div
        className={`flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
          hasNewOrder ? "bg-red-500" : ""
        } cursor-pointer`}
        onClick={() => handleSectionClick("ordenes")}
      >
        <i className="fas fa-shopping-cart mr-2"></i>
        Órdenes
      </div>
      <div
        className="flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleSectionClick("usuarios")}
      >
        <i className="fas fa-users mr-2"></i>
        Usuarios
      </div>
    </div>
  </nav>
);

// Componente DashboardAdmin
const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const handleLogout = async () => {
    dispatch(logoutRequest());
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    if (sectionId === "ordenes") {
      setHasNewOrder(false);
    }
    // Cerrar el menú después de seleccionar una sección en dispositivos móviles
    setMenuOpen(false);
  };

  useEffect(() => {
    // Agregar o quitar la clase 'overflow-hidden' al cuerpo al cambiar el estado del menú
    document.body.classList.toggle("overflow-hidden", menuOpen);

    // Limpiar la clase al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex relative">
      {/* Botón para abrir/cerrar el menú en dispositivos móviles */}
      <button
        className="md:hidden bg-orange-500 text-white p-2 rounded focus:outline-none fixed top-4 right-4 z-50"
        onClick={toggleMenu}
      >
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      {/* Barra de navegación de escritorio */}
      <nav className="bg-primary p-4 text-white w-full md:w-1/5 md:block hidden md:relative transform transition-transform ease-in-out duration-300 overflow-y-auto">
        <div className="text-3xl font-extrabold mb-4">Dashboard</div>
        <ul>
          <li className="mb-4">
            <a
              href="#productos"
              className="flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              onClick={() => handleSectionClick("productos")}
            >
              <i className="fas fa-box mr-2"></i>
              Productos
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#ordenes"
              className={`flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                hasNewOrder ? "bg-red-500" : ""
              }`}
              onClick={() => handleSectionClick("ordenes")}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Órdenes
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#usuarios"
              className="flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              onClick={() => handleSectionClick("usuarios")}
            >
              <i className="fas fa-users mr-2"></i>
              Usuarios
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#usuarios"
              className="flex items-center text-white hover:bg-secondary hover:text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              <i className="fas fa-arrow-right-from-bracket mr-2"></i>
              Salir
            </a>
          </li>
        </ul>
      </nav>

      {/* Menú de dispositivos móviles */}
      <MobileNav
        isOpen={menuOpen}
        handleToggle={toggleMenu}
        handleSectionClick={handleSectionClick}
        hasNewOrder={hasNewOrder}
      />

      {/* Contenido del panel de administración */}
      <div className="w-full md:w-4/5 p-8">
        {/* Sección de Productos */}
        <section id="productos" className="mb-8">
          <ProductSection isVisible={selectedSection === "productos"} />
        </section>

        {/* Sección de Órdenes */}
        <section id="ordenes" className="mb-8">
          {selectedSection === "ordenes" && <OrderSection />}
        </section>

        {/* Sección de Usuarios */}
        <section id="usuarios" className="mb-8">
          <UserSection />
        </section>
      </div>
    </div>
  );
};

export default DashboardAdmin;
