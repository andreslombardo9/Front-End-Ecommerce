import React, { useState, useEffect } from "react";
import { createProductRequest } from "../api/products";
import SelectCategories from "../components/SelectCategories";

const CreateProductModal = ({ onClose, onCreate }) => {
  const [token, setToken] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    urlImage: "",
    categoryIds: [],
  });

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage !== null) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    const numericValue = name === "price" ? parseFloat(value) : value;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: numericValue }));
  };

  const handleCategoryChange = (selectedCategories) => {
    const categoryIds = selectedCategories.map((category) => category.value);
    setNewProduct((prevProduct) => ({ ...prevProduct, categoryIds }));
  };

  const handleCreateModal = async () => {
    try {
      if (!token) {
        throw new Error("No se encontró el token en el estado");
      }

      if (newProduct.isCreating) {
        return;
      }

      setNewProduct((prevProduct) => ({ ...prevProduct, isCreating: true }));

      const createdProduct = await createProductRequest(newProduct, token);

      // Notificar a ProductSection con el producto creado
      onCreate(createdProduct);

      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setNewProduct((prevProduct) => ({ ...prevProduct, isCreating: false }));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg md:max-w-md w-full h-4/5 md:h-90vh overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Cargar Nuevo Producto</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">Nombre:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">
            Descripción:
          </label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">Precio:</label>
          <input
            type="number"
            name="price"
            value={isNaN(newProduct.price) ? "" : newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">
            Categorías:
          </label>
          <SelectCategories onChange={handleCategoryChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">
            URL de la imagen:
          </label>
          <input
            type="text"
            name="urlImage"
            value={newProduct.urlImage}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCreateModal}
          >
            Cargar Producto
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
