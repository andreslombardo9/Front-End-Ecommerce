import axios from './axios';

// Obtener lista de productos
export const getProductsRequest = async () => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (error) {
    // Manejo de errores específicos según tu necesidad
    throw error;
  }
};

// Crear un nuevo productoimport Cookies from 'js-cookie';

export const createProductRequest = async (productData, token) => {
  try {
    console.log("Token antes de la solicitud:", token);
    const response = await axios.post('/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CREO PRODUCTO");
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};


// Eliminar un producto por su ID
export const deleteProductRequest = async (productId) => {
  try {
    // Verifica si el producto ha sido eliminado
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    // Manejo de errores específicos según tu necesidad
    throw error;
  }
};

// Actualizar un producto por su ID
export const updateProductRequest = async (productId, updatedProductData) => {
  try {
    const response = await axios.put(`/products/${productId}`, updatedProductData);
    return response.data;
  } catch (error) {
    // Manejo de errores específicos según tu necesidad
    throw error;
  }
};
export const getCategoriesRequest = async () => {
  try {
    const response = await axios.get('/categories');
    console.log("Respuesta de getCategoriesRequest:", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

// products.js
export const productsByCategory = async (id) => {
  try {
    const response = await axios.get(`/productsbycategory/${id}`);
    console.log("Respuesta de productsbycategory:", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos por categorías:", error);
    throw error;
  }
};
