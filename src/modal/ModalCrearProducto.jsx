import React, { useState } from "react";
import { createProductRequest } from "../api/products";

const Modal = ({ onClose, onCreate }) => {
  const initialProductState = {
    name: "",
    description: "",
    price: "",
    urlImage: "",
  };

  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      // Realizar la llamada a la API para crear el producto
      const createdProduct = await createProductRequest(newProduct);
      onCreate(createdProduct); // Agregar el nuevo producto al estado del componente padre
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      // Manejar el error según tus necesidades (puede mostrar un mensaje de error, etc.)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg md:max-w-md w-full h-4/5 md:h-90vh overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Crear Producto</h2>
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
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
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
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Crear
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

export default Modal;
