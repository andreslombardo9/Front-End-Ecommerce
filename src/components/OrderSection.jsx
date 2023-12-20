import React, { useState, useEffect } from "react";
import { getOrdersRequest } from "../api/orders";

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersRequest();
      setOrders(data);
      console.log("Data:", data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la lista de órdenes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const intervalId = setInterval(() => {
      console.log("Intervalo ejecutado");
      fetchOrders();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const renderProducts = (productsArray) => (
    <ul className="text-gray-800">
      {productsArray.map((product, index) => (
        <li key={index}>
          {`${product.product_name || "Producto sin nombre"} - Cantidad: ${
            product.quantity
          } - Precio por unidad: $${Number(product.product_price).toLocaleString("es-CO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-gray-800">
        Seguimiento de Órdenes
      </h2>
      {loading ? (
        <p>Cargando órdenes...</p>
      ) : (
        <ul>
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <li key={order.id} className="mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold text-gray-950">{`Orden #${order.id}`}</p>
                  <p className="text-gray-950 overflow-auto max-w-full">{`Usuario: ${order.user.name} ${order.user.last_name} (${order.user.email})`}</p>
                  <p className="text-gray-800">Productos:</p>
                  {renderProducts(order.products)}
                  <p className="text-gray-800">{`Total: $${Number(
                    order.total
                  ).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default OrderSection;
