// RegisterPage.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../api/auth';
import { setUser } from '../redux/authReducer';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response =  dispatch(registerRequest(data));

      // Verifica si la solicitud fue exitosa
      if (registerRequest.fulfilled.match(response)) {
        const user = response.payload;

        // Almacena el usuario en el estado
        dispatch(setUser(user));

        // Aquí puedes realizar acciones adicionales después del registro si es necesario

        console.log('Registration Response:', response);
        navigate('/homepage'); // Redirige al usuario a la página de inicio después del registro
      } else {
        console.log('Error in registration:', response.error);
      }
    } catch (error) {
      console.error('Error in registration:', error);
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center p-5">
      <div className="bg-zinc-800 w-full md:w-1/2 p-10 rounded-md">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.name && <p>El nombre es requerido</p>}

          <input
            type="text"
            {...register('last_name', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Apellido"
          />
          {errors.last_name && <p>El apellido es requerido</p>}

          <input
            type="text"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p>El email es requerido</p>}

          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && <p>La contraseña es requerida</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
          >
            Registrarse
          </button>
        </form>

        <p className="text-tomato-500 text-lg font-bold text-shadow py-3 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link className="text-blue-500 hover:text-blue-700 underline" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
