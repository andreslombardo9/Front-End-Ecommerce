import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getCategoriesRequest } from "../api/products";

const SelectCategories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await getCategoriesRequest();
        console.log("Respuesta de categorías:", response);

        if (Array.isArray(response) && response.length > 0) {
          setCategories(response);
        } else {
          console.error("La respuesta de categorías está vacía o no es un array");
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    // Llamamos a la función solo si aún no hemos cargado las categorías
    if (loadingCategories) {
      getAllCategories();
    }
  }, [loadingCategories]);

  if (loadingCategories) {
    return <p style={{ color: "blue" }}>Cargando categorías...</p>;
  }

  // Transformamos las categorías en el formato requerido por react-select
  const options = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  // Estilo para cambiar el color del texto a negro
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "black", // Cambia el color del texto a negro
    }),
  };

  return (
    <Select
      options={options}
      isMulti
      onChange={onChange}
      placeholder="Selecciona categorías..."
      styles={customStyles} // Aplica los estilos personalizados
    />
  );
};

export default SelectCategories;
