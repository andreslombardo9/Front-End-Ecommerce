import React, { useState, useEffect } from "react";
import { updateProductRequest } from "../api/products";

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    setUpdatedProduct({ ...product });
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Realizar la llamada a la API para actualizar el producto
      await updateProductRequest(updatedProduct.id, updatedProduct);
      onUpdate(updatedProduct); // Actualizar el producto en el estado del componente padre
      onClose();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Manejar el error según tus necesidades (puede mostrar un mensaje de error, etc.)
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg md:max-w-md w-full h-4/5 md:h-90vh overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Actualizar Producto</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">Nombre:</label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name || ""}
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
            value={updatedProduct.description || ""}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">Precio:</label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price || ""}
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
            value={updatedProduct.urlImage || ""}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        {updatedProduct.urlImage && (
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-800">
              Vista previa de la imagen:
            </p>
            <img
              src={product.urlImage}
              alt={product.name}
              className="mb-2 w-full h-32 object-cover object-center rounded"
              style={{ objectFit: "contain" }} // Cambiado a 'contain'
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Actualizar
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

export default UpdateProductModal;