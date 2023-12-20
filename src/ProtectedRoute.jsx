// ProtectedRoute.jsx

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user); // Accede al estado directamente

  const navigate = useNavigate();

  useEffect(() => {
    // Imprimimos en la consola para depuración
    console.log('User:', user);

    // Redirige a la página de inicio si el usuario no está autenticado
    if (!user || !user.rol) {
      navigate('/login');
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
