// Importa las bibliotecas y funciones necesarias
import React, { useEffect, useState } from 'react';
import { getCategoriesRequest, productsByCategory } from '../api/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/CarouselCategories.css';
import Product from './ProductItem';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/shoppingReducer';
import fontAwesomeLibrary from './Icons';

function CarouselCategories() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const addProductToCart = (id) => {
    dispatch(addToCart({ id }));
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await getCategoriesRequest();
        console.log('Respuesta de categorías:', response);

        if (Array.isArray(response) && response.length > 0) {
          setCategories(response);
        } else {
          console.error('La respuesta de categorías está vacía o no es un array');
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    // Llamamos a la función solo si aún no hemos cargado las categorías
    if (loadingCategories) {
      getAllCategories();
    }
  }, [loadingCategories]);

  const handleCategoryClick = async (id) => {
    try {
      const products = await productsByCategory(id);
      console.log('Productos de la categoría:', products);

      // Actualiza el estado con los productos de la categoría
      setProducts(products);
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
    }

    setSelectedCategoryId(id);
  };

  return (
    <div className="container-category-all">
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`category-button ${selectedCategoryId === category.id ? 'selected' : ''}`}
            >
              <FontAwesomeIcon icon={fontAwesomeLibrary[category.icon]} size="2x"/>
              {category.name}
            </button>
          ))}
        </div>
      )}
  
      {selectedCategoryId && (
        <div className="products-categories-container">
          {products.length > 0 ? (
            <div className='products-categories-map'>
              <ul className="product-card-ul">
                {products.map((product) => (
                  <Product key={product.id} product={product} addToCart={addProductToCart} />
                ))}
              </ul>
            </div>
          ) : (
            <p>No products available in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CarouselCategories;
