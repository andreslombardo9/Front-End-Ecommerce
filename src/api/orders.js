// orders.js

import axios from './axios';

// Obtener lista de órdenes
export const getOrdersRequest = async () => {
  try {
    const response = await axios.get('/orders');

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear una nueva orden
// Suponiendo que `createOrderRequest` acepta un segundo parámetro para el token


export const createOrderRequest = async (orderData) => {
  try {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No se encontró el token de autorización');
      return; // Agrega este return para detener la ejecución
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

    const response = await axios.post('/order', orderData);

    if (!response.data) {
      throw new Error('Error al crear la orden');
    }

    return response.data;
  } catch (error) {
    console.error('Error en createOrderRequest:', error);
    throw new Error('Error al procesar la solicitud');
  }
};
// Eliminar una orden por su ID
export const deleteOrderRequest = async (orderId) => {
  try {
    const response = await axios.delete(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar una orden por su ID
export const updateOrderRequest = async (orderId, updatedOrderData) => {
  try {
    const response = await axios.put(`/order/${orderId}`, updatedOrderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
