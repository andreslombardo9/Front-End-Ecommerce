import React, { useState, useEffect } from "react";
import {
  getProductsRequest,
  deleteProductRequest,
  updateProductRequest,
  createProductRequest,
} from "../api/products";
import UpdateProductModal from "../modal/UpdateProductModal";
import CreateProductModal from "../modal/CreateProductModal";

const ProductSection = ({ isVisible }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProductForUpdate, setSelectedProductForUpdate] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProductsRequest();
      // Invertir el orden para que el último producto creado aparezca primero
      setProducts(data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchProducts();
    }
  }, [isVisible]);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductRequest(productId);
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, deleted: true } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleUpdateProduct = (product) => {
    setSelectedProductForUpdate(product);
    setUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await updateProductRequest(updatedProduct.id, updatedProduct);
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleCreateProduct = () => {
    setCreateModalOpen(true);
  };
  const handleCreate = async (newProduct) => {
    try {
      // Invertir el orden para que el último producto creado aparezca primero
      setProducts([newProduct, ...products]);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setCreateModalOpen(false);
    }
  };
  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedProductForUpdate(null);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
      {isCreateModalOpen && (
        <CreateProductModal
          onClose={closeCreateModal}
          onCreate={handleCreate}
        />
      )}
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={handleCreateProduct}
            >
              Cargar Producto
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter((product) => !product.deleted)
              .map((product) => (
                <li key={product.id} className="mb-4">
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow">
                       <p className="text-xl font-semibold mb-2 text-gray-600">{product.name}</p>
                    <img
                      src={product.urlImage}
                      alt={product.name}
                      className="mb-2 w-full h-32 object-cover object-center rounded"
                      style={{ objectFit: 'contain' }}
                    />
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-blue-500 font-semibold text-lg">${product.price}</p>
                    <div className="mt-2 space-x-2">
                      <p className="text-gray-600 mb-2">
                        Categorías:{" "}
                        {product.categories.map((category) => (
                          <span key={category.id} className="bg-gray-200 px-2 py-1 rounded">
                            {category.name}
                          </span>
                        ))}
                      </p>
                      <button
                        className="bg-primary text-white px-3 py-1 rounded"
                        onClick={() => handleUpdateProduct(product)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>

          {isUpdateModalOpen && (
            <UpdateProductModal
              product={selectedProductForUpdate}
              onClose={closeUpdateModal}
              onUpdate={handleUpdate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductSection;
